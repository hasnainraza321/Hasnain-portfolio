"use client";

import { useEffect, useRef } from "react";

interface StarParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  isCyan: boolean;
}

/**
 * 60fps HTML5 Canvas Flowing Electric-Blue Silk Ribbon & Neural Particle Backdrop.
 * Fluid silk waves + luminous starry particles balanced perfectly so content remains crisp.
 */
export function HeroAutomationBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    let prefersReducedMotion = reducedMotionQuery.matches;
    let isVisible = true;
    let animationFrameId = 0;

    let width = 0;
    let height = 0;
    const particles: StarParticle[] = [];

    const initParticles = (w: number, h: number) => {
      particles.length = 0;
      const count = Math.min(42, Math.max(20, Math.floor((w * h) / 32000)));
      for (let i = 0; i < count; i++) {
        const px = ((i * 79 + 17) % 100) / 100;
        const py = ((i * 43 + 31) % 100) / 100;
        particles.push({
          x: px * w,
          y: py * h,
          vx: (((i * 29) % 10) - 5) * 0.035,
          vy: (((i * 53) % 10) - 5) * 0.025,
          radius: i % 5 === 0 ? 1.8 : 1.1,
          alpha: 0.2 + ((i * 19) % 50) / 100,
          isCyan: i % 2 === 0,
        });
      }
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initParticles(width, height);
    };

    const drawSilkRibbon = (
      t: number,
      baseYRatio: number,
      amplitude: number,
      frequency: number,
      phase: number,
      thickness: number,
      opacity: number
    ) => {
      const baseY = height * baseYRatio;
      const step = Math.max(24, Math.floor(width / 36));

      ctx.save();
      const isDark = document.documentElement.classList.contains("dark");

      const grad = ctx.createLinearGradient(0, baseY - amplitude, width, baseY + amplitude);
      if (isDark) {
        grad.addColorStop(0, `rgba(2, 132, 199, ${opacity * 0.1})`);
        grad.addColorStop(0.35, `rgba(56, 189, 248, ${opacity * 0.6})`);
        grad.addColorStop(0.7, `rgba(37, 99, 235, ${opacity * 0.5})`);
        grad.addColorStop(1, `rgba(56, 189, 248, ${opacity * 0.15})`);
      } else {
        grad.addColorStop(0, `rgba(232, 117, 39, ${opacity * 0.1})`);
        grad.addColorStop(0.35, `rgba(232, 117, 39, ${opacity * 0.6})`);
        grad.addColorStop(0.7, `rgba(217, 119, 6, ${opacity * 0.5})`);
        grad.addColorStop(1, `rgba(232, 117, 39, ${opacity * 0.15})`);
      }

      ctx.beginPath();
      for (let x = 0; x <= width + step; x += step) {
        const nx = x / width;
        const y =
          baseY +
          Math.sin(nx * frequency + t + phase) * amplitude +
          Math.cos(nx * (frequency * 1.6) - t * 0.7 + phase) * (amplitude * 0.45);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      for (let x = width + step; x >= 0; x -= step) {
        const nx = x / width;
        const y =
          baseY +
          thickness +
          Math.sin(nx * frequency + t + phase + 0.45) * (amplitude * 0.85) +
          Math.cos(nx * (frequency * 1.6) - t * 0.7 + phase) * (amplitude * 0.45);
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Top wave crest line
      ctx.beginPath();
      for (let x = 0; x <= width + step; x += step) {
        const nx = x / width;
        const y =
          baseY +
          Math.sin(nx * frequency + t + phase) * amplitude +
          Math.cos(nx * (frequency * 1.6) - t * 0.7 + phase) * (amplitude * 0.45);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = isDark
        ? `rgba(125, 211, 252, ${Math.min(0.4, opacity * 1.8)})`
        : `rgba(232, 117, 39, ${Math.min(0.4, opacity * 1.8)})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();
    };

    const drawFrame = (timestamp: number) => {
      const t = timestamp * 0.00065;
      const isDark = document.documentElement.classList.contains("dark");

      ctx.clearRect(0, 0, width, height);

      // Flowing Ribbons
      drawSilkRibbon(t, 0.65, 48, 4.0, 0.0, 60, 0.16);
      drawSilkRibbon(-t * 0.85, 0.58, 38, 3.5, 1.4, 46, 0.2);
      drawSilkRibbon(t * 1.15, 0.73, 34, 4.8, 2.7, 40, 0.14);

      // Star Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p) continue;

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        const shimmer = 0.6 + Math.sin(t * 4 + i) * 0.4;
        if (isDark) {
          ctx.fillStyle = p.isCyan
            ? `rgba(56, 189, 248, ${p.alpha * shimmer})`
            : `rgba(241, 245, 249, ${p.alpha * shimmer})`;
        } else {
          ctx.fillStyle = p.isCyan
            ? `rgba(232, 117, 39, ${p.alpha * shimmer * 0.8})`
            : `rgba(23, 23, 23, ${p.alpha * shimmer * 0.35})`;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (timestamp: number) => {
      if (!isVisible || prefersReducedMotion) return;
      drawFrame(timestamp);
      animationFrameId = window.requestAnimationFrame(loop);
    };

    resizeCanvas();
    drawFrame(0);

    if (!prefersReducedMotion) {
      animationFrameId = window.requestAnimationFrame(loop);
    }

    const handleResize = () => {
      resizeCanvas();
      drawFrame(performance.now());
    };

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion = event.matches;
      window.cancelAnimationFrame(animationFrameId);
      if (!prefersReducedMotion && isVisible) {
        animationFrameId = window.requestAnimationFrame(loop);
      } else {
        drawFrame(performance.now());
      }
    };

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          isVisible = entry.isIntersecting;
          window.cancelAnimationFrame(animationFrameId);
          if (isVisible && !prefersReducedMotion) {
            animationFrameId = window.requestAnimationFrame(loop);
          }
        },
        { threshold: 0.02 }
      );
      observer.observe(canvas);
    }

    window.addEventListener("resize", handleResize);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      reducedMotionQuery.removeEventListener(
        "change",
        handleReducedMotionChange
      );
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Ambient radial lighting: Warm amber/cream in Light Mode, Electric Cyan/Blue in Dark Mode */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_42%,rgba(232,117,39,0.06)_0%,rgba(242,233,216,0)_70%)] dark:bg-[radial-gradient(ellipse_at_72%_42%,rgba(14,165,233,0.16)_0%,rgba(29,78,216,0.08)_38%,rgba(5,8,17,0)_72%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(232,117,39,0.04)_0%,rgba(242,233,216,0)_55%)] dark:bg-[radial-gradient(circle_at_20%_25%,rgba(56,189,248,0.08)_0%,rgba(5,8,17,0)_55%)]" />
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
