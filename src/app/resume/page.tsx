import type { Metadata } from "next";
import { Download } from "lucide-react";
import { resume } from "#root/content/resume";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Kirman Shahab, Senior Full Stack Engineer: NestJS, Next.js, TypeScript, multi-tenant SaaS, queues and AI agents.",
  alternates: { canonical: "/resume" },
};

export default function Resume() {
  return (
    <div className="container-page">
      <div className="resume mx-auto max-w-[800px] pt-16 md:pt-24">
        <header className="grid gap-4 border-b border-line pb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="grid gap-2">
              <h1 className="text-h1">{site.name}</h1>
              <p className="text-body text-ink-2">{resume.title} · {resume.headline}</p>
            </div>
            <a href={site.resumePdf} download className="btn btn-primary no-print self-start">
              <Download size={16} strokeWidth={1.5} aria-hidden /> Download PDF
            </a>
          </div>
          <p className="font-mono text-micro text-muted">
            {site.location} · open to remote &amp; relocation · {site.email} · github.com/{site.githubUser}
          </p>
        </header>

        <section aria-labelledby="r-summary" className="resume-section">
          <h2 id="r-summary" className="micro">Summary</h2>
          <p className="text-body text-ink-2">{resume.summary}</p>
        </section>

        <section aria-labelledby="r-exp" className="resume-section">
          <h2 id="r-exp" className="micro">Experience</h2>
          <div className="grid gap-8">
            {resume.roles.map((r) => (
              <div key={r.title} className="grid gap-3">
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="text-h3 text-ink">{r.title}</h3>
                  <p className="font-mono text-small text-muted num">{r.period}</p>
                </div>
                <p className="-mt-2 text-small text-muted">{r.org}</p>
                <ul className="grid gap-2">
                  {r.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-small text-ink-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-muted" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="r-skills" className="resume-section">
          <h2 id="r-skills" className="micro">Skills</h2>
          <dl className="grid gap-2">
            {resume.skills.map(([k, v]) => (
              <div key={k} className="grid gap-1 md:grid-cols-[160px_1fr] md:gap-4">
                <dt className="text-small font-medium text-ink">{k}</dt>
                <dd className="text-small text-ink-2">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="r-edu" className="resume-section">
          <h2 id="r-edu" className="micro">Education &amp; languages</h2>
          <ul className="grid gap-2">
            {resume.education.map(([what, when]) => (
              <li key={what} className="flex justify-between gap-4 text-small text-ink-2">
                <span>{what}</span>
                <span className="font-mono text-muted num">{when}</span>
              </li>
            ))}
            <li className="text-small text-ink-2">{resume.languages}</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
