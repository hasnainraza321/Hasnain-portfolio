"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { navigationConfig } from "@/data/portfolio-data";
import type { SectionId } from "@/types/portfolio";
import { cn } from "@/lib/utils";

/**
 * Main responsive portfolio navigation with Dual Theme System.
 * - Dark Theme: Midnight Dark Glassmorphic Header with Electric Cyan Accents.
 * - Light Theme: Warm Editorial Cream Glassmorphic Header with Orange & Ink Accents.
 */
export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  const mobileMenuId = useId();
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  const closeMobileMenu = useCallback((returnFocusToToggle = false) => {
    setIsMobileMenuOpen(false);
    if (returnFocusToToggle) {
      requestAnimationFrame(() => {
        toggleButtonRef.current?.focus();
      });
    }
  }, []);

  const handleLinkClick = useCallback((sectionId: SectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  }, []);

  // Synchronize initial hash and browser back/forward hash navigation
  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace("#", "") as SectionId;
      const isValidSection = navigationConfig.items.some(
        (item) => item.id === hash
      );
      if (isValidSection) {
        setActiveSection(hash);
      }
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  // Close on Escape key & automatically close if viewport expands to desktop
  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobileMenu(true);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  // Move focus to the first link when the mobile menu opens via keyboard/click
  useEffect(() => {
    if (isMobileMenuOpen) {
      requestAnimationFrame(() => {
        firstMobileLinkRef.current?.focus();
      });
    }
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E2D5C0] bg-[#F2E9D8]/90 dark:border-sky-400/12 dark:bg-[#050811]/85 backdrop-blur-xl transition-colors duration-200">
      <Container
        as="nav"
        aria-label="Primary navigation"
        className="flex h-20 items-center justify-between gap-4"
      >
        {/* Brand Wordmark & Role Subtitle */}
        <a
          href="#home"
          onClick={() => handleLinkClick("home")}
          className="group inline-flex flex-col justify-center font-sans tracking-tight text-[#171717] dark:text-white transition-colors"
        >
          <span className="text-lg sm:text-xl font-bold tracking-tight leading-none group-hover:text-[#E87527] dark:group-hover:text-sky-400 transition-colors">
            {navigationConfig.brandWordmark}
          </span>
          <span className="mt-1 font-mono text-[9px] sm:text-[10px] font-semibold tracking-wider text-[#E87527] dark:text-sky-400 uppercase">
            Agentic AI Engineer &amp; Automation Developer
          </span>
        </a>

        {/* Right-Aligned Desktop Navigation + Theme Toggle + Glowing Pill CTA */}
        <div className="hidden md:flex md:items-center md:gap-6 lg:gap-7">
          <ul className="flex items-center gap-5 lg:gap-7">
            {navigationConfig.items.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => handleLinkClick(item.id)}
                    className={cn(
                      "relative py-1.5 font-sans text-xs font-medium tracking-wide transition-colors duration-150 lg:text-sm",
                      isActive
                        ? "text-[#E87527] dark:text-sky-400 font-semibold"
                        : "text-[#171717]/75 dark:text-cream/75 hover:text-[#171717] dark:hover:text-cream"
                    )}
                  >
                    {item.label}
                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-[#E87527] shadow-[0_0_10px_#E87527] dark:bg-sky-400 dark:shadow-[0_0_10px_#38BDF8]"
                      />
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Component */}
            <ThemeToggle />

            {/* Glowing Pill Primary CTA */}
            <a
              href={navigationConfig.primaryCta.href}
              onClick={() => handleLinkClick("contact")}
              className="group inline-flex items-center gap-2.5 rounded-full border border-[#E87527] bg-[#E87527] text-white shadow-[0_4px_16px_rgba(232,117,39,0.25)] hover:bg-[#D45F12] dark:border-sky-400/45 dark:bg-[#0B1224]/90 dark:text-cream dark:shadow-[0_0_20px_rgba(56,189,248,0.2)] dark:hover:border-sky-400 dark:hover:bg-sky-400 dark:hover:text-[#050811] dark:hover:shadow-[0_0_28px_rgba(56,189,248,0.45)] px-4 py-2 font-sans text-xs font-semibold transition-all duration-200"
            >
              <span>{navigationConfig.primaryCta.label}</span>
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-white dark:bg-sky-400 dark:shadow-[0_0_8px_#38BDF8] transition-colors dark:group-hover:bg-[#050811]"
              />
            </a>
          </div>
        </div>

        {/* Mobile Header Controls (Theme Toggle + Menu Toggle) */}
        <div className="flex items-center gap-2.5 md:hidden">
          <ThemeToggle />

          <button
            ref={toggleButtonRef}
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-controls={mobileMenuId}
            aria-label={
              isMobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E2D5C0] bg-[#FAF5EB] text-[#171717] hover:border-[#E87527] hover:text-[#E87527] dark:border-sky-400/35 dark:bg-[#0B1224] dark:text-cream dark:hover:border-sky-400 dark:hover:text-sky-400 transition-colors duration-150"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      {/* Responsive Mobile Navigation Drawer */}
      {isMobileMenuOpen ? (
        <div
          id={mobileMenuId}
          aria-label="Mobile navigation"
          className="border-t border-[#E2D5C0] bg-[#F2E9D8]/98 dark:border-sky-400/15 dark:bg-[#050811]/98 backdrop-blur-xl md:hidden"
        >
          <Container className="py-6">
            <ul className="flex flex-col space-y-2">
              {navigationConfig.items.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <a
                      ref={index === 0 ? firstMobileLinkRef : undefined}
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      onClick={() => handleLinkClick(item.id)}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3 font-sans text-base font-semibold transition-colors duration-150",
                        isActive
                          ? "border border-[#E87527]/40 bg-[#E87527]/10 text-[#E87527] dark:border-sky-400/40 dark:bg-sky-500/10 dark:text-sky-400"
                          : "text-[#171717]/85 hover:bg-black/5 dark:text-cream/85 dark:hover:bg-cream/5 hover:text-[#171717] dark:hover:text-cream"
                      )}
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-xs text-[#E87527]/70 dark:text-sky-400/70">
                        0{index + 1}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 border-t border-[#E2D5C0] dark:border-cream/10 pt-5">
              <a
                href={navigationConfig.primaryCta.href}
                onClick={() => handleLinkClick("contact")}
                className="flex w-full items-center justify-center gap-2.5 rounded-full border border-[#E87527] bg-[#E87527] px-5 py-3 font-sans text-sm font-bold text-white shadow-[0_0_20px_rgba(232,117,39,0.35)] dark:border-sky-400 dark:bg-sky-400 dark:text-[#050811] dark:shadow-[0_0_24px_rgba(56,189,248,0.4)]"
              >
                <span>{navigationConfig.primaryCta.label}</span>
                <span
                  aria-hidden="true"
                  className="inline-block h-2 w-2 rounded-full bg-white dark:bg-[#050811]"
                />
              </a>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
