import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { heroPath } from "#root/content/architecture";
import { site } from "@/site.config";
import { stats } from "@/lib/work-stats";
import { MapCursor } from "../map-cursor";
import { SystemMap } from "../system-map";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="hero relative -mx-[var(--gutter)] overflow-x-clip px-[var(--gutter)] pb-12 md:pt-32 md:pb-24"
    >
      <MapCursor className="hero-map">
        <SystemMap highlight={heroPath} />
      </MapCursor>
      <div className="relative grid max-w-[640px] gap-6">
        <p className="pill justify-self-start">
          <span className="status-dot" aria-hidden />
          {site.availability}
        </p>
        <p className="micro -mb-2">Senior full-stack engineer · {site.location.replace(", Pakistan", ", PK")}</p>
        <h1 id="hero-title" className="text-display-sm lg:text-display">{site.name}</h1>
        <p className="max-w-[64ch] text-lead text-ink-2">
          I build the hard parts of SaaS: multi-tenant isolation, job queues that don’t melt, billing and metering, and AI
          agents that safely touch real customer data.
        </p>
        <p className="text-body text-muted">
          ≈{stats.roundedCommits} commits in 3 years leading a 111-module multi-tenant CRM.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/work" className="btn btn-primary">
            View work <ArrowRight size={16} strokeWidth={1.5} aria-hidden />
          </Link>
          <a href={site.resumePdf} className="btn btn-secondary" download>
            <Download size={16} strokeWidth={1.5} aria-hidden /> Download resume
          </a>
        </div>
      </div>
    </section>
  );
}
