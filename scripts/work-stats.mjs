#!/usr/bin/env node
// Aggregates Kirman's commit activity from local (private) clones into
// data/work-stats.json: dates and counts only. Runs on Kirman's machine,
// never in CI.
//
// Usage:
//   node scripts/work-stats.mjs                      # repos listed in scripts/work-stats.repos.local.json
//   node scripts/work-stats.mjs <repoPath> [...]     # custom list

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { aggregate, datesFromGitLog, findPrivacyLeaks, LOCAL_REPO_LIST } from "./work-stats-core.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const listFile = join(root, "scripts", LOCAL_REPO_LIST);
let repoPaths = process.argv.slice(2);
let privateNames = [];
if (repoPaths.length === 0) {
  if (!existsSync(listFile)) {
    console.error(`No repo paths given and scripts/${LOCAL_REPO_LIST} is missing (see work-stats-core.mjs).`);
    process.exit(1);
  }
  const { base, repos } = JSON.parse(readFileSync(listFile, "utf8"));
  privateNames = repos;
  repoPaths = repos.map((name) => join(base, name));
}

const datesPerRepo = [];
for (const repo of repoPaths) {
  if (!existsSync(repo)) {
    console.warn(`skipped: a repo path does not exist (#${datesPerRepo.length + 1})`);
    continue;
  }
  // Read-only: `git log` never modifies the repository.
  const out = execFileSync(
    "git",
    ["-C", repo, "log", "--all", "--format=%an|%ae|%ad", "--date=short"],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
  );
  datesPerRepo.push(datesFromGitLog(out));
}

const stats = aggregate(datesPerRepo);
const leaks = findPrivacyLeaks(stats, [...privateNames, ...repoPaths.map((p) => basename(p))]);
if (leaks.length) {
  console.error("Refusing to write: output would leak private details:\n" + leaks.join("\n"));
  process.exit(1);
}

mkdirSync(join(root, "data"), { recursive: true });
writeFileSync(join(root, "data", "work-stats.json"), JSON.stringify(stats, null, 2) + "\n");
console.log(
  `work-stats: ${stats.totalCommits} commits across ${stats.repos} repos, ${stats.firstDate} → ${stats.lastDate}`,
);
console.log("byYear:", stats.byYear);
