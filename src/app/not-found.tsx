import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { getButtonClasses } from "@/components/ui/Button";

/**
 * Custom 404 Not Found Page.
 * Styled with the approved Cream, Ink Black, and Orange design system,
 * fully supporting both Light and Dark themes.
 */
export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-[75vh] items-center justify-center bg-[#F2E9D8] px-4 py-24 text-[#171717] dark:bg-[#050811] dark:text-cream transition-colors duration-200"
    >
      <Container className="relative z-10 text-center">
        <div className="mx-auto max-w-xl space-y-8">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E87527]/30 bg-[#E87527]/10 px-4 py-1.5 font-mono text-xs font-semibold text-[#E87527] dark:border-sky-400/30 dark:bg-sky-500/10 dark:text-sky-300">
            <span>ERROR // 404</span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="font-sans text-4xl font-bold tracking-tight text-[#171717] dark:text-white sm:text-6xl">
              Page Not Found
            </h1>
            <p className="mx-auto max-w-md font-body text-base text-[#171717]/80 dark:text-slate-300 sm:text-lg">
              The page you are looking for doesn&apos;t exist or may have been moved.
            </p>
          </div>

          {/* Action Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/"
              className={getButtonClasses({
                variant: "primary",
                size: "lg",
              })}
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              <span>Return to Homepage</span>
            </Link>

            <Link
              href="/#contact"
              className={getButtonClasses({
                variant: "secondary",
                size: "lg",
              })}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Contact Hasnain</span>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}

