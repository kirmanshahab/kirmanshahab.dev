import { projects } from "#root/content/site-data";
import { SectionHeading } from "../section-heading";

const statusLabel = { live: "Live", building: "Building now", planned: "Planned" } as const;

export function Projects() {
  return (
    <section aria-labelledby="projects-title">
      <SectionHeading id="projects-title" eyebrow="In the open" title="Public projects" />
      <p className="-mt-4 mb-8 max-w-[64ch] text-body text-muted">
        My best work is private, so I’m rebuilding the same ideas from scratch where you can read the code. One ships every week or two.
      </p>
      <ul className="grid gap-4 md:grid-cols-2">
        {projects.map((p, i) => (
          <li key={p.slug} data-reveal style={{ "--i": i } as React.CSSProperties} className="card flex flex-col gap-3 p-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <h3 className="font-mono text-body font-medium text-ink">{p.name}</h3>
              <span className="inline-flex shrink-0 items-center gap-2 font-mono text-micro text-muted">
                <span className={`size-1.5 rounded-full ${p.status === "live" ? "bg-ok" : p.status === "building" ? "bg-accent" : "bg-line-strong"}`} aria-hidden />
                {statusLabel[p.status]} · {p.eta}
              </span>
            </div>
            <p className="text-small text-muted">{p.oneLiner}</p>
            <ul className="mt-auto flex flex-wrap gap-2 pt-3" aria-label="Stack">
              {p.stack.map((s) => <li key={s} className="chip">{s}</li>)}
            </ul>
            {(p.repo || p.demo) && (
              <div className="flex gap-4 text-small">
                {p.repo && <a className="link" href={p.repo}>Repository</a>}
                {p.demo && <a className="link" href={p.demo}>Live demo</a>}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
