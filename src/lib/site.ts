/**
 * Centralized Website & Environment Configuration
 *
 * Implements safe, environment-aware URL resolution across:
 * 1. User-configured production domain via `NEXT_PUBLIC_SITE_URL`
 * 2. Vercel production deployment hostname via `VERCEL_PROJECT_PRODUCTION_URL`
 * 3. Vercel preview deployment hostname via `VERCEL_URL`
 * 4. Local development fallback (`http://localhost:3000`)
 *
 * Governance:
 * - Strips trailing slashes and ensures standard HTTPS protocol in deployment.
 * - Production canonical metadata never resolves to preview or localhost URLs in production.
 * - Ready for zero-code migration when custom domain is connected.
 */

function sanitizeUrl(raw: string | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;

  // If protocol is missing (e.g. VERCEL_URL is "my-app.vercel.app"), prepend https://
  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  // Strip trailing slashes
  return withProtocol.replace(/\/+$/, "");
}

/**
 * Returns the intended canonical production site URL.
 * Used for sitemap.xml, robots.txt, canonical metadata, and structured data.
 */
export function getProductionSiteUrl(): string {
  // 1. Explicit production custom domain (highest priority)
  const explicit = sanitizeUrl(process.env.NEXT_PUBLIC_SITE_URL);
  if (explicit) return explicit;

  // 2. Vercel production system variable (stable across preview & prod branches)
  const vercelProd = sanitizeUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  if (vercelProd) return vercelProd;

  // 3. Fallback when running in local development or standalone server
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  // 4. Stable planned production domain fallback
  return "https://hasnainraza.com";
}

/**
 * Returns the active environment URL (supporting preview deployments).
 */
export function getSiteUrl(): string {
  // If in a Vercel preview deployment and explicit site URL is not overridden,
  // allow preview URL for active inspection, otherwise default to production canonical
  if (process.env.VERCEL_ENV === "preview") {
    const preview = sanitizeUrl(process.env.VERCEL_URL);
    if (preview) return preview;
  }

  return getProductionSiteUrl();
}

export const siteConfig = {
  name: "Hasnain Raza",
  title: "Hasnain Raza | Full-Stack Agentic AI Engineer & Automation Developer",
  shortTitle: "Hasnain Raza — AI Engineer & Automation Developer",
  description:
    "Hasnain Raza is a Full-Stack Agentic AI Engineer & Automation Developer building intelligent AI agents, conversational voice systems, N8N workflows, and scalable full-stack applications.",
  url: getProductionSiteUrl(),
  author: {
    name: "Hasnain Raza",
    role: "Full-Stack Agentic AI Engineer & Automation Developer",
    email: "hr1228744@gmail.com",
    phone: "03198185308",
    github: "https://github.com/hasnainraza321",
    linkedin: "https://www.linkedin.com/in/hasnain-raza-47b6b2294/",
    instagram: "https://www.instagram.com/hasn_ainraza.ai/",
    whatsapp: "https://wa.me/923198185308",
  },
  keywords: [
    "Hasnain Raza",
    "Agentic AI Engineer",
    "Full-Stack AI Developer",
    "Automation Developer",
    "AI Voice Agents",
    "Retell AI",
    "N8N Automation",
    "Next.js Developer",
    "AI Agents",
    "Business Automation",
    "Python Developer",
    "CRM Integration",
  ],
} as const;

