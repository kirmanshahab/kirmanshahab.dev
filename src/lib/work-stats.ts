import raw from "#data/work-stats.json";

// data/work-stats.json is produced by scripts/work-stats.mjs on Kirman's
// machine: dates and commit counts only (plan 6.4).

type WorkStats = {
  generatedAt: string;
  totalCommits: number;
  repos: number;
  firstDate: string;
  lastDate: string;
  daily: Record<string, number>;
  byYear: Record<string, number>;
};

const data = raw as WorkStats;

const fmt = new Intl.NumberFormat("en-US");
const month = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });

export const stats = {
  ...data,
  totalFormatted: fmt.format(data.totalCommits),
  /** e.g. 4,289 → "4,300" for prose ("≈4,300 commits"). */
  roundedCommits: fmt.format(Math.round(data.totalCommits / 100) * 100),
  activeDays: Object.values(data.daily).filter((n) => n > 0).length,
  range: `${month.format(new Date(data.firstDate))} → ${month.format(new Date(data.lastDate))}`,
};

export const proofTiles = [
  { value: data.totalCommits, label: "Commits", suffix: "" },
  { value: 111, label: "Backend modules", suffix: "" },
  { value: 9, label: "Production apps", suffix: "" },
  { value: 5, label: "Years shipping", suffix: "+" },
] as const;
