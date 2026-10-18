import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Work } from "#content";
import { covers } from "#root/content/site-data";
import { SystemMap } from "./system-map";

export function CaseCard({ item, large = false }: { item: Work; large?: boolean }) {
  return (
    <Link href={item.url as `/work/${string}`} className="card card-link group flex h-full flex-col overflow-hidden">
      <div className={`relative overflow-hidden border-b border-line bg-surface-2 ${large ? "h-48" : "h-32"}`} aria-hidden>
        <SystemMap
          highlight={covers[item.cover] ?? []}
          bare
          crop
          className="absolute inset-0 size-full opacity-90 transition-transform duration-[400ms] ease-[var(--ease-out)] group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="micro">{item.period}</p>
          {item.status === "draft" && <span className="chip">Write-up in progress</span>}
        </div>
        <h3 className="text-h3 text-ink">{item.title}</h3>
        <p className="text-small text-muted">{item.summary}</p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-3" aria-label="Stack">
          {item.stack.slice(0, large ? 4 : 3).map((s) => (
            <li key={s} className="chip">{s}</li>
          ))}
        </ul>
      </div>
      <ArrowUpRight
        size={16}
        strokeWidth={1.5}
        aria-hidden
        className="absolute top-4 right-4 text-muted transition-transform duration-[250ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
      />
    </Link>
  );
}
