import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/site.config";

export const ogSize = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), "node_modules", "geist", "dist", "fonts");
const font = (path: string) => readFile(join(fontDir, path));

// Dark theme tokens (6.5.3); OG images can't read CSS variables.
const c = { bg: "#09090B", surface: "#111113", ink: "#FAFAF9", ink2: "#E7E5E4", muted: "#A1A1AA", line: "#27272A", accent: "#2DD4BF", ok: "#4ADE80" };

/** One template for every page's Open Graph image. */
export async function ogImage({ eyebrow, title, footer }: { eyebrow: string; title: string; footer?: string }) {
  const [sans, sansMedium, mono] = await Promise.all([
    font("geist-sans/Geist-SemiBold.ttf"),
    font("geist-sans/Geist-Medium.ttf"),
    font("geist-mono/GeistMono-Medium.ttf"),
  ]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: c.bg, padding: 72, fontFamily: "Geist" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, border: `1px solid ${c.line}`, display: "flex", alignItems: "center", justifyContent: "center", color: c.ink, fontFamily: "Geist Mono", fontSize: 18 }}>KS</div>
            <div style={{ fontFamily: "Geist Mono", fontSize: 20, letterSpacing: "0.06em", color: c.muted, textTransform: "uppercase" }}>{eyebrow}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, height: 40, padding: "0 16px", borderRadius: 999, border: `1px solid ${c.line}`, fontFamily: "Geist Mono", fontSize: 18, color: c.ink2 }}>
            <div style={{ width: 10, height: 10, borderRadius: 999, background: c.ok }} />
            Open to roles
          </div>
        </div>
        <div style={{ display: "flex", fontSize: title.length > 48 ? 64 : 80, lineHeight: 1.05, letterSpacing: "-0.035em", color: c.ink, maxWidth: 1000 }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: `1px solid ${c.line}`, paddingTop: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontFamily: "Geist Medium", fontSize: 28, color: c.ink }}>{site.name}</div>
            <div style={{ fontFamily: "Geist Mono", fontSize: 20, color: c.muted }}>{footer ?? "Senior full-stack engineer · NestJS · Next.js · AI agents"}</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[0.25, 0.5, 0.75, 1, 0.5, 0.25, 0.75].map((o, i) => (
              <div key={i} style={{ width: 20, height: 20, borderRadius: 4, background: c.accent, opacity: o }} />
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: sans, weight: 600, style: "normal" },
        { name: "Geist Medium", data: sansMedium, weight: 500, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
