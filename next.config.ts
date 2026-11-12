import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

/**
 * Baseline Content Security Policy (CSP) for Next.js App Router.
 *
 * Technical Notes & Documented Allowances:
 * 1. `script-src`: Next.js static/prerendered App Router pages emit inline RSC
 *    hydration scripts (`self.__next_f.push(...)`). Without dynamic per-request
 *    Middleware nonces (which disable static page optimization), `'unsafe-inline'`
 *    is required so Next.js hydration functions properly.
 *    - In development only (`isDevelopment`), `'unsafe-eval'` is added for
 *      Next.js Fast Refresh / source-map reconstruction. It is stripped in production.
 *    - Future hardening path: Add `src/middleware.ts` to generate a cryptographic
 *      per-request nonce (`'nonce-${nonce}' 'strict-dynamic'`) if full dynamic rendering
 *      is preferred over static prerendering.
 * 2. `style-src`: `'unsafe-inline'` is required for Next.js style injection and
 *    Framer Motion inline transform/opacity style attributes (`style="..."`).
 * 3. `worker-src`: `'self' blob:` is scoped to support future Step 6 WebGL / Three.js
 *    off-main-thread geometry/shader tasks without opening external origins.
 * 4. `frame-ancestors 'none'` + `object-src 'none'` + `base-uri 'self'` +
 *    `form-action 'self'` enforce strict clickjacking, plugin, and injection boundaries.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDevelopment ? " ws: wss:" : ""}`,
  "worker-src 'self' blob:",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDevelopment ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(), autoplay=(), camera=(), cross-origin-isolated=(), display-capture=(), encrypted-media=(), fullscreen=(self), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

