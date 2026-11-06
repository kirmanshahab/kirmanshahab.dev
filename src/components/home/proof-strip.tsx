import { CountUp } from "../count-up";

const tiles = [
  { value: 10, suffix: "+", label: "companies on the CRM I led" },
  { value: 1700, suffix: "+", label: "API endpoints designed" },
  { value: 35, suffix: "+", label: "background queue processors" },
  { value: 10, suffix: "", label: "people on the team I lead" },
] as const;

export function ProofStrip() {
  return (
    <section aria-label="Proof in numbers">
      <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {tiles.map((t) => (
          <div key={t.label} className="flex flex-col-reverse gap-1 rounded-[20px] border border-line bg-surface p-4 md:p-6">
            <dt className="text-small text-muted">{t.label}</dt>
            <dd className="num text-h1 font-semibold tracking-[-0.04em] text-accent md:text-display-sm">
              <CountUp value={t.value} suffix={t.suffix} />
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-small text-muted">Maple Connect, the multi-tenant CRM I lead at XisLabs.</p>
    </section>
  );
}
