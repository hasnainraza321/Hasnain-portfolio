"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps {
  readonly className?: string;
}

const emptySubscribe = () => () => {};

/**
 * Accessible Dual-Theme Toggle Control.
 * Seamlessly transitions between:
 * - Dark Mode (Default): Midnight Obsidian + Electric Cyan
 * - Light Mode: Warm Editorial Cream (#F2E9D8) + Ink Black (#171717) + Orange (#E87527)
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { toggleTheme, isDark } = useTheme();

  // Pure React 19 hydration-safe check without setState in useEffect
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isMounted) {
    // Render static placeholder with identical layout geometry to prevent layout shift
    return (
      <div
        aria-hidden="true"
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-full border border-sky-400/30 bg-[#0B1224] text-sky-400 opacity-80",
          className
        )}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isDark
          ? "Switch to Light Theme (Warm Cream & Orange)"
          : "Switch to Dark Theme (Midnight & Electric Cyan)"
      }
      title={
        isDark
          ? "Switch to Light Theme (Warm Cream & Orange)"
          : "Switch to Dark Theme (Midnight & Electric Cyan)"
      }
      className={cn(
        "group relative inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2",
        isDark
          ? "border-sky-400/35 bg-[#0B1224] text-sky-400 hover:border-sky-400 hover:bg-sky-400/10 hover:shadow-[0_0_16px_rgba(56,189,248,0.35)] focus-visible:outline-sky-400"
          : "border-[#E2D5C0] bg-[#FAF5EB] text-[#E87527] hover:border-[#E87527] hover:bg-[#FAF5EB] hover:shadow-[0_0_16px_rgba(232,117,39,0.3)] focus-visible:outline-[#E87527]",
        className
      )}
    >
      <span className="sr-only">
        {isDark ? "Switch to light theme" : "Switch to dark theme"}
      </span>

      {isDark ? (
        <Sun
          className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45"
          aria-hidden="true"
        />
      ) : (
        <Moon
          className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
