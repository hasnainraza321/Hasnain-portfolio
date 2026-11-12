import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import {
  ScrollTextReveal,
  WordStaggerHeading,
} from "@/components/ui/ScrollTextReveal";

export type HeadingTag = "h1" | "h2" | "h3" | "h4";
export type SectionHeaderAlignment = "left" | "center";
export type SectionHeaderTheme = "light" | "dark";

export interface SectionHeaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  readonly eyebrow?: string;
  readonly heading: string;
  readonly italicHighlight?: string;
  readonly description?: string;
  readonly headingLevel?: HeadingTag;
  readonly headingId?: string;
  readonly align?: SectionHeaderAlignment;
  readonly theme?: SectionHeaderTheme;
  readonly className?: string;
}

/**
 * Splits a heading so the final phrase is rendered in Playfair Display Italic
 * with accent color, matching the reference editorial typography:
 * e.g. "Expertise with" + "Precision" or "Demonstrated Systems &" + "Applications"
 */
function splitEditorialHeading(
  heading: string,
  explicitItalic?: string
): {
  readonly lead: string;
  readonly italicPart: string;
} {
  const cleanExplicit = explicitItalic?.replace(/\.+$/, "");
  const cleanHeading = heading.replace(/\.+$/, "");

  if (cleanExplicit) {
    return { lead: cleanHeading, italicPart: cleanExplicit };
  }
  const words = cleanHeading.trim().split(/\s+/);
  if (words.length <= 2) {
    return {
      lead: words[0] ?? "",
      italicPart: words.slice(1).join(" "),
    };
  }
  const splitIndex = Math.max(1, words.length - 2);
  return {
    lead: words.slice(0, splitIndex).join(" "),
    italicPart: words.slice(splitIndex).join(" "),
  };
}

/**
 * Editorial section header combining geometric sans-serif with Playfair Display
 * italic highlights with smooth scroll-triggered text animations.
 */
export function SectionHeader({
  eyebrow,
  heading,
  italicHighlight,
  description,
  headingLevel = "h2",
  headingId,
  align = "left",
  theme = "dark",
  className,
  ...props
}: SectionHeaderProps) {
  const isCentered = align === "center";
  const isDarkTheme = theme === "dark";
  const { lead, italicPart } = splitEditorialHeading(heading, italicHighlight);

  return (
    <div
      className={cn(
        "space-y-3.5",
        isCentered ? "mx-auto max-w-3xl text-center" : "max-w-2xl text-left",
        className
      )}
      {...props}
    >
      {eyebrow ? (
        <ScrollTextReveal delay={0.02} yOffset={10} duration={0.45}>
          <p
            className={cn(
              "font-mono text-[11px] font-semibold tracking-[0.24em] uppercase",
              isDarkTheme
                ? "text-[#E87527] dark:text-sky-400"
                : "text-[#E87527] dark:text-[#0284C7]"
            )}
          >
            {eyebrow}
          </p>
        </ScrollTextReveal>
      ) : null}

      <div>
        <WordStaggerHeading
          as={headingLevel}
          id={headingId}
          leadText={lead}
          highlightText={italicPart}
          delay={0.05}
          className={cn(
            "font-sans text-3xl leading-[1.1] font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]",
            isDarkTheme
              ? "text-[#171717] dark:text-cream"
              : "text-[#171717] dark:text-[#0B1120]"
          )}
          highlightClassName={cn(
            "font-editorial font-medium",
            isDarkTheme
              ? "text-[#E87527] dark:text-sky-400 dark:drop-shadow-[0_0_24px_rgba(56,189,248,0.28)]"
              : "text-[#E87527] dark:text-[#0284C7]"
          )}
        />
      </div>

      {description ? (
        <ScrollTextReveal delay={0.14} yOffset={14} duration={0.6}>
          <p
            className={cn(
              "font-body text-sm leading-relaxed sm:text-base",
              isDarkTheme
                ? "text-[#171717]/75 dark:text-cream/70"
                : "text-[#171717]/75 dark:text-[#0B1120]/75",
              isCentered ? "mx-auto max-w-2xl" : "max-w-xl"
            )}
          >
            {description}
          </p>
        </ScrollTextReveal>
      ) : null}
    </div>
  );
}
