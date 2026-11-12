"use client";

import { useEffect, useRef } from "react";

/**
 * Unique Holographic Global AI Neural Network Earth Sphere.
 * Upgraded based on user feedback:
 * - Perfectly scaled, refined size (thora kam / elegant proportions)
 * - Unique holographic continent particle clusters (North America, Europe, Asia, Africa, South America, Australia)
 * - Tilted gyroscopic planetary telemetry rings
 * - Orbiting data pulse satellites and live neural synaptic arcs
 */
export function EarthGlobeCanvas() {
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

    interface GeoParticle {
      lat: number; // -90 to +90
      lon: number; // -180 to +180
      isMajorHub?: boolean;
      label?: string;
    }

    // Geometrically clustered continent points to create an unmistakable 3D Earth silhouette
    const CONTINENT_NODES: GeoParticle[] = [
      // North America
      { lat: 40, lon: -100, isMajorHub: true, label: "AI AGENTS" },
      { lat: 48, lon: -122 },
      { lat: 37, lon: -122, isMajorHub: true },
      { lat: 42, lon: -71 },
      { lat: 34, lon: -84 },
      { lat: 55, lon: -105 },
      { lat: 25, lon: -100 },
      // Europe
      { lat: 51, lon: 0, isMajorHub: true, label: "VOICE AI" },
      { lat: 48, lon: 2 },
      { lat: 52, lon: 13 },
      { lat: 41, lon: 12 },
      { lat: 59, lon: 18 },
      { lat: 40, lon: -3 },
      // Asia
      { lat: 35, lon: 105, isMajorHub: true, label: "AUTOMATION" },
      { lat: 31, lon: 121 },
      { lat: 28, lon: 77, isMajorHub: true },
      { lat: 35, lon: 139, isMajorHub: true, label: "FULL-STACK" },
      { lat: 22, lon: 114 },
      { lat: 1, lon: 103 },
      { lat: 25, lon: 55 },
      // South America
      { lat: -15, lon: -47 },
      { lat: -23, lon: -46 },
      { lat: -34, lon: -58 },
      { lat: 4, lon: -74 },
      // Africa
      { lat: 0, lon: 20 },
      { lat: 30, lon: 31 },
      { lat: -26, lon: 28 },
      { lat: 6, lon: 3 },
      // Australia
      { lat: -25, lon: 133 },
      { lat: -33, lon: 151 },
      { lat: -37, lon: 144 },
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

    let rotationAngle = 0;
    const tiltAngle = 0.38; // Earth's ~23.5 degree axial tilt in radians

    const drawEarthGlobe = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark =
        document.documentElement.classList.contains("dark") ||
        !document.documentElement.classList.contains("light");

      const centerX = width / 2;
      const centerY = height / 2;
      // Prominent, impactful radius filling the container nicely with room for orbital rings
      const radius = Math.min(width, height) * 0.39;

      // 1. Soft Multi-Layer Atmospheric Corona Glow
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.8,
        centerX,
        centerY,
        radius * 1.25
      );
      if (isDark) {
        glowGrad.addColorStop(0, "rgba(2, 132, 199, 0.16)");
        glowGrad.addColorStop(0.5, "rgba(56, 189, 248, 0.06)");
        glowGrad.addColorStop(1, "rgba(2, 132, 199, 0)");
      } else {
        glowGrad.addColorStop(0, "rgba(232, 117, 39, 0.18)");
        glowGrad.addColorStop(0.5, "rgba(232, 117, 39, 0.06)");
        glowGrad.addColorStop(1, "rgba(232, 117, 39, 0)");
      }

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // 2. Earth Sphere Deep Radial Body
      const sphereGrad = ctx.createRadialGradient(
        centerX - radius * 0.35,
        centerY - radius * 0.35,
        radius * 0.1,
        centerX,
        centerY,
        radius
      );
      if (isDark) {
        sphereGrad.addColorStop(0, "#081635");
        sphereGrad.addColorStop(0.65, "#040A1A");
        sphereGrad.addColorStop(1, "#02040B");
      } else {
        sphereGrad.addColorStop(0, "#FFFDF9");
        sphereGrad.addColorStop(0.65, "#FAF5EB");
        sphereGrad.addColorStop(1, "#EADBCA");
      }

      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Outer Glowing Ring Border
      ctx.strokeStyle = isDark ? "rgba(56, 189, 248, 0.55)" : "rgba(232, 117, 39, 0.65)";
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // 3. Tilted Earth Latitude Rings (Parallels)
      const latCount = 6;
      for (let i = 1; i < latCount; i++) {
        const lat = (i / latCount) * Math.PI - Math.PI / 2;
        const rLat = radius * Math.cos(lat);
        const yLat = centerY + radius * Math.sin(lat) * Math.cos(tiltAngle);

        ctx.strokeStyle = isDark ? "rgba(2, 132, 199, 0.18)" : "rgba(232, 117, 39, 0.22)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(centerX, yLat, rLat, rLat * 0.28, tiltAngle * 0.5, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 4. Rotating Longitude Meridians
      const lonCount = 8;
      for (let i = 0; i < lonCount; i++) {
        const lon = (i / lonCount) * Math.PI + rotationAngle;
        const xDist = Math.cos(lon) * radius;

        ctx.strokeStyle = isDark ? "rgba(56, 189, 248, 0.16)" : "rgba(23, 23, 23, 0.14)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, Math.abs(xDist), radius, tiltAngle, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 5. Project 3D Geographical Continent Clusters with Rotation & Axial Tilt
      const cosR = Math.cos(rotationAngle);
      const sinR = Math.sin(rotationAngle);
      const cosT = Math.cos(tiltAngle);
      const sinT = Math.sin(tiltAngle);

      interface ProjectedPoint {
        px: number;
        py: number;
        pz: number;
        isMajor?: boolean;
        label?: string;
      }

      const projectedPoints: ProjectedPoint[] = [];

      for (const node of CONTINENT_NODES) {
        const phi = (90 - node.lat) * (Math.PI / 180);
        const theta = (node.lon + 180) * (Math.PI / 180);

        // Spherical coords
        const x0 = Math.sin(phi) * Math.cos(theta);
        const y0 = Math.cos(phi);
        const z0 = Math.sin(phi) * Math.sin(theta);

        // Y-axis rotation
        const x1 = x0 * cosR - z0 * sinR;
        const z1 = x0 * sinR + z0 * cosR;

        // Axial Tilt rotation (around Z/X)
        const y2 = y0 * cosT - z1 * sinT;
        const z2 = y0 * sinT + z1 * cosT;

        const px = centerX + x1 * radius;
        const py = centerY - y2 * radius;

        projectedPoints.push({
          px,
          py,
          pz: z2,
          isMajor: node.isMajorHub,
          label: node.label,
        });
      }

      // Draw Neural Data Arcs between front-facing continent hubs
      ctx.lineWidth = 1.2;
      for (let i = 0; i < projectedPoints.length; i++) {
        const p1 = projectedPoints[i];
        if (!p1 || p1.pz < -0.1) continue;

        for (let j = i + 1; j < projectedPoints.length; j++) {
          const p2 = projectedPoints[j];
          if (!p2 || p2.pz < -0.1) continue;

          const dist = Math.hypot(p1.px - p2.px, p1.py - p2.py);
          if (dist < radius * 0.85) {
            const arcAlpha = Math.min(0.45, (1 - dist / (radius * 0.85)) * 0.55);
            ctx.strokeStyle = isDark
              ? `rgba(56, 189, 248, ${arcAlpha})`
              : `rgba(232, 117, 39, ${arcAlpha * 1.1})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            const midX = (p1.px + p2.px) / 2;
            const midY = (p1.py + p2.py) / 2 - 10;
            ctx.quadraticCurveTo(midX, midY, p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Draw Continent Points
      for (const p of projectedPoints) {
        if (p.pz < -0.2) continue; // Behind earth

        const alpha = Math.max(0.25, (p.pz + 1) / 2);

        if (p.isMajor) {
          // Glowing AI hub node
          ctx.fillStyle = isDark
            ? `rgba(56, 189, 248, ${alpha})`
            : `rgba(232, 117, 39, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.px, p.py, 3.8, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = isDark
            ? `rgba(56, 189, 248, ${alpha * 0.6})`
            : `rgba(232, 117, 39, ${alpha * 0.7})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(p.px, p.py, 8.5, 0, Math.PI * 2);
          ctx.stroke();

          // Label
          if (p.label) {
            ctx.fillStyle = isDark ? "#FFFFFF" : "#171717";
            ctx.font = "bold 9px monospace";
            ctx.fillText(p.label, p.px + 11, p.py + 3);
          }
        } else {
          // Continent terrain dot
          ctx.fillStyle = isDark
            ? `rgba(125, 211, 252, ${alpha * 0.65})`
            : `rgba(232, 117, 39, ${alpha * 0.65})`;
          ctx.beginPath();
          ctx.arc(p.px, p.py, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 6. Gyroscopic Planetary Orbital Rings
      // Ring A
      const orbRadiusA = radius * 1.2;
      ctx.strokeStyle = isDark ? "rgba(56, 189, 248, 0.32)" : "rgba(232, 117, 39, 0.35)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, orbRadiusA, orbRadiusA * 0.28, -0.42, 0, Math.PI * 2);
      ctx.stroke();

      // Satellite on Ring A
      const satAngleA = -rotationAngle * 2.4;
      const satXA = centerX + Math.cos(satAngleA) * orbRadiusA * Math.cos(-0.42) - Math.sin(satAngleA) * (orbRadiusA * 0.28) * Math.sin(-0.42);
      const satYA = centerY + Math.cos(satAngleA) * orbRadiusA * Math.sin(-0.42) + Math.sin(satAngleA) * (orbRadiusA * 0.28) * Math.cos(-0.42);

      ctx.fillStyle = isDark ? "#38BDF8" : "#E87527";
      ctx.beginPath();
      ctx.arc(satXA, satYA, 4, 0, Math.PI * 2);
      ctx.fill();

      // Ring B (Counter-tilted thin telemetry guide)
      const orbRadiusB = radius * 1.12;
      ctx.strokeStyle = isDark ? "rgba(2, 132, 199, 0.2)" : "rgba(217, 119, 6, 0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, orbRadiusB, orbRadiusB * 0.35, 0.65, 0, Math.PI * 2);
      ctx.stroke();
    };

    const loop = () => {
      if (!isVisible || prefersReducedMotion) return;
      rotationAngle += 0.007; // Smooth global rotation
      drawEarthGlobe();
      animationFrameId = window.requestAnimationFrame(loop);
    };

    resizeCanvas();
    drawEarthGlobe();

    if (!prefersReducedMotion) {
      animationFrameId = window.requestAnimationFrame(loop);
    }

    const handleResize = () => {
      resizeCanvas();
      drawEarthGlobe();
    };

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      window.cancelAnimationFrame(animationFrameId);
      if (!prefersReducedMotion && isVisible) {
        animationFrameId = window.requestAnimationFrame(loop);
      } else {
        drawEarthGlobe();
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
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
      observer?.disconnect();
    };
  }, []);

  return (
    <div className="relative flex aspect-square w-full max-w-[26rem] sm:max-w-[32rem] lg:max-w-[36rem] xl:max-w-[40rem] items-center justify-center">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
