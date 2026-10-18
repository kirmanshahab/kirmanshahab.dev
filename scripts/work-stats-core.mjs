// Pure helpers for work-stats.mjs. Kept separate so they can be unit-tested
// without touching any git repository.

/**
 * The repo list is private (folder names include client names), so it lives in
 * scripts/work-stats.repos.local.json, which is git-ignored and never committed.
 * Shape: { "base": "C:\\path\\to\\clones", "repos": ["folder-a", "folder-b"] }
 */
export const LOCAL_REPO_LIST = "work-stats.repos.local.json";

const AUTHOR_PATTERN = /kirman/i;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Turns `git log --format=%an|%ae|%ad --date=short` output into a list of
 * dates (YYYY-MM-DD), keeping only commits whose author name or email
 * contains "kirman". Names and emails are dropped right here.
 */
export function datesFromGitLog(output) {
  const dates = [];
  for (const line of output.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const parts = line.split("|");
    if (parts.length < 3) continue;
    const date = parts.pop().trim();
    const author = parts.join("|");
    if (AUTHOR_PATTERN.test(author) && DATE_PATTERN.test(date)) dates.push(date);
  }
  return dates;
}

function addDays(isoDate, days) {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * Aggregates per-repo date lists into the public stats object.
 * Only counts and dates leave this function.
 */
export function aggregate(datesPerRepo, now = new Date()) {
  const all = datesPerRepo.flat().sort();
  const counts = new Map();
  for (const date of all) counts.set(date, (counts.get(date) ?? 0) + 1);

  const firstDate = all[0] ?? null;
  const lastDate = all.at(-1) ?? null;

  const daily = {};
  if (firstDate && lastDate) {
    for (let d = firstDate; d <= lastDate; d = addDays(d, 1)) daily[d] = counts.get(d) ?? 0;
  }

  const byYear = {};
  for (const [date, n] of counts) {
    const year = date.slice(0, 4);
    byYear[year] = (byYear[year] ?? 0) + n;
  }

  return {
    generatedAt: now.toISOString(),
    totalCommits: all.length,
    repos: datesPerRepo.filter((dates) => dates.length > 0).length,
    firstDate,
    lastDate,
    daily,
    byYear: Object.fromEntries(Object.entries(byYear).sort()),
  };
}

/**
 * Returns a list of privacy problems in a stats object (empty = safe).
 * Every key and value is checked for `/`, `@`, or any repo name.
 */
export function findPrivacyLeaks(stats, repoNames = []) {
  const problems = [];
  const forbidden = repoNames.map((n) => n.toLowerCase());
  const check = (text, where) => {
    const lower = String(text).toLowerCase();
    if (lower.includes("/")) problems.push(`"/" in ${where}`);
    if (lower.includes("@")) problems.push(`"@" in ${where}`);
    for (const name of forbidden) if (lower.includes(name)) problems.push(`repo name in ${where}`);
  };
  const walk = (value, path) => {
    if (value && typeof value === "object") {
      for (const [k, v] of Object.entries(value)) {
        check(k, `key ${path}${k}`);
        walk(v, `${path}${k}.`);
      }
    } else if (value !== null) {
      check(value, `value at ${path.slice(0, -1) || "root"}`);
    }
  };
  walk(stats, "");
  return problems;
}
