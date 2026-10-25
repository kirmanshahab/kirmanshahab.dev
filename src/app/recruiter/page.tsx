import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { site } from "@/site.config";
import { stats } from "@/lib/work-stats";

// Served at /?r=1 via a rewrite (next.config.ts). Static, zero client JS of its own.
export const metadata: Metadata = {
  title: "TL;DR for recruiters",
  description: "One-screen summary of Kirman Shahab for recruiters: role fit, stack, location and availability.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

const rows: [string, React.ReactNode][] = [
  ["Role fit", "Senior full-stack / backend / product engineer. Strongest on NestJS + Next.js SaaS: multi-tenancy, queues, billing, AI agents."],
  ["Experience", `5+ years. Last 3 as lead engineer on a 111-module multi-tenant CRM (≈${stats.roundedCommits} commits). Before: blockchain (Casper) + React Native.`],
  ["Stack", "TypeScript · Node.js · NestJS · Next.js · React · MongoDB · Redis · BullMQ · Socket.IO · Docker · GitHub Actions · AWS"],
  ["Location", `${site.location} (${site.timezone}). Remote, or relocation with visa sponsorship.`],
  ["Availability", "Currently employed · 2 weeks’ notice."],
  ["Contact", <a key="e" href={`mailto:${site.email}`} className="link">{site.email}</a>],
];

export default function Recruiter() {
  return (
    <div className="container-page">
      <div className="mx-auto grid max-w-[800px] gap-8 pt-12 md:pt-16">
        <div className="grid gap-3">
          <p className="pill justify-self-start"><span className="status-dot" aria-hidden />{site.availability}</p>
          <h1 className="text-h1">{site.name}</h1>
          <p className="text-lead text-ink-2">{site.role}</p>
        </div>
        <dl className="card divide-y divide-line">
          {rows.map(([k, v]) => (
            <div key={k} className="grid gap-1 p-4 md:grid-cols-[160px_1fr] md:gap-6 md:px-6">
              <dt className="micro md:pt-1">{k}</dt>
              <dd className="text-small text-ink-2">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap gap-3">
          <a href={site.resumePdf} download className="btn btn-primary"><Download size={16} strokeWidth={1.5} aria-hidden /> Resume (PDF)</a>
          <Link href="/work" className="btn btn-secondary">Case studies</Link>
          <a href={site.linkedin} className="btn btn-secondary">LinkedIn</a>
        </div>
      </div>
    </div>
  );
}
