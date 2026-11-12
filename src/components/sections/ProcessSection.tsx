import { ArrowRight, CheckCircle2, Compass, Layers, Target } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LayeredWaveDivider, sectionSurface } from "@/components/ui/LayeredWaveDivider";
import { customerJourneySteps } from "@/data/portfolio-data";

// Minimalist stage iconography reflecting agency-grade business transformation
const stageIcons: Record<
  string,
  typeof Compass
> = {
  "01": Compass,
  "02": Target,
  "03": Layers,
  "04": CheckCircle2,
};

/**
 * Process Section (`#process`) — Server Component with Dual Theme Support.
 * - Dark Theme: Pure White Elevated Surface on Midnight Base.
 * - Light Theme: Warm Subtle Cream Surface (#FAF5EB) on Base Cream (#F2E9D8).
 */
export function ProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative bg-[#F2E9D8] dark:bg-[#050811] transition-colors duration-200"
    >
      {/* Clean Stage Surface */}
      <div className="relative overflow-hidden bg-[#FAF5EB] dark:bg-white py-20 text-[#171717] sm:py-28 lg:py-32 transition-colors duration-200">
        {/* Subtle Radial Ambient Lighting */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(232,117,39,0.04)_0%,rgba(255,255,255,0)_65%)] dark:bg-[radial-gradient(circle_at_50%_15%,rgba(2,132,199,0.05)_0%,rgba(255,255,255,0)_65%)]"
        />

        <Container className="relative z-10">
          {/* Section Header */}
          <MotionReveal>
            <div className="mx-auto max-w-3xl text-center">
              <SectionHeader
                eyebrow="HOW WE WORK"
                heading="From First Conversation to"
                italicHighlight="Real Business Impact"
                description="Every successful solution starts with understanding your business. Here's how we turn your challenges into practical solutions that move your business forward."
                headingId="process-heading"
                headingLevel="h2"
                align="center"
                theme="light"
                className="mb-16 sm:mb-24"
              />
            </div>
          </MotionReveal>

          {/* Connected Four-Step Business Journey */}
          <div className="relative">
            {/* Subtle Desktop Horizontal Connecting Line */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[12%] right-[12%] top-16 hidden h-px bg-gradient-to-r from-transparent via-[#E2D5C0] dark:via-slate-300 to-transparent lg:block"
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {customerJourneySteps.map((step, index) => {
                const Icon = stageIcons[step.stepNumber] || Compass;

                return (
                  <MotionReveal
                    key={step.id}
                    delay={0.06 + index * 0.08}
                    className="relative flex"
                  >
                    <article className="group relative flex h-full w-full flex-col justify-between rounded-3xl border border-[#E2D5C0] dark:border-slate-200/90 bg-[#FFFDF9] dark:bg-white p-7 shadow-sm dark:shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E87527]/50 hover:shadow-[0_16px_36px_rgba(232,117,39,0.12)] dark:hover:border-[#0284C7]/50 dark:hover:shadow-[0_16px_36px_rgba(2,132,199,0.12)] sm:p-8">
                      <div className="space-y-6">
                        {/* Step Number & Minimalist Visual Accent */}
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-3xl font-bold tracking-tight text-[#E87527] dark:text-[#0284C7] sm:text-4xl">
                            {step.stepNumber}
                          </span>
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-50 text-[#E87527] dark:border-sky-500/20 dark:bg-sky-50 dark:text-[#0284C7] shadow-sm transition-transform duration-200 group-hover:scale-105">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </div>
                        </div>

                        {/* Stage Tag */}
                        <div>
                          <span className="font-mono text-xs font-bold tracking-widest text-[#E87527] dark:text-[#0284C7] uppercase">
                            STAGE {step.stepNumber} — {step.stageTag}
                          </span>
                        </div>

                        {/* Stage Title & Business Description */}
                        <div className="space-y-3">
                          <h3 className="font-sans text-xl font-bold tracking-tight text-[#171717] dark:text-[#0B1120] leading-snug transition-colors duration-200 group-hover:text-[#E87527] dark:group-hover:text-[#0284C7] sm:text-2xl">
                            {step.title}
                          </h3>
                          <p className="font-body text-sm leading-relaxed text-[#171717]/75 dark:text-slate-600">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Supporting Label */}
                      <div className="mt-8 border-t border-[#E2D5C0]/60 dark:border-slate-100 pt-5">
                        <div className="flex items-center gap-2 font-sans text-xs font-semibold text-[#171717]/60 dark:text-slate-500">
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-[#E87527] dark:bg-[#0284C7]"
                            aria-hidden="true"
                          />
                          <span>{step.supportingLabel}</span>
                        </div>
                      </div>
                    </article>
                  </MotionReveal>
                );
              })}
            </div>
          </div>

          {/* Final Section Call-To-Action */}
          <MotionReveal delay={0.25} className="mt-16 sm:mt-24">
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[#E2D5C0] dark:border-slate-200/90 bg-[#FFFDF9] dark:bg-white p-8 text-center shadow-md dark:shadow-lg sm:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-orange-500/10 dark:bg-sky-500/10 blur-3xl"
              />

              <div className="relative z-10 space-y-4">
                <span className="font-mono text-xs font-bold tracking-widest text-[#E87527] dark:text-[#0284C7] uppercase">
                  READY TO MOVE FORWARD?
                </span>

                <h3 className="font-sans text-2xl font-bold tracking-tight text-[#171717] dark:text-[#0B1120] sm:text-3xl lg:text-4xl">
                  Have a Business Challenge? Let&apos;s Talk
                </h3>

                <p className="mx-auto max-w-2xl font-body text-sm leading-relaxed text-[#171717]/75 dark:text-slate-600 sm:text-base">
                  Tell me what your business needs. We&apos;ll figure out the right solution together.
                </p>

                <div className="flex justify-center pt-3">
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-[#E87527] hover:bg-[#D45F12] text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl dark:bg-[#0B1120] dark:hover:bg-[#0284C7] px-8 py-4 font-sans text-sm font-semibold"
                  >
                    <span>Start a Conversation</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>
          </MotionReveal>
        </Container>
      </div>

      {/* Multi-Layer Wave Transition into Contact Section */}
      <LayeredWaveDivider
        flip
        from={sectionSurface.process}
        to={sectionSurface.base}
      />
    </section>
  );
}
