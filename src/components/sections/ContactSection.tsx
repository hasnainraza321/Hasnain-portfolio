"use client";

import { useState, type FormEvent } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LayeredWaveDivider, sectionSurface } from "@/components/ui/LayeredWaveDivider";
import { contactConfig } from "@/data/portfolio-data";
import { cn } from "@/lib/utils";

/**
 * Recognizable Official Brand Icons (Rendered as lightweight accessible SVGs
 * to avoid adding bloated third-party icon dependencies).
 */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.716 1.455h.005c6.558 0 11.896-5.336 11.899-11.894a11.805 11.805 0 00-3.473-8.417" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 0 0 1.64-1.64c0-.9-.74-1.64-1.64-1.64a1.64 1.64 0 0 0-1.64 1.64c0 .9.74 1.64 1.64 1.64m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface ContactFormValues {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly subject: string;
  readonly message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const trimmedName = values.name.trim();
  if (!trimmedName) {
    errors.name = "Please enter your full name.";
  } else if (trimmedName.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  const trimmedEmail = values.email.trim();
  if (!trimmedEmail) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = "Please enter a valid email address (e.g., name@domain.com).";
  }

  const trimmedPhone = values.phone.trim();
  if (trimmedPhone) {
    const digitsOnly = trimmedPhone.replace(/\D/g, "");
    if (
      digitsOnly.length < 7 ||
      digitsOnly.length > 15 ||
      !/^[+]?[\d\s\-().]{7,25}$/.test(trimmedPhone)
    ) {
      errors.phone =
        "Please enter a valid phone or WhatsApp number (e.g. +92 319 8185308).";
    }
  }

  const trimmedSubject = values.subject.trim();
  if (!trimmedSubject) {
    errors.subject = "Please enter a subject for your inquiry.";
  } else if (trimmedSubject.length < 3) {
    errors.subject = "Subject must be at least 3 characters.";
  }

  const trimmedMessage = values.message.trim();
  if (!trimmedMessage) {
    errors.message = "Please enter your project details or message.";
  } else if (trimmedMessage.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

/**
 * Contact Section (`#contact`) — Client Component.
 * Minimalist, high-end white card presentation for all contact options and form.
 * Real verified contact details (WhatsApp, Email, Phone, LinkedIn, GitHub, Instagram)
 * paired with a transparent client-side inquiry form.
 */
export function ContactSection() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const handleFieldChange = (
    field: keyof ContactFormValues,
    value: string
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (submissionStatus === "error" || submissionStatus === "success") {
      setSubmissionStatus("idle");
      setSubmissionMessage("");
    }

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFieldBlur = (field: keyof ContactFormValues) => {
    if (values[field].trim().length > 0) {
      const fieldErrors = validateContactForm(values);
      if (fieldErrors[field]) {
        setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
      }
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionStatus === "submitting") return;

    const validationErrors = validateContactForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmissionStatus("idle");
      return;
    }

    setErrors({});
    setSubmissionStatus("submitting");
    setSubmissionMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          subject: values.subject,
          message: values.message,
          company_website: honeypot,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setSubmissionStatus("success");
        setSubmissionMessage(
          data.message ||
            "Your inquiry has been delivered successfully. I will get back to you shortly."
        );
        // Clear form values ONLY on confirmed success
        setValues(initialValues);
        setHoneypot("");
      } else {
        setSubmissionStatus("error");
        setSubmissionMessage(
          data?.error ||
            "Unable to deliver your message at this time. Please connect directly via WhatsApp at 0319 8185308."
        );
        // Entered form values are strictly preserved on failure
      }
    } catch {
      setSubmissionStatus("error");
      setSubmissionMessage(
        "A network connection error occurred while sending your inquiry. Please try again or reach out directly via WhatsApp."
      );
    }
  };

  // Pre-fill email body for instant 1-click fallback
  const mailtoHref = `mailto:${contactConfig.emailAddress}?subject=${encodeURIComponent(
    values.subject || "Project Inquiry"
  )}&body=${encodeURIComponent(
    `Hi Hasnain,\n\nName: ${values.name}\nPhone: ${
      values.phone || "Not provided"
    }\n\nProject Details:\n${values.message}`
  )}`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-[#F2E9D8] text-[#171717] dark:bg-[#050811] dark:text-cream transition-colors duration-200"
    >
      {/* Direct Channels & Inquiry Form */}
      <div className="relative py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(232,117,39,0.12)_0%,rgba(242,233,216,0)_70%)] dark:bg-[radial-gradient(ellipse_at_50%_30%,rgba(14,165,233,0.18)_0%,rgba(29,78,216,0.08)_45%,rgba(5,8,17,0)_70%)]"
        />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            {/* Left Column: Real Contact Details & Direct Connect */}
            <MotionReveal delay={0.1} className="space-y-6 lg:col-span-5">
              <SectionHeader
                eyebrow="05 / DIRECT CHANNELS"
                heading={contactConfig.headline}
                description={contactConfig.supportingCopy}
                headingId="contact-heading"
                headingLevel="h2"
                theme="dark"
              />

              {/* 1. Primary Highlight: WhatsApp Direct Connect */}
              <a
                href={contactConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open WhatsApp chat with Hasnain Raza at ${contactConfig.whatsappNumber}`}
                className="group flex items-center justify-between rounded-2xl border border-[#E2D5C0] bg-[#FAF5EB] dark:border-slate-200 dark:bg-white p-5 shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-[0_12px_35px_rgba(16,185,129,0.18)] text-[#171717] dark:text-[#0B1120]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-600 shadow-sm transition-transform group-hover:scale-105">
                    <WhatsAppIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-base font-bold text-[#171717] dark:text-[#0B1120] transition-colors group-hover:text-emerald-700">
                        WhatsApp
                      </span>
                    </div>
                    <p className="mt-0.5 font-sans text-xs font-semibold tracking-normal text-[#171717]/80 dark:text-slate-600">
                      {contactConfig.whatsappNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 font-mono text-xs font-bold text-emerald-600">
                  <span className="hidden sm:inline">Message</span>
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
              </a>

              {/* 2. Direct Channels: Email & Phone Dial Options */}
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {/* Email Option */}
                <a
                  href={`mailto:${contactConfig.emailAddress}`}
                  aria-label={`Send direct email to ${contactConfig.emailAddress}`}
                  className="group flex flex-col justify-between rounded-xl border border-[#E2D5C0] bg-[#FAF5EB] dark:border-slate-200 dark:bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E87527] dark:hover:border-sky-400 hover:shadow-md text-[#171717] dark:text-[#0B1120]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E87527]/20 bg-[#E87527]/10 text-[#E87527] dark:border-sky-200 dark:bg-sky-50 dark:text-sky-600">
                      <Mail className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-slate-400 transition-colors group-hover:text-[#E87527] dark:group-hover:text-sky-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3">
                    <span className="block font-mono text-[11px] font-semibold text-[#E87527] dark:text-sky-700 uppercase tracking-wider">
                      Email
                    </span>
                    <span className="block truncate font-sans text-xs font-bold text-[#171717] dark:text-[#0B1120] transition-colors group-hover:text-[#E87527] dark:group-hover:text-sky-600">
                      {contactConfig.emailAddress}
                    </span>
                  </div>
                </a>

                {/* Phone Dial Option */}
                <a
                  href={contactConfig.phoneDialUrl}
                  aria-label={`Call Hasnain Raza at ${contactConfig.phoneNumber}`}
                  className="group flex flex-col justify-between rounded-xl border border-[#E2D5C0] bg-[#FAF5EB] dark:border-slate-200 dark:bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E87527] dark:hover:border-sky-400 hover:shadow-md text-[#171717] dark:text-[#0B1120]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E87527]/20 bg-[#E87527]/10 text-[#E87527] dark:border-sky-200 dark:bg-sky-50 dark:text-sky-600">
                      <Phone className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-slate-400 transition-colors group-hover:text-[#E87527] dark:group-hover:text-sky-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3">
                    <span className="block font-mono text-[11px] font-semibold text-[#E87527] dark:text-sky-700 uppercase tracking-wider">
                      Phone Call
                    </span>
                    <span className="block font-sans text-xs font-bold tracking-normal text-[#171717] dark:text-[#0B1120] transition-colors group-hover:text-[#E87527] dark:group-hover:text-sky-600">
                      {contactConfig.phoneNumber}
                    </span>
                  </div>
                </a>
              </div>

              {/* 3. Professional Social Profiles */}
              <div className="space-y-3 rounded-2xl border border-[#E2D5C0] bg-[#FAF5EB] dark:border-slate-200 dark:bg-white p-5 shadow-sm text-[#171717] dark:text-[#0B1120]">
                <p className="font-mono text-xs font-semibold text-[#171717]/70 dark:text-slate-600 uppercase tracking-wider">
                  Social &amp; Professional Profiles
                </p>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/hasnain-raza-47b6b2294/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Hasnain Raza's LinkedIn Profile"
                    className="group flex items-center justify-between rounded-xl border border-[#E2D5C0] bg-[#FFFDF9] dark:border-slate-200 dark:bg-slate-50/80 px-3.5 py-2.5 transition-all duration-150 hover:-translate-y-0.5 hover:border-[#0A66C2] hover:bg-sky-50"
                  >
                    <div className="flex items-center gap-2">
                      <LinkedInIcon className="h-4 w-4 text-[#0A66C2]" />
                      <span className="font-sans text-xs font-semibold text-[#171717] dark:text-[#0B1120]">
                        LinkedIn
                      </span>
                    </div>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-[#0A66C2]"
                      aria-hidden="true"
                    />
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/hasnainraza321"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Hasnain Raza's GitHub Profile"
                    className="group flex items-center justify-between rounded-xl border border-[#E2D5C0] bg-[#FFFDF9] dark:border-slate-200 dark:bg-slate-50/80 px-3.5 py-2.5 transition-all duration-150 hover:-translate-y-0.5 hover:border-slate-900 hover:bg-slate-100"
                  >
                    <div className="flex items-center gap-2">
                      <GitHubIcon className="h-4 w-4 text-[#171717] dark:text-slate-900" />
                      <span className="font-sans text-xs font-semibold text-[#171717] dark:text-[#0B1120]">
                        GitHub
                      </span>
                    </div>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-900"
                      aria-hidden="true"
                    />
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/hasn_ainraza.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Hasnain Raza's Instagram Profile"
                    className="group flex items-center justify-between rounded-xl border border-[#E2D5C0] bg-[#FFFDF9] dark:border-slate-200 dark:bg-slate-50/80 px-3.5 py-2.5 transition-all duration-150 hover:-translate-y-0.5 hover:border-rose-400 hover:bg-rose-50"
                  >
                    <div className="flex items-center gap-2">
                      <InstagramIcon className="h-4 w-4 text-rose-500" />
                      <span className="font-sans text-xs font-semibold text-[#171717] dark:text-[#0B1120]">
                        Instagram
                      </span>
                    </div>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-rose-500"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </MotionReveal>

            {/* Right Column: Clean Inquiry Form */}
            <MotionReveal delay={0.16} className="lg:col-span-7">
              <div className="rounded-2xl border border-[#E2D5C0] bg-[#FAF5EB] dark:border-slate-200 dark:bg-white p-6 shadow-md dark:shadow-xl sm:p-8 text-[#171717] dark:text-[#0B1120]">
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  {/* Anti-spam honeypot (hidden from human visitors) */}
                  <div
                    aria-hidden="true"
                    className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden"
                  >
                    <label htmlFor="company_website">Company Website</label>
                    <input
                      id="company_website"
                      name="company_website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {/* Row 1: Full Name & Email Address */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-name"
                        className="block font-sans text-xs font-bold tracking-wider text-[#0B1120] uppercase"
                      >
                        Full Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        disabled={submissionStatus === "submitting"}
                        maxLength={80}
                        autoComplete="name"
                        value={values.name}
                        onChange={(e) =>
                          handleFieldChange("name", e.target.value)
                        }
                        onBlur={() => handleFieldBlur("name")}
                        aria-invalid={Boolean(errors.name)}
                        placeholder="Your full name"
                        className={cn(
                          "w-full rounded-xl border bg-white px-3.5 py-2.5 font-body text-sm text-[#0B1120] placeholder:text-slate-400 transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none",
                          errors.name
                            ? "border-2 border-red-500 bg-red-50/30"
                            : "border-slate-300"
                        )}
                      />
                      {errors.name ? (
                        <p
                          role="alert"
                          className="flex items-center gap-1.5 font-mono text-xs font-medium text-red-600"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      ) : null}
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-email"
                        className="block font-sans text-xs font-bold tracking-wider text-[#0B1120] uppercase"
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        disabled={submissionStatus === "submitting"}
                        maxLength={120}
                        autoComplete="email"
                        value={values.email}
                        onChange={(e) =>
                          handleFieldChange("email", e.target.value)
                        }
                        onBlur={() => handleFieldBlur("email")}
                        aria-invalid={Boolean(errors.email)}
                        placeholder="you@company.com"
                        className={cn(
                          "w-full rounded-xl border bg-white px-3.5 py-2.5 font-body text-sm text-[#0B1120] placeholder:text-slate-400 transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none",
                          errors.email
                            ? "border-2 border-red-500 bg-red-50/30"
                            : "border-slate-300"
                        )}
                      />
                      {errors.email ? (
                        <p
                          role="alert"
                          className="flex items-center gap-1.5 font-mono text-xs font-medium text-red-600"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {/* Row 2: Contact Number (Optional) & Subject (Required) */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* Contact Number (Optional) */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-phone"
                        className="block font-sans text-xs font-bold tracking-wider text-[#0B1120] uppercase"
                      >
                        Contact Number{" "}
                        <span className="font-mono text-[10px] font-normal text-slate-500">
                          (Optional)
                        </span>
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        disabled={submissionStatus === "submitting"}
                        maxLength={30}
                        autoComplete="tel"
                        value={values.phone}
                        onChange={(e) =>
                          handleFieldChange("phone", e.target.value)
                        }
                        onBlur={() => handleFieldBlur("phone")}
                        aria-invalid={Boolean(errors.phone)}
                        placeholder="Enter your phone or WhatsApp number"
                        className={cn(
                          "w-full rounded-xl border bg-white px-3.5 py-2.5 font-body text-sm text-[#0B1120] placeholder:text-slate-400 transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none",
                          errors.phone
                            ? "border-2 border-red-500 bg-red-50/30"
                            : "border-slate-300"
                        )}
                      />
                      {errors.phone ? (
                        <p
                          role="alert"
                          className="flex items-center gap-1.5 font-mono text-xs font-medium text-red-600"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      ) : null}
                    </div>

                    {/* Subject (Placeholder removed per user request) */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-subject"
                        className="block font-sans text-xs font-bold tracking-wider text-[#0B1120] uppercase"
                      >
                        Subject
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        required
                        disabled={submissionStatus === "submitting"}
                        maxLength={120}
                        value={values.subject}
                        onChange={(e) =>
                          handleFieldChange("subject", e.target.value)
                        }
                        onBlur={() => handleFieldBlur("subject")}
                        aria-invalid={Boolean(errors.subject)}
                        placeholder=""
                        className={cn(
                          "w-full rounded-xl border bg-white px-3.5 py-2.5 font-body text-sm text-[#0B1120] placeholder:text-slate-400 transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none",
                          errors.subject
                            ? "border-2 border-red-500 bg-red-50/30"
                            : "border-slate-300"
                        )}
                      />
                      {errors.subject ? (
                        <p
                          role="alert"
                          className="flex items-center gap-1.5 font-mono text-xs font-medium text-red-600"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{errors.subject}</span>
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {/* Row 3: Message */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-message"
                      className="block font-sans text-xs font-bold tracking-wider text-[#0B1120] uppercase"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      disabled={submissionStatus === "submitting"}
                      maxLength={2000}
                      value={values.message}
                      onChange={(e) =>
                        handleFieldChange("message", e.target.value)
                      }
                      onBlur={() => handleFieldBlur("message")}
                      aria-invalid={Boolean(errors.message)}
                      placeholder="Briefly describe your goals, required integrations, or timeline..."
                      className={cn(
                        "w-full resize-y rounded-xl border bg-white px-3.5 py-2.5 font-body text-sm text-[#0B1120] placeholder:text-slate-400 transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none",
                        errors.message
                          ? "border-2 border-red-500 bg-red-50/30"
                          : "border-slate-300"
                      )}
                    />
                    {errors.message ? (
                      <p
                        role="alert"
                        className="flex items-center gap-1.5 font-mono text-xs font-medium text-red-600"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    ) : null}
                  </div>

                  {/* Centered High-Visibility Submit Action */}
                  <div className="flex flex-col items-center justify-center gap-3 pt-4 text-center">
                    <button
                      type="submit"
                      disabled={submissionStatus === "submitting"}
                      aria-busy={submissionStatus === "submitting"}
                      className={cn(
                        "inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full px-9 py-4 font-sans text-sm font-bold transition-all duration-200",
                        submissionStatus === "submitting"
                          ? "cursor-not-allowed opacity-75 bg-slate-400 text-white dark:bg-slate-700"
                          : "bg-[#E87527] hover:bg-[#D45F12] text-white shadow-[0_10px_25px_rgba(232,117,39,0.35)] dark:bg-[#0284C7] dark:hover:bg-[#0369A1] dark:shadow-[0_10px_25px_rgba(2,132,199,0.35)] hover:-translate-y-0.5"
                      )}
                    >
                      {submissionStatus === "submitting" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          <span>Sending Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Inquiry</span>
                          <Send className="h-4 w-4" aria-hidden="true" />
                        </>
                      )}
                    </button>

                    {values.name || values.email || values.message ? (
                      <button
                        type="button"
                        disabled={submissionStatus === "submitting"}
                        onClick={() => {
                          setValues(initialValues);
                          setErrors({});
                          setSubmissionStatus("idle");
                          setSubmissionMessage("");
                        }}
                        className="font-sans text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                      >
                        Reset Form
                      </button>
                    ) : null}
                  </div>

                  {/* Confirmed Delivery Success Message */}
                  {submissionStatus === "success" ? (
                    <div
                      role="status"
                      aria-live="polite"
                      className="mt-5 rounded-2xl border border-emerald-300 bg-emerald-50/90 dark:border-emerald-500/30 dark:bg-emerald-950/40 p-5 text-emerald-950 dark:text-emerald-200 shadow-sm transition-all"
                    >
                      <div className="flex items-start gap-3.5">
                        <CheckCircle2
                          className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400"
                          aria-hidden="true"
                        />
                        <div className="space-y-1.5">
                          <h4 className="font-sans text-sm font-bold text-emerald-900 dark:text-emerald-100">
                            Inquiry Delivered Successfully
                          </h4>
                          <p className="font-body text-xs leading-relaxed text-emerald-800 dark:text-emerald-300">
                            {submissionMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* Delivery Error Message with Direct Fallbacks */}
                  {submissionStatus === "error" ? (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="mt-5 rounded-2xl border border-red-300 bg-red-50/90 dark:border-red-500/30 dark:bg-red-950/40 p-5 text-red-950 dark:text-red-200 shadow-sm transition-all"
                    >
                      <div className="flex items-start gap-3.5">
                        <AlertCircle
                          className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400"
                          aria-hidden="true"
                        />
                        <div className="space-y-2.5">
                          <h4 className="font-sans text-sm font-bold text-red-900 dark:text-red-100">
                            Unable to Deliver Inquiry
                          </h4>
                          <p className="font-body text-xs leading-relaxed text-red-800 dark:text-red-300">
                            {submissionMessage}
                          </p>
                          <div className="flex flex-wrap gap-2.5 pt-1">
                            <a
                              href={contactConfig.whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-emerald-600 px-3.5 py-1.5 font-mono text-xs font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                              <span>Open WhatsApp</span>
                            </a>
                            <a
                              href={mailtoHref}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-sky-300 bg-sky-600 px-3.5 py-1.5 font-mono text-xs font-semibold text-white shadow-sm transition-colors hover:bg-sky-700"
                            >
                              <Mail className="h-3.5 w-3.5" />
                              <span>Open Default Email Client</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </form>
              </div>
            </MotionReveal>
          </div>
        </Container>
      </div>

      {/* Part 2: Multi-Layer Wave into Lower CTA Band with Direct WhatsApp & Form Jump */}
      <LayeredWaveDivider
        from={sectionSurface.base}
        to={sectionSurface.raised}
        className="relative z-10"
      />

      <div className="relative overflow-hidden bg-[#FAF5EB] dark:bg-[#EEF2F7] py-14 text-[#171717] dark:text-[#0B1120] sm:py-18 transition-colors duration-200">
        <Container className="relative z-10">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 md:flex-row">
            {/* Heading */}
            <div className="space-y-2 text-center md:text-left">
              <p className="font-mono text-[11px] font-semibold tracking-[0.24em] text-[#E87527] dark:text-[#0284C7] uppercase">
                LET&apos;S WORK TOGETHER
              </p>
              <h3 className="font-sans text-3xl font-bold tracking-tight text-[#171717] dark:text-[#0B1120] sm:text-4xl">
                Have a{" "}
                <span className="font-editorial font-medium text-[#E87527] dark:text-[#0284C7]">
                  project
                </span>{" "}
                in mind?
              </h3>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
              <a
                href={contactConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 font-sans text-xs font-semibold text-white shadow-[0_8px_20px_rgba(5,150,105,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
              <a
                href="#contact-name"
                className="inline-flex items-center gap-2 rounded-full bg-[#0B1120] px-6 py-3.5 font-sans text-xs font-semibold text-white shadow-[0_8px_20px_rgba(11,17,32,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0284C7]"
              >
                <span>Inquiry Form</span>
                <Send
                  className="h-3.5 w-3.5 text-sky-400"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
