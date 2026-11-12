"use client";

import { useMemo, useState } from "react";
import type { ComponentType } from "react";
import {
  ArrowRight,
  Bot,
  Brain,
  Cpu,
  Globe,
  Layers,
  Mic,
  Workflow,
} from "lucide-react";
import { ProjectsBackdropCanvas } from "@/components/canvas/ProjectsBackdropCanvas";
import { Container } from "@/components/layout/Container";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LayeredWaveDivider, sectionSurface } from "@/components/ui/LayeredWaveDivider";
import { showcaseFilterTabs, showcaseProjects } from "@/data/portfolio-data";
import type { ShowcaseCategory, ShowcaseProject } from "@/types/portfolio";
import { cn } from "@/lib/utils";

// Category-specific clean Lucide icons
const categoryIcons: Record<
  ShowcaseProject["filterCategory"],
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  "web-dev": Globe,
  "voice-ai": Mic,
  chatbots: Bot,
  "ai-nlp": Brain,
  automation: Workflow,
  integrations: Layers,
  all: Cpu,
};

/**
 * Projects Section (`#projects`) — Client Component with Dual Theme Support.
 * - Dark Theme: Midnight Obsidian with clean high-contrast white project cards.
 * - Light Theme: Warm Editorial Cream (#F2E9D8) with warm light cream project cards.
 */
