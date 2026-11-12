"use client";

import { useEffect, useRef } from "react";

interface WaveStream {
  baseYRatio: number;
  amplitude: number;
  frequency: number;
  speed: number;
  phase: number;
  thickness: number;
  colorStops: Array<[number, string]>;
  pulses: Array<{ progress: number; speed: number; size: number }>;
}

/**
 * High-End Generative Streamlines & Synaptic Data Pulses Canvas.
 * Engineered for the Expertise 4-column architecture:
 * - Fluid, harmonic sinusoidal curves traversing horizontally across columns
 * - Subtly connecting AI -> Automation -> Full-Stack -> Infrastructure
 * - Glowing photon pulses gliding along curves
 * - Low-contrast, high-readability design (0% visual slop, 100% crisp typography)
 * - Battery-friendly: pauses on off-screen, handles resize & prefers-reduced-motion
 */
export function ExpertiseBackdropCanvas() {
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
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    // Define 4 harmonic data streams spanning across the pillars
    const streams: WaveStream[] = [
      {
        baseYRatio: 0.38,
        amplitude: 36,
        frequency: 0.0016,
        speed: 0.008,
        phase: 0,
        thickness: 2.2,
        colorStops: [
          [0, "rgba(2, 132, 199, 0)"],
          [0.2, "rgba(56, 189, 248, 0.35)"],
          [0.55, "rgba(14, 165, 233, 0.45)"],
          [0.85, "rgba(37, 99, 235, 0.3)"],
          [1, "rgba(56, 189, 248, 0)"],
        ],
        pulses: [
          { progress: 0.12, speed: 0.0022, size: 3.5 },
          { progress: 0.64, speed: 0.0018, size: 2.8 },
        ],
      },
      {
        baseYRatio: 0.52,
        amplitude: 48,
        frequency: 0.0012,
        speed: -0.006,
        phase: 2.1,
        thickness: 1.8,
        colorStops: [
          [0, "rgba(56, 189, 248, 0)"],
          [0.3, "rgba(37, 99, 235, 0.28)"],
          [0.65, "rgba(56, 189, 248, 0.38)"],
          [1, "rgba(2, 132, 199, 0)"],
        ],
        pulses: [
          { progress: 0.38, speed: 0.0028, size: 3.2 },
          { progress: 0.88, speed: 0.0024, size: 2.5 },
        ],
      },
      {
        baseYRatio: 0.68,
        amplitude: 42,
        frequency: 0.0018,
        speed: 0.007,
        phase: 4.4,
        thickness: 1.6,
        colorStops: [
          [0, "rgba(2, 132, 199, 0)"],
          [0.4, "rgba(56, 189, 248, 0.3)"],
          [0.75, "rgba(14, 165, 233, 0.22)"],
          [1, "rgba(37, 99, 235, 0)"],
        ],
        pulses: [
          { progress: 0.05, speed: 0.003, size: 3.0 },
          { progress: 0.52, speed: 0.002, size: 2.6 },
        ],
      },
      {
        baseYRatio: 0.82,
        amplitude: 30,
        frequency: 0.0014,
        speed: -0.005,
        phase: 1.2,
        thickness: 1.2,
        colorStops: [
          [0, "rgba(37, 99, 235, 0)"],
          [0.5, "rgba(56, 189, 248, 0.2)"],
          [1, "rgba(2, 132, 199, 0)"],
        ],
        pulses: [{ progress: 0.45, speed: 0.0022, size: 2.4 }],
      },
    ];

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
    };

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark =
        document.documentElement.classList.contains("dark") ||
        !document.documentElement.classList.contains("light");

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Draw subtle background radial ambient glow
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.55,
        width * 0.1,
        width * 0.5,
        height * 0.55,
        width * 0.65
      );
      if (isDark) {
        bgGrad.addColorStop(0, "rgba(14, 165, 233, 0.06)");
        bgGrad.addColorStop(0.5, "rgba(29, 78, 216, 0.03)");
        bgGrad.addColorStop(1, "rgba(5, 8, 17, 0)");
      } else {
        bgGrad.addColorStop(0, "rgba(232, 117, 39, 0.08)");
        bgGrad.addColorStop(0.5, "rgba(217, 119, 6, 0.03)");
        bgGrad.addColorStop(1, "rgba(242, 233, 216, 0)");
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const step = Math.max(16, Math.floor(width / 60));

      for (const stream of streams) {
        stream.phase += stream.speed;
        const baseY = height * stream.baseYRatio;

        // Create gradient stroke for the wave stream
        const strokeGrad = ctx.createLinearGradient(0, 0, width, 0);
        if (isDark) {
          for (const [pos, col] of stream.colorStops) {
            strokeGrad.addColorStop(pos, col);
          }
        } else {
          strokeGrad.addColorStop(0, "rgba(232, 117, 39, 0)");
          strokeGrad.addColorStop(0.3, "rgba(232, 117, 39, 0.35)");
          strokeGrad.addColorStop(0.7, "rgba(217, 119, 6, 0.28)");
          strokeGrad.addColorStop(1, "rgba(232, 117, 39, 0)");
        }

        ctx.beginPath();
        let isFirst = true;

        for (let x = 0; x <= width + step; x += step) {
          // Complex organic wave function combining dual sine harmonics
          const wave1 = Math.sin(x * stream.frequency + stream.phase + time * 0.2);
          const wave2 = Math.cos(x * stream.frequency * 1.5 - stream.phase * 0.7);
          let y = baseY + (wave1 * 0.7 + wave2 * 0.3) * stream.amplitude;

          // Gentle mouse displacement if close
          if (mouseX > 0) {
            const dx = x - mouseX;
            const dy = y - mouseY;
            const dist = Math.hypot(dx, dy);
            if (dist < 260) {
              const force = (1 - dist / 260) * 22;
              y += dy > 0 ? force : -force;
            }
          }

          if (isFirst) {
            ctx.moveTo(x, y);
            isFirst = false;
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = strokeGrad;
        ctx.lineWidth = stream.thickness;
        ctx.stroke();

        // Render traveling glowing photon pulses along the wave
        for (const pulse of stream.pulses) {
          pulse.progress = (pulse.progress + pulse.speed) % 1;
          const px = pulse.progress * width;

          const wave1 = Math.sin(px * stream.frequency + stream.phase + time * 0.2);
          const wave2 = Math.cos(px * stream.frequency * 1.5 - stream.phase * 0.7);
          const py = baseY + (wave1 * 0.7 + wave2 * 0.3) * stream.amplitude;

          // Glowing pulse aura
          const auraGrad = ctx.createRadialGradient(
            px,
            py,
            0,
            px,
            py,
            pulse.size * 3.5
          );
          if (isDark) {
            auraGrad.addColorStop(0, "rgba(56, 189, 248, 0.75)");
            auraGrad.addColorStop(0.4, "rgba(14, 165, 233, 0.25)");
            auraGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
          } else {
            auraGrad.addColorStop(0, "rgba(232, 117, 39, 0.8)");
            auraGrad.addColorStop(0.4, "rgba(232, 117, 39, 0.25)");
            auraGrad.addColorStop(1, "rgba(232, 117, 39, 0)");
          }

          ctx.fillStyle = auraGrad;
          ctx.beginPath();
          ctx.arc(px, py, pulse.size * 3.5, 0, Math.PI * 2);
          ctx.fill();

          // Core bright particle
          ctx.fillStyle = isDark ? "#E0F2FE" : "#FFFFFF";
          ctx.beginPath();
          ctx.arc(px, py, pulse.size * 0.85, 0, Math.PI * 2);
          ctx.fill();
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

    const handleMouseMove = (e: MouseEvent) => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    const parentElement = canvas.parentElement;
    if (parentElement) {
      parentElement.addEventListener("mousemove", handleMouseMove);
      parentElement.addEventListener("mouseleave", handleMouseLeave);
    }

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
        { threshold: 0.05 }
      );
      observer.observe(canvas);
    }

    window.addEventListener("resize", handleResize);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
      if (parentElement) {
        parentElement.removeEventListener("mousemove", handleMouseMove);
        parentElement.removeEventListener("mouseleave", handleMouseLeave);
      }
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="h-full w-full opacity-85" />
    </div>
  );
}

