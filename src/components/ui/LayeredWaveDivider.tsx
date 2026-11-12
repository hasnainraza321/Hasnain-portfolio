import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** A pair of colors: one for Light Mode and one for Dark Mode. */
export interface ThemeColorPair {
  readonly light: string;
  readonly dark: string;
}

export type LayeredWaveSize = "hero" | "section" | "footer";

export interface LayeredWaveDividerProps {
  /** Background of the section the wave sits at the bottom of (visible behind the curves). */
  readonly from: ThemeColorPair;
  /** Background of the section that follows (the front-most wave layer). */
  readonly to: ThemeColorPair;
  /** Visual prominence. `hero` is tallest, `section` is subtle, `footer` is medium. */
  readonly size?: LayeredWaveSize;
  /** Mirror the wave horizontally to alternate direction between sections. */
  readonly flip?: boolean;
  readonly className?: string;
}

/** Shared section background tokens, so every divider uses identical colors. */
export const sectionSurface = {
  /** Hero, Expertise, Projects, Contact base. */
  base: { light: "#F2E9D8", dark: "#050811" },
  /** About body & Contact CTA band. */
  raised: { light: "#FAF5EB", dark: "#EEF2F7" },
  /** Process body. */
  process: { light: "#FAF5EB", dark: "#FFFFFF" },
  /** Footer. */
  footer: { light: "#EADBCA", dark: "#04070E" },
} as const satisfies Record<string, ThemeColorPair>;

const sizeClasses: Record<LayeredWaveSize, string> = {
  hero: "h-20 sm:h-28 md:h-36 lg:h-44",
  section: "h-12 sm:h-16 md:h-20 lg:h-24",
  footer: "h-16 sm:h-20 md:h-28 lg:h-32",
};

/**
 * Premium Multi-Layer Curved SVG Wave Divider (Server Component, zero JS).
 *
 * Four overlapping curves in a single 1440×220 viewBox:
 *   Layer 1–3 → theme accent layers (see `.layered-wave` tokens in globals.css)
 *     • Dark Mode:  deep navy → charcoal slate → muted grey-blue
 *     • Light Mode: soft peach → warm peach → brand orange (#E87527)
 *   Layer 4   → the next section's background, guaranteeing a gap-free hand-off.
 *
 * Theme switching is pure CSS (custom properties scoped by `html.dark`),
 * so there is no hydration mismatch, no flash and no re-render on toggle.
 */
export function LayeredWaveDivider({
  from,
  to,
  size = "section",
  flip = false,
  className,
}: LayeredWaveDividerProps) {
  const style = {
    "--lw-from-light": from.light,
    "--lw-from-dark": from.dark,
    "--lw-to-light": to.light,
    "--lw-to-dark": to.dark,
  } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      style={style}
      className={cn(
        "layered-wave pointer-events-none relative w-full overflow-hidden leading-none select-none -mb-px",
        className
      )}
    >
      <svg
        viewBox="0 0 1440 220"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        focusable="false"
        className={cn("block w-full", sizeClasses[size], flip && "-scale-x-100")}
      >
        <path
          d="M0,50 C320,95 640,15 960,65 C1180,95 1340,40 1440,55 L1440,220 L0,220 Z"
          style={{ fill: "var(--lw-1)" }}
        />
        <path
          d="M0,90 C260,40 540,135 820,85 C1080,45 1280,120 1440,95 L1440,220 L0,220 Z"
          style={{ fill: "var(--lw-2)" }}
        />
        <path
          d="M0,135 C340,90 620,165 940,115 C1180,80 1340,140 1440,130 L1440,220 L0,220 Z"
          style={{ fill: "var(--lw-3)" }}
        />
        <path
          d="M0,170 C360,135 680,205 1020,165 C1240,138 1360,180 1440,168 L1440,221 L0,221 Z"
          style={{ fill: "var(--lw-to)" }}
        />
      </svg>
    </div>
  );
}
