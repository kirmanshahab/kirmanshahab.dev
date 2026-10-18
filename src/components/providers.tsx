"use client";

import { ThemeProvider } from "next-themes";
import { RevealObserver } from "./reveal-observer";
import { PointerGlow } from "./pointer-glow";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
      <RevealObserver />
      <PointerGlow />
    </ThemeProvider>
  );
}
