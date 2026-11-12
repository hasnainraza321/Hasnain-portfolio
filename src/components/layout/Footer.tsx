import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import {
  contactConfig,
  expertisePillars,
  heroContent,
  navigationConfig,
} from "@/data/portfolio-data";
import type { SocialPlatform } from "@/types/portfolio";
import { isSafeExternalHref } from "@/lib/utils";

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

function getPlatformIcon(platform: SocialPlatform) {
  switch (platform) {
    case "whatsapp":
      return <WhatsAppIcon className="h-3.5 w-3.5 text-emerald-500" />;
    case "email":
      return <Mail className="h-3.5 w-3.5 text-[#E87527] dark:text-sky-400" aria-hidden="true" />;
    case "phone":
      return <Phone className="h-3.5 w-3.5 text-[#E87527] dark:text-sky-400" aria-hidden="true" />;
    case "linkedin":
      return <LinkedInIcon className="h-3.5 w-3.5 text-[#0A66C2]" />;
    case "github":
      return <GitHubIcon className="h-3.5 w-3.5 text-[#171717] dark:text-slate-300" />;
    case "instagram":
      return <InstagramIcon className="h-3.5 w-3.5 text-rose-500" />;
    default:
      return null;
  }
}

/**
 * Minimalist Portfolio Footer (Server Component) with Dual Theme Support.
 * - Dark Theme: Deep Midnight Obsidian (#04070E) with Electric Cyan lines.
 * - Light Theme: Warm Subtle Cream Variation (#EADBCA) with warm neutral borders.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  const verifiedSocialLinks = contactConfig.socialLinks.filter(
    (item) => item.isVerified && isSafeExternalHref(item.href)
  );

  const hasVerifiedEmail =
    contactConfig.emailAddress !== null &&
    isSafeExternalHref(`mailto:${contactConfig.emailAddress}`);

  return (
    <footer className="relative overflow-hidden bg-[#EADBCA] text-[#171717] dark:bg-[#04070E] dark:text-cream transition-colors duration-200">
      <Container className="py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Column 1: Brand Wordmark & Positioning */}
          <div className="space-y-4 md:col-span-4">
            <a
              href="#home"
              className="group inline-flex items-center font-sans text-lg font-bold tracking-wide text-[#171717] dark:text-cream uppercase transition-colors hover:text-[#E87527] dark:hover:text-sky-400"
            >
              <div>
                <span className="block leading-none">
                  {navigationConfig.brandWordmark}
                </span>
                <span className="mt-1 block font-mono text-[10px] font-normal tracking-widest text-[#E87527] dark:text-sky-400/80">
                  AGENTIC AI &amp; AUTOMATION
                </span>
              </div>
            </a>

            <p className="max-w-xs font-body text-xs leading-relaxed text-[#171717]/75 dark:text-cream/65">
              {heroContent.supportingDescription}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3 md:col-span-2">
            <h2 className="font-sans text-xs font-semibold tracking-wider text-[#171717] dark:text-cream uppercase">
              Navigation
            </h2>
            <ul className="space-y-2">
              {navigationConfig.items.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="font-body text-xs text-[#171717]/70 transition-colors duration-150 hover:text-[#E87527] dark:text-cream/65 dark:hover:text-sky-400"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Core Specializations */}
          <div className="space-y-3 md:col-span-3">
            <h2 className="font-sans text-xs font-semibold tracking-wider text-[#171717] dark:text-cream uppercase">
              Specializations
            </h2>
            <ul className="space-y-2">
              {expertisePillars.map((pillar) => (
                <li key={pillar.id}>
                  <a
                    href="#expertise"
                    className="font-body text-xs text-[#171717]/70 transition-colors duration-150 hover:text-[#E87527] dark:text-cream/65 dark:hover:text-sky-400"
                  >
                    {pillar.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Let's Build Something Intelligent Together */}
          <div className="space-y-4 md:col-span-3">
            <h2 className="font-sans text-xs font-semibold tracking-wider text-[#171717] dark:text-cream uppercase">
              Let&apos;s build something intelligent together.
            </h2>

            {hasVerifiedEmail ? (
              <p className="font-mono text-xs text-[#E87527] dark:text-sky-400">
                <a
                  href={`mailto:${contactConfig.emailAddress}`}
                  className="inline-flex items-center gap-1.5 underline decoration-[#E87527]/50 dark:decoration-sky-400/50 underline-offset-4 hover:text-[#171717] dark:hover:text-cream"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{contactConfig.emailAddress}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </p>
            ) : null}

            {verifiedSocialLinks.length > 0 ? (
              <ul className="flex flex-wrap gap-2 pt-1">
                {verifiedSocialLinks.map((social) => (
                  <li key={social.platform}>
                    <a
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#D8C6AD] bg-[#FAF5EB] text-[#171717] hover:border-[#E87527] hover:text-[#E87527] dark:border-sky-400/30 dark:bg-[#0B1224] dark:text-cream dark:hover:border-sky-400 dark:hover:text-sky-400 px-3 py-1 font-mono text-[11px] transition-all duration-150 hover:-translate-y-0.5"
                    >
                      {getPlatformIcon(social.platform)}
                      <span>{social.label}</span>
                      <ArrowUpRight
                        className="h-3 w-3 text-[#171717]/60 dark:text-cream/60"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 flex flex-col items-center justify-center border-t border-[#D8C6AD] dark:border-cream/10 pt-6 text-center">
          <p className="font-mono text-[11px] text-[#171717]/60 dark:text-cream/50">
            &copy; {currentYear} {navigationConfig.brandWordmark}. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
