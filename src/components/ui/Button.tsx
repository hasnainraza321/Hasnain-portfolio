import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "dark";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonStyleOptions {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-[#E87527] bg-[#E87527] text-white font-semibold shadow-[0_4px_16px_rgba(232,117,39,0.25)] hover:bg-[#D45F12] hover:border-[#D45F12] dark:border-sky-400/50 dark:bg-[#0B1224]/90 dark:text-cream dark:shadow-[0_0_24px_rgba(56,189,248,0.22),inset_0_1px_0_rgba(255,255,255,0.12)] dark:hover:border-sky-400 dark:hover:bg-sky-400 dark:hover:text-[#050811] dark:hover:shadow-[0_0_30px_rgba(56,189,248,0.48)]",
  secondary:
    "border border-[#E2D5C0] bg-[#FAF5EB] text-[#171717] font-medium hover:border-[#E87527] hover:text-[#E87527] dark:border-cream/20 dark:bg-cream/[0.04] dark:text-cream dark:hover:border-sky-400/60 dark:hover:text-sky-300",
  dark: "border border-[#0B1120] bg-[#0B1120] text-white font-semibold shadow-[0_10px_25px_rgba(11,17,32,0.25)] hover:bg-[#E87527] hover:border-[#E87527] dark:hover:bg-[#0284C7] dark:hover:border-[#0284C7]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-xs sm:text-sm",
  lg: "px-6 py-3 text-sm",
};

/**
 * Generates consistent accessible glassmorphic pill CTA classes for both `<Button>`
 * elements and semantic `<a>` / `<Link>` navigation anchors.
 */
export function getButtonClasses({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleOptions = {}): string {
  return cn(
    "inline-flex items-center justify-center gap-2.5 rounded-full font-sans",
    "transition-all duration-200 select-none cursor-pointer",
    "focus-visible:outline-2 focus-visible:outline-[#E87527] dark:focus-visible:outline-sky-400 focus-visible:outline-offset-3",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
    variantClasses[variant],
    sizeClasses[size],
    className
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly children: ReactNode;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
}

/**
 * Accessible HTML `<button>` primitive for interactive actions and form submissions.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={getButtonClasses({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  );
}