export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ShowcaseCategory>("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return showcaseProjects;
    return showcaseProjects.filter((p) => p.filterCategory === activeFilter);
  }, [activeFilter]);

  // Compute item counts per category for the filter tabs
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: showcaseProjects.length };
    for (const project of showcaseProjects) {
      counts[project.filterCategory] = (counts[project.filterCategory] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative overflow-hidden bg-[#F2E9D8] text-[#171717] dark:bg-[#050811] dark:text-cream pt-16 sm:pt-24 transition-colors duration-200"
    >
      {/* Dynamic Projects Horizon Streamlines & Ambient Constellation Backdrop */}
      <ProjectsBackdropCanvas />

      <Container className="relative z-10 pb-20 sm:pb-28">
        {/* Top Centered Section Header + Direct CTA */}
        <MotionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeader
              eyebrow="03 / PORTFOLIO SHOWCASE"
              heading="Demonstrated Systems &"
              italicHighlight="Applications"
              description="A comprehensive showcase of modern web platforms, conversational voice agents, intelligent chatbots, NLP extraction pipelines, and end-to-end CRM integrations I have experience building."
              headingId="projects-heading"
              headingLevel="h2"
              align="center"
              theme="dark"
            />

            <div className="mt-7 flex justify-center">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2.5 rounded-full border border-[#E87527] bg-[#E87527] text-white hover:bg-[#D45F12] shadow-[0_4px_16px_rgba(232,117,39,0.25)] dark:border-sky-400/40 dark:bg-[#0B1224]/90 dark:text-cream dark:shadow-[0_0_24px_rgba(56,189,248,0.2)] dark:hover:border-sky-400 dark:hover:bg-sky-400 dark:hover:text-[#050811] px-5 py-2.5 font-sans text-xs font-semibold transition-all duration-200"
              >
                <span>Discuss Your Project</span>
                <ArrowRight
                  className="h-3.5 w-3.5 text-white dark:text-sky-400 transition-transform group-hover:translate-x-0.5 dark:group-hover:text-[#050811]"
                  aria-hidden={true}
                />
              </a>
            </div>
          </div>
        </MotionReveal>

        {/* Category Filter Tabs Centered */}
        <div className="mt-12 flex justify-center overflow-x-auto pb-2 scrollbar-none">
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex items-center gap-2 min-w-max rounded-2xl border border-[#E2D5C0] bg-[#FAF5EB]/90 dark:border-white/10 dark:bg-[#081022]/80 p-1.5 backdrop-blur-xl transition-colors"
          >
            {showcaseFilterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              const count = categoryCounts[tab.id] || 0;

              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(tab.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs font-semibold transition-all duration-200 select-none cursor-pointer",
                    isActive
                      ? "bg-[#E87527] text-white shadow-[0_2px_12px_rgba(232,117,39,0.3)] dark:bg-sky-400 dark:text-[#050811] dark:shadow-[0_0_18px_rgba(56,189,248,0.4)]"
                      : "text-[#171717]/70 hover:bg-[#E2D5C0]/40 hover:text-[#171717] dark:text-cream/70 dark:hover:bg-white/5 dark:hover:text-white"
                  )}
                >
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.2 text-[10px]",
                      isActive
                        ? "bg-white/20 text-white dark:bg-[#050811]/25 dark:text-[#050811] font-bold"
                        : "bg-[#E2D5C0]/50 text-[#171717] dark:bg-white/10 dark:text-sky-300"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Responsive Grid of Clean Project Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-7">
          {filteredProjects.map((project, index) => {
            const IconComponent = categoryIcons[project.filterCategory] || Globe;

            return (
              <MotionReveal key={project.id} delay={0.03 + (index % 6) * 0.04}>
                <article className="group flex h-full flex-col justify-between rounded-2xl border border-[#E2D5C0] bg-[#FAF5EB] dark:border-slate-200/90 dark:bg-white p-6 shadow-sm dark:shadow-md transition-all duration-200 hover:-translate-y-1.5 hover:border-[#E87527] hover:shadow-xl dark:hover:border-sky-400 dark:hover:shadow-2xl sm:p-7">
                  <div>
                    {/* Top Row: Clean Icon + Category Index + Optional Badge */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E87527]/20 bg-[#E87527]/10 text-[#E87527] group-hover:bg-[#E87527] group-hover:text-white dark:border-sky-100 dark:bg-sky-50 dark:text-[#0284C7] dark:group-hover:border-sky-300 dark:group-hover:bg-[#0284C7] dark:group-hover:text-white transition-colors duration-200">
                          <IconComponent className="h-5 w-5" aria-hidden={true} />
                        </div>
                        <div>
                          <span className="block font-mono text-[11px] font-bold tracking-wider text-[#E87527] dark:text-[#0284C7] uppercase">
                            {project.category}
                          </span>
                          <span className="block font-mono text-[10px] text-slate-400">
                            PROJECT // {project.index}
                          </span>
                        </div>
                      </div>

                      {project.badge ? (
                        <span className="rounded-full border border-[#E2D5C0] bg-[#FFFDF9] dark:border-slate-200 dark:bg-slate-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#171717]/70 dark:text-slate-600">
                          {project.badge}
                        </span>
                      ) : null}
                    </div>

                    {/* Project Title */}
                    <h3 className="mt-5 font-sans text-lg font-bold tracking-tight text-[#171717] dark:text-[#0B1120] transition-colors duration-200 group-hover:text-[#E87527] dark:group-hover:text-[#0284C7] sm:text-xl">
                      {project.title}
                    </h3>

                    {/* Short, Punchy Description */}
                    <p className="mt-2.5 font-body text-sm leading-relaxed text-[#171717]/75 dark:text-slate-600">
                      {project.description}
                    </p>
                  </div>

                  {/* Clean Minimal Tech Tags Footer */}
                  <div className="mt-6 border-t border-[#E2D5C0]/60 dark:border-slate-100 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-[#E2D5C0] bg-[#FFFDF9] text-[#171717]/80 dark:border-slate-200/80 dark:bg-slate-50 dark:text-slate-700 px-2.5 py-1 font-mono text-[11px] font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </MotionReveal>
            );
          })}
        </div>
      </Container>

      {/* Multi-Layer Wave Transition into Process Section */}
      <LayeredWaveDivider
        from={sectionSurface.base}
        to={sectionSurface.process}
        className="relative z-10"
      />
    </section>
  );
}
