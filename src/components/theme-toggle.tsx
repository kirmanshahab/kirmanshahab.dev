"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const next = resolvedTheme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label="Toggle colour theme"
      className="touch-target grid size-8 place-items-center rounded-sm border border-line bg-surface text-muted transition-colors duration-150 hover:border-line-strong hover:text-ink active:scale-[0.98]"
    >
      {/* Both icons render; CSS shows the right one, so there is no hydration flash. */}
      <Moon size={16} strokeWidth={1.5} className="dark:hidden" aria-hidden />
      <Sun size={16} strokeWidth={1.5} className="hidden dark:block" aria-hidden />
    </button>
  );
}
