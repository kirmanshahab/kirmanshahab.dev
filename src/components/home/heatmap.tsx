import { bands, layout, monthStarts } from "@/lib/heatmap";
import { stats } from "@/lib/work-stats";
import { HeatmapReadout } from "./heatmap-readout";

const CELL = 12;
const GAP = 3;
const STEP = CELL + GAP;
const LABEL_H = 20;

const nf = new Intl.NumberFormat("en-US");

const { cells, weeks } = layout(stats.daily, stats.firstDate, stats.lastDate);
const months = monthStarts(cells);

/** One path per colour level: ~5 DOM nodes per band instead of one <rect> per day. */
function levelPaths(from: number, to: number) {
  const d: string[] = ["", "", "", "", ""];
  for (const c of cells) {
    if (c.week < from || c.week >= to) continue;
    const x = (c.week - from) * STEP;
    const y = LABEL_H + c.day * STEP;
    // Rounded 12×12 square (r=2) as a compact path.
    d[c.level] += `M${x + 2} ${y}h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z`;
  }
  return d;
}

function Band({ from, to }: { from: number; to: number }) {
  const width = (to - from) * STEP - GAP;
  const height = LABEL_H + 7 * STEP - GAP;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="heat-band w-full" data-from={from} data-to={to} role="presentation">
      {months
        .filter((m) => m.week >= from && m.week < to - 1)
        .map((m) => (
          <text key={`${m.year}-${m.label}`} x={(m.week - from) * STEP} y={11} fontSize={10} className="fill-muted font-mono">
            {m.label === "Jan" || m.week === from ? `${m.label} ${String(m.year).slice(2)}` : m.label}
          </text>
        ))}
      <g className="heat-cells">
        {levelPaths(from, to).map((d, level) => d && <path key={level} d={d} className={`heat-${level}`} />)}
      </g>
    </svg>
  );
}

export function Heatmap() {
  const years = Object.entries(stats.byYear);
  return (
    <section id="heatmap" aria-labelledby="heatmap-title" className="scroll-mt-24">
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div className="grid gap-2">
          <p className="micro">Activity</p>
          <h2 id="heatmap-title" className="text-h2">3 years in commits</h2>
        </div>
        <p className="max-w-[48ch] text-small text-muted">
          Private work at XisLabs across two GitHub identities. Code is proprietary; this is the shape of it.
        </p>
      </div>

      <figure
        data-reveal
        className="heatmap card p-4 md:p-6"
        aria-label={`Commit heatmap: ${stats.totalFormatted} commits on ${nf.format(stats.activeDays)} active days, ${stats.range}.`}
        role="img"
      >
        <div className="hidden gap-6 md:grid">
          {bands(weeks, 2).map(([a, b]) => <Band key={a} from={a} to={b} />)}
        </div>
        <div className="grid gap-4 md:hidden">
          {bands(weeks, 4).map(([a, b]) => <Band key={a} from={a} to={b} />)}
        </div>
      </figure>

      <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <dl className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-micro text-muted">
          {years.map(([y, n]) => (
            <div key={y} className="flex gap-2">
              <dt>{y}</dt>
              <dd className="num text-ink-2">{nf.format(n)}</dd>
            </div>
          ))}
          <div className="flex gap-2">
            <dt>active days</dt>
            <dd className="num text-ink-2">{nf.format(stats.activeDays)}</dd>
          </div>
        </dl>
        <HeatmapReadout firstDate={stats.firstDate} daily={stats.daily} step={STEP} labelH={LABEL_H} />
      </div>
    </section>
  );
}
