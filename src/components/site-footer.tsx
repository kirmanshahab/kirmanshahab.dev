import Link from "next/link";
import { nav, site } from "@/site.config";

const built = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date());

export function SiteFooter() {
  return (
    <footer className="container-page no-print mt-32 border-t border-line">
      <div className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-small text-muted">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="hover:text-ink">{n.label}</Link></li>
            ))}
            <li><a href={site.github} className="hover:text-ink">GitHub</a></li>
            <li><a href={site.linkedin} className="hover:text-ink">LinkedIn</a></li>
          </ul>
        </nav>
        <p className="font-mono text-micro text-muted">
          Built with Next.js · <a href={site.repo} className="link">source on GitHub</a> · deployed <time className="num">{built}</time>
        </p>
      </div>
    </footer>
  );
}
