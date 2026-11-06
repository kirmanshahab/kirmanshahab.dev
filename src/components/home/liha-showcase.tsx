import { ArrowRight, Smartphone, Store, Warehouse } from "lucide-react";
import Link from "next/link";
import { BrowserFrame } from "../frame";

const parts = [
  {
    icon: Store,
    name: "Storefront",
    line: "A fast online shop where customers pick delivery or pickup, pay by JazzCash or bank transfer and get confirmed on WhatsApp.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    icon: Warehouse,
    name: "Headless ERP",
    line: "The back office: stock by branch, recipes that cost themselves, production batches, cash settlement, riders and loyalty.",
    stack: ["Payload CMS", "PostgreSQL", "Zod"],
  },
  {
    icon: Smartphone,
    name: "Staff app",
    line: "A React Native app for the kitchen and counter that keeps working offline and never sends the same action twice.",
    stack: ["Expo", "React Native", "TanStack Query"],
  },
] as const;

export function LihaShowcase() {
  return (
    <section aria-labelledby="liha-title" className="showcase p-6 md:p-12">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="grid content-start gap-4 lg:col-span-5">
          <p className="micro">Featured · live end-to-end build</p>
          <h2 id="liha-title" className="text-h1">
            One system for a whole bakery
          </h2>
          <p className="text-lead text-ink-2">
            LIHA is a Lahore bakery. I built the shop its customers order from, the back office its owner runs the
            business in, and the phone app its staff use at 6 a.m. All three share one set of rules and are live.
          </p>
          <Link href="/work/liha-platform" className="btn btn-primary justify-self-start">
            Read the case study <ArrowRight size={16} strokeWidth={1.5} aria-hidden />
          </Link>
        </div>
        <div className="lg:col-span-7">
          <BrowserFrame
            src="/work/liha/erp-dashboard.webp"
            alt="The LIHA owner dashboard: open orders, orders awaiting payment, revenue today"
            width={1280}
            height={410}
            url="admin · dashboard"
            sizes="(min-width: 1024px) 640px, 100vw"
          />
        </div>
      </div>

      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {parts.map((p, i) => (
          <li
            key={p.name}
            data-reveal
            style={{ "--i": i } as React.CSSProperties}
            className="grid content-start gap-3 rounded-[20px] border border-line bg-surface p-6"
          >
            <span className="grid size-10 place-items-center rounded-full bg-accent-soft text-accent">
              <p.icon size={20} strokeWidth={1.75} aria-hidden />
            </span>
            <h3 className="text-h3">{p.name}</h3>
            <p className="text-small text-muted">{p.line}</p>
            <ul className="flex flex-wrap gap-2 pt-1" aria-label="Stack">
              {p.stack.map((s) => (
                <li key={s} className="chip">{s}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
