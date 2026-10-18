import { work } from "#content";
import { CaseCard } from "@/components/case-card";
import { Heatmap } from "@/components/home/heatmap";
import { Hero } from "@/components/home/hero";
import { Projects } from "@/components/home/projects";
import { ProofStrip } from "@/components/home/proof-strip";
import { SectionHeading } from "@/components/section-heading";
import { Timeline } from "@/components/timeline";

export default function Home() {
  const featured = work.filter((w) => w.featured).sort((a, b) => a.order - b.order);
  return (
    <div className="container-page">
      <Hero />
      <div className="grid gap-20 md:gap-32">
        <ProofStrip />

        <section aria-labelledby="work-title">
          <SectionHeading id="work-title" eyebrow="Selected work" title="Case studies" href="/work" linkLabel="All case studies" />
          <ul className="grid gap-4 md:grid-cols-3">
            {featured.map((w, i) => (
              <li key={w.slug} data-reveal style={{ "--i": i } as React.CSSProperties}>
                <CaseCard item={w} large />
              </li>
            ))}
          </ul>
        </section>

        <Heatmap />

        <Projects />

        <section aria-labelledby="timeline-title" className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionHeading id="timeline-title" eyebrow="Path" title="Career" />
            <a href="/about" className="link -mt-4 inline-block text-small text-muted hover:text-ink">More about me</a>
          </div>
          <div className="md:col-span-8">
            <Timeline />
          </div>
        </section>
      </div>
    </div>
  );
}
