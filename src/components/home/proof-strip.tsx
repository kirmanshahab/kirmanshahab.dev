import { proofTiles, stats } from "@/lib/work-stats";
import { CountUp } from "../count-up";

export function ProofStrip() {
  return (
    <section aria-label="Proof in numbers">
      <dl className="grid grid-cols-2 overflow-hidden rounded-md border border-line bg-surface md:grid-cols-4 dark:border-transparent dark:shadow-[0_0_0_1px_var(--line)]">
        {proofTiles.map((t, i) => (
          <div
            key={t.label}
            className={[
              "flex flex-col-reverse gap-2 p-4 md:p-6",
              i % 2 === 1 ? "border-l border-line" : "",
              i >= 2 ? "border-t border-line md:border-t-0" : "",
              i === 2 ? "md:border-l" : "",
            ].join(" ")}
          >
            <dt className="micro">{t.label}</dt>
            <dd className="font-mono text-h2 font-medium tracking-[-0.04em] text-ink md:text-h1 md:tracking-[-0.04em]">
              <CountUp value={t.value} suffix={t.suffix} />
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 flex justify-between gap-4">
        <p className="micro">{stats.range}<span className="hidden sm:inline"> · private repos, aggregated</span></p>
        <p className="micro hidden md:block">Source: git log · dates + counts only</p>
      </div>
    </section>
  );
}
