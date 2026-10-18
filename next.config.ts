import type { NextConfig } from "next";

// MDX content: `pnpm build` runs `velite build` first (see package.json).
// In dev, start velite's watcher alongside `next dev` so edits rebuild live.
const isDev = process.argv.includes("dev");
if (isDev && !process.env.VELITE_STARTED) {
  process.env.VELITE_STARTED = "1";
  void import("velite").then((m) => m.build({ watch: true, clean: false }));
}

// Pages are static, so inline scripts (theme bootstrap, Next's flight data)
// need 'unsafe-inline'; nonces would force every page to render per request.
// Vercel Analytics and Speed Insights load from same-origin /_vercel paths.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  ...(isDev ? [] : [{ key: "Content-Security-Policy", value: csp }]),
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typedRoutes: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async rewrites() {
    // Recruiter mode: kirmanshahab.dev/?r=1 serves the static one-screen TL;DR.
    return {
      beforeFiles: [{ source: "/", has: [{ type: "query", key: "r", value: "1" }], destination: "/recruiter" }],
    };
  },
};

export default nextConfig;
