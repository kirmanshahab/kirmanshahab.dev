import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { work } from "#content";
import { covers } from "#root/content/site-data";
import { MDXContent } from "@/components/mdx";
import { SystemMap } from "@/components/system-map";
import { articleJsonLd, JsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = work.find((w) => w.slug === slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: item.url },
    openGraph: { type: "article", title: item.title, description: item.summary, url: item.url },
  };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const item = work.find((w) => w.slug === slug);
  if (!item) notFound();
  const sorted = [...work].sort((a, b) => a.order - b.order);
  const next = sorted[(sorted.indexOf(item) + 1) % sorted.length]!;

  return (
    <article className="container-page">
      <JsonLd data={articleJsonLd({ title: item.title, description: item.summary, url: item.url })} />
      <div className="pt-12 md:pt-16">
        <Link href="/work" className="inline-flex items-center gap-2 text-small text-muted hover:text-ink">
          <ArrowLeft size={16} strokeWidth={1.5} aria-hidden /> All case studies
        </Link>
      </div>

      <header className="grid gap-8 pt-12 pb-12 md:grid-cols-12 md:pb-16">
        <div className="grid content-start gap-4 md:col-span-7">
          <p className="micro">{item.period} · {item.role}</p>
          <h1 className="text-h1">{item.title}</h1>
          <p className="text-lead text-ink-2">{item.summary}</p>
          {item.status === "draft" && (
            <p className="pill justify-self-start">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden /> Full write-up in progress
            </p>
          )}
        </div>
        <div className="relative h-56 overflow-hidden rounded-md border border-line bg-surface-2 md:col-span-5 md:h-auto md:min-h-64" aria-hidden>
          <SystemMap highlight={covers[item.cover] ?? []} bare crop className="absolute inset-0 size-full" />
        </div>
      </header>

      <div className="grid gap-12 md:grid-cols-12">
        <aside className="md:col-span-4 md:order-2">
          <div className="card grid gap-6 p-6 md:sticky md:top-8">
            <div className="grid gap-3">
              <h2 className="micro">TL;DR</h2>
              <ul className="grid gap-3">
                {item.tldr.map((t) => (
                  <li key={t} className="flex gap-3 text-small text-ink-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-3">
              <h2 className="micro">Stack</h2>
              <ul className="flex flex-wrap gap-2">
                {item.stack.map((s) => <li key={s} className="chip">{s}</li>)}
              </ul>
            </div>
          </div>
        </aside>
        <div className="max-w-[68ch] md:col-span-8 md:order-1 [&>h2:first-child]:mt-0">
          <MDXContent code={item.body} />
        </div>
      </div>

      <nav aria-label="Next case study" className="mt-24 border-t border-line pt-8">
        <p className="micro mb-2">Next</p>
        <Link href={next.url as `/work/${string}`} className="text-h3 text-ink hover:text-accent">
          {next.title} →
        </Link>
      </nav>
    </article>
  );
}
