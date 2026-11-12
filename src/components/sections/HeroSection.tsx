import { ArrowRight } from "lucide-react";
import { HeroAutomationBackdrop } from "@/components/canvas/HeroAutomationBackdrop";
import { Container } from "@/components/layout/Container";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { LayeredWaveDivider, sectionSurface } from "@/components/ui/LayeredWaveDivider";
import { ScrollTextReveal } from "@/components/ui/ScrollTextReveal";
import { heroContent } from "@/data/portfolio-data";

/**
 * Primary Hero Section (`#home`) — Server Component with Dual Theme Support.
 * - Dark Theme: Midnight Obsidian with Electric Cyan highlights.
 * - Light Theme: Warm Editorial Cream (#F2E9D8) with Orange (#E87527) highlights.
 * Minimalist, high-impact, 100% centered layout.
 */
export function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-[#F2E9D8] text-[#171717] dark:bg-[#050811] dark:text-white pt-14 sm:pt-20 lg:pt-24 transition-colors duration-200"
    >
      {/* Dynamic 60fps Flowing Silk Ribbon & Particle Backdrop */}
      <HeroAutomationBackdrop />

      <Container className="relative z-10 pb-16 sm:pb-24 lg:pb-28">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          {/* Eyebrow Badge */}
          <MotionReveal delay={0.04} yOffset={16}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E87527]/30 bg-[#E87527]/10 text-[#E87527] dark:border-sky-400/30 dark:bg-sky-500/10 dark:text-sky-300 px-5 py-2 text-xs sm:text-sm font-mono font-medium tracking-wide transition-colors">
              <span>{heroContent.eyebrow}</span>
            </div>
          </MotionReveal>

          {/* Centered Headline */}
          <MotionReveal delay={0.08} yOffset={20} className="space-y-6">
            <h1
              id="hero-heading"
              className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#171717] dark:text-white leading-[1.12]"
            >
              <span>Build Smarter Businesses with </span>
              <span className="text-[#E87527] dark:text-sky-400 dark:drop-shadow-[0_0_24px_rgba(56,189,248,0.3)]">
                AI Agents &amp; AI Voice Agent
              </span>{" "}
              <span className="font-serif italic font-normal text-[#171717]/90 dark:text-slate-100">
                Automation
              </span>
            </h1>

            {/* Introduction & Value Proposition with Staggered Entrance */}
            <div className="mx-auto max-w-2xl space-y-4 font-body text-base sm:text-lg leading-relaxed text-[#171717]/85 dark:text-slate-300">
              <ScrollTextReveal delay={0.12} yOffset={12}>
                <p>
                  Hi, I&apos;m{" "}
                  <strong className="font-semibold text-[#171717] dark:text-white">
                    Hasnain Raza
                  </strong>{" "}
                  — I design and build intelligent AI agents, real-time voice
                  agent automation systems, and scalable full-stack
                  applications.
                </p>
              </ScrollTextReveal>

              <ScrollTextReveal delay={0.18} yOffset={12}>
                <p className="text-[#171717]/80 dark:text-slate-300/90 text-sm sm:text-base">
                  My priority is to{" "}
                  <strong className="text-[#E87527] dark:text-sky-300 font-semibold">
                    turn your repetitive manual tasks into intelligent automated
                    workflows
                  </strong>
                  , solve real-world business problems, and help businesses save
                  time, reduce operational costs, and scale efficiently.
                </p>
              </ScrollTextReveal>
            </div>
          </MotionReveal>

          {/* Centered Conversion Action CTAs */}
          <MotionReveal delay={0.22} yOffset={16}>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={heroContent.primaryCta.href}
                className="group inline-flex items-center gap-3 rounded-full bg-[#E87527] hover:bg-[#D45F12] text-white shadow-[0_0_24px_rgba(232,117,39,0.35)] dark:bg-sky-400 dark:hover:bg-sky-300 dark:text-slate-950 dark:shadow-[0_0_24px_rgba(56,189,248,0.35)] px-7 py-3.5 font-sans text-sm font-bold transition-all duration-150"
              >
                <span>{heroContent.primaryCta.label}</span>
                <ArrowRight
                  className="h-4 w-4 text-white dark:text-slate-950 transition-transform duration-150 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>

              <a
                href={heroContent.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-[#E2D5C0] bg-[#FAF5EB] text-[#171717] hover:border-[#E87527] hover:text-[#E87527] dark:border-sky-400/40 dark:bg-[#0B1224]/80 dark:text-white dark:hover:border-sky-400 dark:hover:text-sky-300 px-7 py-3.5 font-sans text-sm font-semibold transition-colors duration-150"
              >
                <span>{heroContent.secondaryCta.label}</span>
              </a>
            </div>
          </MotionReveal>
        </div>
      </Container>

      {/* Premium Multi-Layer Wave Transition into About Section */}
      <LayeredWaveDivider
        size="hero"
        from={sectionSurface.base}
        to={sectionSurface.raised}
        className="relative z-10"
      />
    </section>
  );
}
