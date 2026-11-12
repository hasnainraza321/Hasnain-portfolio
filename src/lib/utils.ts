/**
 * Shared utility helpers for styling and security-conscious URL handling.
 */

export type ClassValue = string | number | boolean | null | undefined;

/**
 * Joins conditional class names cleanly without external runtime overhead.
 */
export function cn(...inputs: readonly ClassValue[]): string {
  return inputs
    .filter((value): value is string | number => Boolean(value))
    .join(" ");
}

/**
 * Validates that an external link uses an explicitly safe protocol (`https:` or `mailto:`).
 * Prevents accidental `javascript:` or `data:` URI execution.
 */
export function isSafeExternalHref(href: string): boolean {
  const trimmed = href.trim();
  if (!trimmed) {
    return false;
  }

  if (trimmed.startsWith("mailto:")) {
    return /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(trimmed);
  }

  if (trimmed.startsWith("tel:")) {
    return /^tel:[+0-9\s\-()]+$/i.test(trimmed);
  }

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
}

