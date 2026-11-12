"use client";

import { useEffect, useRef } from "react";

interface FloatingNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

/**
 * 60fps Projects Horizon Streamlines & Ambient Constellation Backdrop.
 * Engineered for the Projects Showcase Section:
 * - Subtle harmonic wave streams spanning the section width
 * - Floating, gently drifting constellation nodes with connecting neural filaments
 * - Optimized 2D canvas with IntersectionObserver (zero CPU drain off-screen)
 * - Accessible: respects prefers-reduced-motion
 */
export function ProjectsBackdropCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = reducedMotionQuery.matches;
    let isVisible = true;
    let animationFrameId = 0;

    let width = 0;
    let height = 0;
    const nodes: FloatingNode[] = [];

    const initNodes = (w: number, h: number) => {
      nodes.length = 0;
      const count = Math.min(36, Math.max(18, Math.floor((w * h) / 38000)));
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.2,
          radius: Math.random() > 0.8 ? 2 : 1.2,
          alpha: 0.15 + Math.random() * 0.35,
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

      initNodes(width, height);
    };

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark =
        document.documentElement.classList.contains("dark") ||
        !document.documentElement.classList.contains("light");

      // Deep ambient radial illumination behind the showcase
      const radGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.28,
        width * 0.05,
        width * 0.5,
        height * 0.28,
        width * 0.65
      );
      if (isDark) {
        radGrad.addColorStop(0, "rgba(14, 165, 233, 0.12)");
        radGrad.addColorStop(0.4, "rgba(29, 78, 216, 0.05)");
        radGrad.addColorStop(1, "rgba(5, 8, 17, 0)");
      } else {
        radGrad.addColorStop(0, "rgba(232, 117, 39, 0.1)");
        radGrad.addColorStop(0.4, "rgba(217, 119, 6, 0.04)");
        radGrad.addColorStop(1, "rgba(242, 233, 216, 0)");
      }
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw undulating horizontal silk energy streamlines
      const streams = isDark
        ? [
            { baseY: height * 0.22, amp: 32, freq: 0.0014, speed: 0.008, color: "rgba(56, 189, 248, 0.22)" },
            { baseY: height * 0.58, amp: 44, freq: 0.001, speed: -0.006, color: "rgba(14, 165, 233, 0.18)" },
            { baseY: height * 0.88, amp: 28, freq: 0.0016, speed: 0.007, color: "rgba(37, 99, 235, 0.16)" },
          ]
        : [
            { baseY: height * 0.22, amp: 32, freq: 0.0014, speed: 0.008, color: "rgba(232, 117, 39, 0.22)" },
            { baseY: height * 0.58, amp: 44, freq: 0.001, speed: -0.006, color: "rgba(217, 119, 6, 0.18)" },
            { baseY: height * 0.88, amp: 28, freq: 0.0016, speed: 0.007, color: "rgba(232, 117, 39, 0.16)" },
          ];

      const step = Math.max(20, Math.floor(width / 45));

      for (const s of streams) {
        ctx.beginPath();
        let isFirst = true;
        for (let x = 0; x <= width + step; x += step) {
          const y = s.baseY + Math.sin(x * s.freq + time * s.speed * 20) * s.amp;
          if (isFirst) {
            ctx.moveTo(x, y);
            isFirst = false;
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Update & Draw Constellation Nodes & Connecting Filaments
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!n) continue;

        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;

        // Draw node
        ctx.fillStyle = isDark
          ? `rgba(56, 189, 248, ${n.alpha})`
          : `rgba(232, 117, 39, ${n.alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby nodes with subtle neural lines
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          if (!n2) continue;
          const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.14;
            ctx.strokeStyle = isDark
              ? `rgba(56, 189, 248, ${lineAlpha})`
              : `rgba(232, 117, 39, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      time += 0.01;
    };

    const loop = () => {
      if (!isVisible || prefersReducedMotion) return;
      render();
      animationFrameId = window.requestAnimationFrame(loop);
    };

    resizeCanvas();
    render();

    if (!prefersReducedMotion) {
      animationFrameId = window.requestAnimationFrame(loop);
    }

    const handleResize = () => {
      resizeCanvas();
      render();
    };

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      window.cancelAnimationFrame(animationFrameId);
      if (!prefersReducedMotion && isVisible) {
        animationFrameId = window.requestAnimationFrame(loop);
      } else {
        render();
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
        { threshold: 0.03 }
      );
      observer.observe(canvas);
    }

    window.addEventListener("resize", handleResize);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="h-full w-full opacity-80" />
    </div>
  );
}

