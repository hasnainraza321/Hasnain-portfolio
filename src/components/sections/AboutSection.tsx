import { EarthGlobeCanvas } from "@/components/canvas/EarthGlobeCanvas";
import { Container } from "@/components/layout/Container";
import { LayeredWaveDivider, sectionSurface } from "@/components/ui/LayeredWaveDivider";
import {
  ScrollTextReveal,
  WordStaggerHeading,
} from "@/components/ui/ScrollTextReveal";
import { aboutContent } from "@/data/portfolio-data";

/**
 * About Section (`#about`) — Server Component with Dual Theme Support.
 * - Dark Theme: Sculpted Alabaster Silk Wave Body (#EEF2F7) on Midnight (#050811).
 * - Light Theme: Warm Editorial Light Cream (#FAF5EB) on Base Cream (#F2E9D8).
 */
export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative bg-[#F2E9D8] dark:bg-[#050811] transition-colors duration-200"
    >
      {/* Sculpted Silk Wave Body */}
      <div className="relative overflow-hidden bg-[#FAF5EB] dark:bg-[#EEF2F7] py-16 text-[#171717] dark:text-[#0B1120] sm:py-24 transition-colors duration-200">
        <Container className="relative z-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Content (Narrative, Business + AI Philosophy) */}
            <div className="space-y-6 lg:col-span-6">
              <ScrollTextReveal delay={0.02} yOffset={10}>
                <p className="font-mono text-xs font-semibold tracking-[0.24em] text-[#E87527] dark:text-[#0284C7] uppercase">
                  {aboutContent.eyebrow}
                </p>
              </ScrollTextReveal>

              <div>
                <WordStaggerHeading
                  as="h2"
                  id="about-heading"
                  leadText="Bridging Business Strategy with"
                  highlightText="AI Engineering"
                  delay={0.05}
                  className="mt-3 font-sans text-3xl leading-[1.15] font-bold tracking-tight text-[#171717] dark:text-[#0B1120] sm:text-4xl lg:text-[2.75rem]"
                  highlightClassName="font-serif italic font-medium text-[#E87527] dark:text-[#0284C7]"
                />
              </div>

              <div className="space-y-5 font-body text-base leading-relaxed text-[#171717]/85 dark:text-[#0B1120]/85">
                <ScrollTextReveal delay={0.1} yOffset={14}>
                  <p>
                    I&apos;m{" "}
                    <strong className="font-bold text-[#171717] dark:text-[#0B1120]">
                      Hasnain Raza
                    </strong>
                    , a business graduate and Full-Stack AI Automation Developer
                    specializing in Agentic AI engineering, and intelligent
                    business automation.
                  </p>
                </ScrollTextReveal>

                <ScrollTextReveal delay={0.14} yOffset={14}>
                  <p>
                    With a background in{" "}
                    <strong className="text-[#E87527] dark:text-[#0284C7] font-semibold">
                      Business Administration &amp; Marketing
                    </strong>
                    , I understand how businesses operate, where inefficiencies
                    occur, and how technology can solve real operational
                    challenges.
                  </p>
                </ScrollTextReveal>

                <ScrollTextReveal delay={0.18} yOffset={14}>
                  <p>
                    I combine this business knowledge with hands-on expertise in{" "}
                    <strong className="text-[#171717] dark:text-[#0B1120] font-semibold">
                      AI Agents, AI Voice Agent N8N Automation, Next.js, Python
                      Backend Development, and API Integrations
                    </strong>{" "}
                    to build scalable digital solutions that streamline workflows,
                    automate repetitive tasks, and improve business efficiency.
                  </p>
                </ScrollTextReveal>

                {/* Core Philosophy Callout */}
                <ScrollTextReveal delay={0.22} yOffset={16}>
                  <div className="rounded-2xl border-l-4 border-[#E87527] dark:border-[#0284C7] bg-[#FFFDF9] dark:bg-white p-5 shadow-sm border border-[#E2D5C0]/60 dark:border-transparent">
                    <p className="font-sans text-sm sm:text-base font-semibold text-[#171717] dark:text-[#0B1120] italic leading-relaxed">
                      &ldquo;My philosophy is simple: Understand the business,
                      identify the problem, and build intelligent solutions that
                      deliver real value.&rdquo;
                    </p>
                  </div>
                </ScrollTextReveal>

                {/* Bottom Signature Tagline */}
                <ScrollTextReveal delay={0.26} yOffset={12}>
                  <div className="pt-2">
                    <p className="font-mono text-xs sm:text-sm font-bold text-[#171717] dark:text-[#0B1120] tracking-wider uppercase">
                      BUSINESS-MINDED. &bull; ENGINEERING-DRIVEN. &bull;
                      AI-POWERED.
                    </p>
                  </div>
                </ScrollTextReveal>
              </div>
            </div>

            {/* Right Column: Animation (3D Holographic Earth Globe with Dual Theme) */}
            <div className="flex items-center justify-center lg:col-span-6">
              <EarthGlobeCanvas />
            </div>
          </div>
        </Container>
      </div>

      {/* Multi-Layer Wave Transition into Expertise Section */}
      <LayeredWaveDivider
        from={sectionSurface.raised}
        to={sectionSurface.base}
        className="relative z-10"
      />
    </section>
  );
}
