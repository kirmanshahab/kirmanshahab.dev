import Link from "next/link";
import { NavLinks } from "./nav-links";
import { CommandTrigger } from "./command/command-trigger";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="container-page no-print">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            aria-label="KS, Kirman Shahab home page"
            className="touch-target grid size-8 place-items-center rounded-sm border border-line-strong font-mono text-micro font-medium tracking-normal text-ink transition-colors hover:border-muted"
          >
            KS
          </Link>
          <NavLinks />
        </div>
        <div className="flex items-center gap-2">
          <CommandTrigger />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
