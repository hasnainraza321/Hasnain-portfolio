import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactSection } from "@/components/sections/ContactSection";

/**
 * Main Portfolio Page (Server Component).
 * Composes the six approved portfolio sections inside `<main id="main-content">`
 * with seamless Dark & Light theme support.
 */
export default function HomePage() {
  return (
    <main
      id="main-content"
      className="min-h-dvh bg-[#F2E9D8] text-[#171717] dark:bg-[#050811] dark:text-cream transition-colors duration-200"
    >
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <ProjectsSection />
      <ProcessSection />
      <ContactSection />
    </main>
  );
}
