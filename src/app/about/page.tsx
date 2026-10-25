import type { Metadata } from "next";
import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { PageHeader } from "@/components/page-header";
import { Timeline } from "@/components/timeline";
import { stats } from "@/lib/work-stats";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "About",
  description: "Kirman Shahab: full-stack engineer in Lahore. Three years leading a multi-tenant CRM, before that blockchain and React Native.",
  alternates: { canonical: "/about" },
};

// Drop a 1:1 photo at public/headshot.jpg and it appears here (plan 6.5.8).
const hasHeadshot = existsSync(join(process.cwd(), "public", "headshot.jpg"));

const values = [
  {
    title: "Fix the cause, not the alert",
    body: "When our email provider suspended us, I traced it to a test-send endpoint with no rate limit. Then I went one step further: per-worker limits multiply across the fleet, so I replaced them with one shared Redis budget.",
  },
  {
    title: "Make the safe path the default",
    body: "Tenant scoping lives in middleware and guards, not in each query someone might forget. Type errors fail CI instead of relying on everyone running tsc locally.",
  },
  {
    title: "Measure before changing anything",
    body: "A build that timed out at 45 minutes turned out to peak at 7.64 GB on an 8 GB machine because two checks ran in parallel. The number made the fix obvious.",
  },
  {
    title: "Reuse the engine you already trust",
    body: "When we ported a recruitment tool into the CRM, candidates became flagged leads, so they got the existing campaign and automation engines instead of a parallel copy.",
  },
];

const facts = [
  ["Based in", `${site.location} (${site.timezone})`],
  ["Looking for", "Senior full-stack or product-engineering roles, remote or with relocation"],
  ["Roles", "Technical architect, business analyst, project lead"],
  ["Stack", "TypeScript · NestJS · Next.js · MongoDB · Redis · BullMQ"],
  ["Shipped", `≈${stats.roundedCommits} commits across 9 production apps since ${stats.firstDate.slice(0, 4)}`],
];

export default function About() {
  return (
    <div className="container-page">
      <PageHeader eyebrow="About" title="I like the parts of software that have to keep working at 3 a.m." />

      <div className="grid gap-12 md:grid-cols-12">
        <div className="grid content-start gap-4 text-body text-ink-2 md:col-span-7">
          <p>
            I’m Kirman, a full-stack engineer in Lahore. For the last three years I was the lead engineer on a multi-tenant CRM
            for lending and mortgage teams: a NestJS backend that grew to 111 modules, a Next.js frontend, and the queues,
            billing and AI features that tie them together.
          </p>
          <p>
            Most of what I’m proud of there is invisible when it works: tenant data that never leaks between customers,
            campaigns that go out on time without tripping a provider’s rate limit, and AI agents that can act on real data
            without overstepping.
          </p>
          <p>
            Before that I spent 18 months at Scytale Labs writing JavaScript clients for the Casper blockchain, GraphQL
            mutations that connected smart contracts to the app, and a React Native wallet. I started out freelancing,
            building React sites for small businesses.
          </p>
          <p>
            I’m currently Technical Architect at XisLabs and looking for my next challenge: a team that cares about reliability
            and good product, remote or with relocation.
          </p>
        </div>

        <aside className="md:col-span-5">
          {hasHeadshot && (
            <Image
              src="/headshot.jpg"
              alt="Kirman Shahab"
              width={480}
              height={480}
              className="mb-6 aspect-square w-full max-w-[360px] rounded-md border border-line object-cover"
              priority
            />
          )}
          <dl className="border-t border-line">
            {facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[112px_1fr] gap-4 border-b border-line py-3">
                <dt className="micro pt-1">{k}</dt>
                <dd className="text-small text-ink-2">{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <section aria-labelledby="values-title" className="mt-24">
        <p className="micro mb-2">How I work</p>
        <h2 id="values-title" className="mb-8 text-h2">Four habits, each with a story</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {values.map((v, i) => (
            <li key={v.title} data-reveal style={{ "--i": i } as React.CSSProperties} className="card grid content-start gap-2 p-6">
              <h3 className="text-h3 text-ink">{v.title}</h3>
              <p className="text-small text-muted">{v.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="path-title" className="mt-24 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="micro mb-2">Path</p>
          <h2 id="path-title" className="text-h2">Career</h2>
        </div>
        <div className="md:col-span-8"><Timeline /></div>
      </section>
    </div>
  );
}
