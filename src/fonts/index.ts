import localFont from "next/font/local";

// Geist (SIL OFL 1.1, see OFL.txt), loaded locally so only the body face is
// preloaded. Mono (labels, numbers) follows right after with a metric-matched fallback.
export const geistSans = localFont({
  src: "./Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
});

export const geistMono = localFont({
  src: "./GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: ["ui-monospace", "Menlo", "Consolas", "monospace"],
});
