"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MotionRevealProps {
  readonly children: ReactNode;
  readonly delay?: number;
  readonly yOffset?: number;
  readonly className?: string;
}

/**
 * Scroll-triggered entrance animation wrapper powered by Framer Motion.
 * Automatically disables motion when the user has `prefers-reduced-motion: reduce` enabled.
 */
export function MotionReveal({
  children,
  delay = 0,
  yOffset = 24,
  className,
}: MotionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

