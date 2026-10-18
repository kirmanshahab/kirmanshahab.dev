// Pure layout logic for the commit heatmap (unit-tested in heatmap.test.ts).

export type Cell = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4; week: number; day: number };

const DAY = 86_400_000;
const toDate = (iso: string) => new Date(`${iso}T00:00:00Z`);
const iso = (d: Date) => d.toISOString().slice(0, 10);

/** Quartile thresholds of the non-zero days → levels 1–4. Zero stays level 0. */
export function thresholds(counts: number[]): [number, number, number] {
  const active = counts.filter((n) => n > 0).sort((a, b) => a - b);
  if (active.length === 0) return [1, 1, 1];
  const q = (p: number) => active[Math.min(active.length - 1, Math.floor(p * active.length))]!;
  return [q(0.25), q(0.5), q(0.75)];
}

export function levelFor(count: number, [t1, t2, t3]: [number, number, number]): Cell["level"] {
  if (count <= 0) return 0;
  if (count <= t1) return 1;
  if (count <= t2) return 2;
  if (count <= t3) return 3;
  return 4;
}

/**
 * Lays out every day from first to last as a Monday-first calendar:
 * week = column index from the first week, day = 0 (Mon) … 6 (Sun).
 */
export function layout(daily: Record<string, number>, firstDate: string, lastDate: string) {
  const t = thresholds(Object.values(daily));
  const start = toDate(firstDate);
  const startDow = (start.getUTCDay() + 6) % 7;
  const weekZero = start.getTime() - startDow * DAY;
  const cells: Cell[] = [];
  for (let ms = start.getTime(); ms <= toDate(lastDate).getTime(); ms += DAY) {
    const d = new Date(ms);
    const date = iso(d);
    const count = daily[date] ?? 0;
    cells.push({ date, count, level: levelFor(count, t), week: Math.floor((ms - weekZero) / (7 * DAY)), day: (d.getUTCDay() + 6) % 7 });
  }
  const weeks = (cells.at(-1)?.week ?? 0) + 1;
  return { cells, weeks, thresholds: t };
}

/** Splits the weeks into `rows` near-equal bands. Returns [startWeek, endWeekExclusive][]. */
export function bands(weeks: number, rows: number): [number, number][] {
  const size = Math.ceil(weeks / rows);
  return Array.from({ length: rows }, (_, i) => [i * size, Math.min(weeks, (i + 1) * size)] as [number, number]).filter(
    ([a, b]) => b > a,
  );
}

/** First week index of each month, for the month labels. */
export function monthStarts(cells: Cell[]) {
  const out: { week: number; label: string; year: number }[] = [];
  let last = "";
  for (const c of cells) {
    const key = c.date.slice(0, 7);
    if (key !== last && Number(c.date.slice(8, 10)) <= 7) {
      out.push({ week: c.week, label: new Date(`${c.date}T00:00:00Z`).toLocaleString("en-US", { month: "short", timeZone: "UTC" }), year: Number(c.date.slice(0, 4)) });
    }
    last = key;
  }
  return out;
}
