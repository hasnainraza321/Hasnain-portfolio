"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type ScrollTextTag = "div" | "p" | "span" | "h1" | "h2" | "h3" | "h4";

export interface ScrollTextRevealProps {
  readonly children: ReactNode;
  readonly as?: ScrollTextTag;
  readonly delay?: number;
  readonly yOffset?: number;
  readonly duration?: number;
  readonly className?: string;
}

const naturalEase = [0.22, 1, 0.36, 1] as const;

// Statically declared outside render to satisfy React 19 static component rules
const motionMap = {
  div: motion.div,
  p: motion.p,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
} as const;

/**
 * Scroll-triggered smooth block/paragraph reveal.
 * Animates opacity and a subtle upward translation when scrolled into view.
 * Immediately falls back to static content if `prefers-reduced-motion` is enabled.
 */
export function ScrollTextReveal({
  children,
  as: Component = "div",
  delay = 0,
  yOffset = 18,
  duration = 0.65,
  className,
}: ScrollTextRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const StaticTag = Component;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  const MotionComponent = motionMap[Component] || motion.div;

  return (
    <MotionComponent
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "-30px" }}
      transition={{
        duration,
        delay,
        ease: naturalEase,
      }}
      className={cn(className)}
    >
      {children}
    </MotionComponent>
  );
}

export type HeadingTag = "h1" | "h2" | "h3" | "h4";

export interface WordStaggerHeadingProps {
  readonly leadText: string;
  readonly highlightText?: string;
  readonly as?: HeadingTag;
  readonly id?: string;
  readonly className?: string;
  readonly highlightClassName?: string;
  readonly delay?: number;
}

const headingMap = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
} as const;

const wordContainerVariants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: {
      delayChildren: delay,
      staggerChildren: 0.045,
    },
  }),
};

const wordChildVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: naturalEase,
    },
  },
};

/**
 * Editorial Word-Stagger Heading Component.
 * Staggers each word into view smoothly with subtle upward momentum.
 * Accessible to screen readers via aria-label on the root semantic heading.
 */
export function WordStaggerHeading({
  leadText,
  highlightText,
  as: Component = "h2",
  id,
  className,
  highlightClassName,
  delay = 0,
}: WordStaggerHeadingProps) {
  const shouldReduceMotion = useReducedMotion();
  const fullSentence = highlightText
    ? `${leadText} ${highlightText}`.trim()
    : leadText;

  if (shouldReduceMotion) {
    const StaticHeading = Component;
    return (
      <StaticHeading id={id} className={className}>
        {leadText ? <span>{leadText} </span> : null}
        {highlightText ? (
          <span className={highlightClassName}>{highlightText}</span>
        ) : null}
      </StaticHeading>
    );
  }

  const leadWords = leadText ? leadText.trim().split(/\s+/) : [];
  const highlightWords = highlightText ? highlightText.trim().split(/\s+/) : [];
  const MotionComponent = headingMap[Component] || motion.h2;

  return (
    <MotionComponent
      id={id}
      aria-label={fullSentence}
      variants={wordContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25, margin: "-40px" }}
      custom={delay}
      className={cn("inline-block", className)}
    >
      {leadWords.map((word, index) => (
        <motion.span
          key={`lead-${word}-${index}`}
          variants={wordChildVariants}
          className="inline-block"
        >
          {word}&nbsp;
        </motion.span>
      ))}
      {highlightWords.map((word, index) => (
        <motion.span
          key={`hl-${word}-${index}`}
          variants={wordChildVariants}
          className={cn("inline-block", highlightClassName)}
        >
          {word}
          {index < highlightWords.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </MotionComponent>
  );
}
