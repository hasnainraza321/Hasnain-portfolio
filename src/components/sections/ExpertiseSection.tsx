import { ExpertiseBackdropCanvas } from "@/components/canvas/ExpertiseBackdropCanvas";
import { Container } from "@/components/layout/Container";
import { LayeredWaveDivider, sectionSurface } from "@/components/ui/LayeredWaveDivider";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { expertisePillars } from "@/data/portfolio-data";
import { cn } from "@/lib/utils";

/**
 * Expertise Section (`#expertise`) — Server Component with Dual Theme Support.
 * - Dark Theme: Midnight Dark with dynamic electric cyan stream canvas & white typography.
 * - Light Theme: Warm Editorial Cream (#F2E9D8) with warm orange stream canvas & ink typography.
 */
export function ExpertiseSection() {
  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="relative overflow-hidden bg-[#F2E9D8] text-[#171717] dark:bg-[#050811] dark:text-cream pt-20 sm:pt-28 transition-colors duration-200"
    >
      {/* 60fps Dynamic Generative Streamlines & Synaptic Data Pulses Canvas */}
      <ExpertiseBackdropCanvas />

      <Container className="relative z-10 pb-16 sm:pb-20">
        {/* Top Centered Section Header */}
        <MotionReveal>
          <SectionHeader
            eyebrow="02 / MY EXPERTISE"
            heading="Expertise with"
            italicHighlight="Precision"
            description="I combine autonomous AI engineering, AI voice agents, full-stack architecture, and workflow automation to build products that are fast, reliable, and future-ready."
            headingId="expertise-heading"
            headingLevel="h2"
            align="center"
            theme="dark"
            className="mb-16 sm:mb-20"
          />
        </MotionReveal>

        {/* 4-Column Modern Minimalist Grid with Subtle Divider Lines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {expertisePillars.map((pillar, index) => {
            return (
              <MotionReveal
                key={pillar.id}
                delay={0.08 + index * 0.08}
                className={cn(
                  "flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8",
                  // Divider lines between columns
                  index > 0 ? "lg:border-l lg:border-[#E2D5C0] dark:lg:border-white/10" : "",
                  index % 2 === 1 ? "sm:border-l sm:border-[#E2D5C0] lg:border-l dark:sm:border-white/10 dark:lg:border-white/10" : "",
                  index >= 2 ? "border-t border-[#E2D5C0] dark:border-white/10 sm:border-t-0" : "",
                  index === 1 ? "border-t border-[#E2D5C0] dark:border-white/10 sm:border-t-0" : ""
                )}
              >
                <div>
                  {/* Column Header */}
                  <div>
                    <h3 className="font-sans text-xl font-bold tracking-tight text-[#171717] dark:text-white sm:text-2xl">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Bulleted Capabilities List */}
                  <ul className="mt-7 space-y-3.5">
                    {pillar.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="group flex items-start gap-3 font-body text-sm sm:text-[15px] leading-relaxed text-[#171717]/80 dark:text-[#CBD5E1] transition-colors duration-150 hover:text-[#171717] dark:hover:text-white"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-[2px] bg-[#E87527] dark:bg-sky-400/70 transition-all duration-200 group-hover:scale-125 dark:group-hover:bg-sky-400"
                        />
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </Container>

      {/* Subtle Multi-Layer Wave Transition into Projects Section */}
      <LayeredWaveDivider
        flip
        from={sectionSurface.base}
        to={sectionSurface.base}
        className="relative z-10"
      />
    </section>
  );
}
