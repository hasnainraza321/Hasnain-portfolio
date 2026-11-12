import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Strict Runtime Configuration for Vercel Serverless
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// In-Memory Rate Limiting for the active serverless instance
// Note: Per-instance limitation; protects individual container instances against flood abuse.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestsMap = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipRequestsMap.get(ip);

  // Periodically clean up expired entries to avoid memory leak
  if (ipRequestsMap.size > 200) {
    for (const [key, val] of ipRequestsMap.entries()) {
      if (val.expiresAt < now) {
        ipRequestsMap.delete(key);
      }
    }
  }

  if (!record || record.expiresAt < now) {
    ipRequestsMap.set(ip, {
      count: 1,
      expiresAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

// Security: Context-aware HTML escaping to prevent HTML injection into email clients
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Basic RFC 5322 compliant email regex
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// E.164 and international dialer-friendly regex
const PHONE_REGEX = /^[+0-9\s\-()]{7,30}$/;

export async function POST(request: Request) {
  try {
    // 1. Content-Type Enforcement
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        { success: false, error: "Invalid Content-Type. application/json is required." },
        { status: 415 }
      );
    }

    // 2. Origin & Host Validation
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    if (origin && host) {
      try {
        const originUrl = new URL(origin);
        // Ensure request comes from the same host (supports custom domains & localhost)
        if (
          originUrl.host !== host &&
          !originUrl.host.includes("localhost") &&
          !originUrl.host.includes("127.0.0.1")
        ) {
          return NextResponse.json(
            { success: false, error: "Cross-origin request rejected." },
            { status: 403 }
          );
        }
      } catch {
        return NextResponse.json(
          { success: false, error: "Malformed origin header." },
          { status: 400 }
        );
      }
    }

    // 3. Rate Limiting Check
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0]?.trim() || "unknown" : "unknown";
    if (clientIp !== "unknown" && isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please wait a few minutes before submitting again.",
        },
        { status: 429 }
      );
    }

    // 4. Request Payload Size Check (Maximum 32KB)
    const rawBody = await request.text();
    if (rawBody.length > 32 * 1024) {
      return NextResponse.json(
        { success: false, error: "Request payload exceeds maximum allowed size (32KB)." },
        { status: 413 }
      );
    }

    let payload: Record<string, unknown>;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { success: false, error: "Malformed JSON payload." },
        { status: 400 }
      );
    }

    // 5. Anti-Spam Honeypot Verification
    // Bots commonly populate hidden fields like 'company_website' or 'fax_number'
    const honeypot = String(payload.company_website || payload.hp_field || "").trim();
    if (honeypot.length > 0) {
      // Silently discard spam submission with success status to confuse bot scanners
      return NextResponse.json(
        { success: true, message: "Inquiry received successfully." },
        { status: 200 }
      );
    }

    // 6. Server-Side Field Validation & Sanitization
    const name = String(payload.name || "").trim();
    const email = String(payload.email || "").trim().toLowerCase();
    const phone = String(payload.phone || "").trim();
    const subject = String(payload.subject || "").trim();
    const message = String(payload.message || "").trim();

    // Prevent Header Injection (newlines in single-line fields)
    if (/[\r\n]/.test(name) || /[\r\n]/.test(email) || /[\r\n]/.test(subject)) {
      return NextResponse.json(
        { success: false, error: "Invalid characters detected in header fields." },
        { status: 400 }
      );
    }

    // Name validation
    if (!name || name.length < 2 || name.length > 80) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid name (2 to 80 characters)." },
        { status: 400 }
      );
    }

    // Email validation
    if (!email || email.length > 120 || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Optional Phone validation
    if (phone && (phone.length > 30 || !PHONE_REGEX.test(phone))) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid phone number or leave it blank." },
        { status: 400 }
      );
    }

    // Subject validation
    if (!subject || subject.length < 2 || subject.length > 120) {
      return NextResponse.json(
        { success: false, error: "Please provide a subject (2 to 120 characters)." },
        { status: 400 }
      );
    }

    // Message validation
    if (!message || message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        { success: false, error: "Please provide a message between 10 and 2000 characters." },
        { status: 400 }
      );
    }

    // 7. Environment Variable Credentials Check
    const gmailUser = process.env.GMAIL_USER?.trim();
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.trim();
    const contactToEmail = process.env.CONTACT_TO_EMAIL?.trim() || gmailUser;

    if (!gmailUser || !gmailAppPassword || !contactToEmail) {
      // Secure server-side log; NEVER leak credentials or specific env variable names to client
      console.error(
        "[Contact API] SMTP credentials not configured. Please set GMAIL_USER, GMAIL_APP_PASSWORD, and CONTACT_TO_EMAIL in Vercel environment variables."
      );
      return NextResponse.json(
        {
          success: false,
          error:
            "Email service is currently offline. Please contact directly via WhatsApp at 0319 8185308 or email hr1228744@gmail.com.",
        },
        { status: 503 }
      );
    }

    // 8. Nodemailer Transporter Setup (Gmail SMTP over Port 465 SSL)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Port 465 requires SSL
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    // 9. Structured Email Templates (Plain Text + Sanitized HTML)
    const timestamp = new Date().toUTCString();
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : "Not provided";
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    const plainTextContent = `New Portfolio Inquiry Submission
---------------------------------------
Timestamp: ${timestamp}
Name:      ${name}
Email:     ${email}
Phone:     ${phone || "Not provided"}
Subject:   ${subject}

Message:
${message}
---------------------------------------
Sent via Hasnain Raza Portfolio Contact Form
`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f5f0; color: #171717; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2d5c0; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .header { background: #171717; color: #ffffff; padding: 24px 28px; border-bottom: 3px solid #E87527; }
    .header h2 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
    .header p { margin: 6px 0 0; font-size: 12px; color: #E87527; text-transform: uppercase; letter-spacing: 0.1em; font-family: monospace; }
    .content { padding: 28px; }
    .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .meta-table td { padding: 8px 0; font-size: 14px; border-bottom: 1px solid #f0eae1; vertical-align: top; }
    .meta-table td.label { width: 110px; font-weight: 600; color: #555555; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; font-family: monospace; }
    .meta-table td.value { color: #171717; font-weight: 500; }
    .message-box { background: #faf8f5; border-left: 3px solid #E87527; padding: 16px 20px; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #222222; }
    .footer { padding: 18px 28px; background: #faf8f5; border-top: 1px solid #f0eae1; font-size: 11px; color: #888888; text-align: center; font-family: monospace; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Portfolio Inquiry</h2>
      <p>Hasnain Raza &bull; Agentic AI &amp; Automation Platform</p>
    </div>
    <div class="content">
      <table class="meta-table">
        <tr>
          <td class="label">From</td>
          <td class="value"><strong>${safeName}</strong></td>
        </tr>
        <tr>
          <td class="label">Email</td>
          <td class="value"><a href="mailto:${safeEmail}" style="color: #E87527; text-decoration: none;">${safeEmail}</a></td>
        </tr>
        <tr>
          <td class="label">Phone</td>
          <td class="value">${safePhone}</td>
        </tr>
        <tr>
          <td class="label">Subject</td>
          <td class="value"><strong>${safeSubject}</strong></td>
        </tr>
        <tr>
          <td class="label">Time (UTC)</td>
          <td class="value">${timestamp}</td>
        </tr>
      </table>

      <div style="margin-top: 20px;">
        <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #555555; font-family: monospace; display: block; margin-bottom: 8px;">Message Content:</span>
        <div class="message-box">
          ${safeMessage}
        </div>
      </div>
    </div>
    <div class="footer">
      This inquiry was sent from your portfolio contact form. Hit 'Reply' to respond directly to ${safeEmail}.
    </div>
  </div>
</body>
</html>
`;

    // 10. Send Email via Gmail SMTP
    await transporter.sendMail({
      from: `"${name}" <${gmailUser}>`,
      to: contactToEmail,
      replyTo: email,
      subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
      text: plainTextContent,
      html: htmlContent,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your inquiry has been delivered successfully. I will respond to you shortly.",
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    // Internal server log only; NEVER disclose error traces or credentials to client
    console.error("[Contact API] SMTP Delivery Error:", errorMessage);

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to send your message at this time due to a server connection issue. Please connect directly via WhatsApp at 0319 8185308.",
      },
      { status: 500 }
    );
  }
}

