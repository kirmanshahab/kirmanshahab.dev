import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { aggregate, datesFromGitLog, findPrivacyLeaks, LOCAL_REPO_LIST } from "./work-stats-core.mjs";

const LOG = [
  "Kirman Shahab|work-identity@example.com|2024-02-06",
  "kirmanWorkAccount|123+kirmanWorkAccount@users.noreply.github.com|2024-02-06",
  "Someone Else|someone@example.com|2024-02-06",
  "Dependabot|bot@example.com|2024-02-07",
  "KIRMAN|k@x.io|2024-02-09",
  "malformed line",
].join("\n");

describe("datesFromGitLog", () => {
  it("keeps only commits whose name or email contains 'kirman' (both identities)", () => {
    expect(datesFromGitLog(LOG)).toEqual(["2024-02-06", "2024-02-06", "2024-02-09"]);
  });
  it("handles CRLF output from git on Windows", () => {
    expect(datesFromGitLog(LOG.replace(/\n/g, "\r\n"))).toHaveLength(3);
  });
});

describe("aggregate", () => {
  const stats = aggregate([datesFromGitLog(LOG), [], ["2025-01-01"]], new Date("2026-10-18T00:00:00Z"));
  it("counts commits, active repos and years", () => {
    expect(stats.totalCommits).toBe(4);
    expect(stats.repos).toBe(2);
    expect(stats.byYear).toEqual({ 2024: 3, 2025: 1 });
  });
  it("fills every day in the range, zeros included", () => {
    expect(stats.daily["2024-02-06"]).toBe(2);
    expect(stats.daily["2024-02-07"]).toBe(0);
    expect(Object.keys(stats.daily)).toHaveLength(331);
  });
});

describe("privacy (plan 6.4)", () => {
  it("never outputs '/', '@' or a repo name, in any key or value", () => {
    const stats = aggregate([datesFromGitLog(LOG)]);
    expect(findPrivacyLeaks(stats)).toEqual([]);
  });
  it("detects leaks when they are present", () => {
    expect(findPrivacyLeaks({ note: "a@b" })).toHaveLength(1);
    expect(findPrivacyLeaks({ "x/y": 1 })).toHaveLength(1);
    expect(findPrivacyLeaks({ repo: "secret-client-site" }, ["secret-client-site"])).toHaveLength(1);
  });
  it("the committed data/work-stats.json is clean", () => {
    const committed = JSON.parse(readFileSync(new URL("../data/work-stats.json", import.meta.url), "utf8"));
    // On Kirman's machine the real (private) repo names are checked too.
    const local = new URL(`./${LOCAL_REPO_LIST}`, import.meta.url);
    const names = existsSync(local) ? JSON.parse(readFileSync(local, "utf8")).repos : [];
    expect(findPrivacyLeaks(committed, names)).toEqual([]);
    expect(Object.keys(committed).sort()).toEqual(["byYear", "daily", "firstDate", "generatedAt", "lastDate", "repos", "totalCommits"]);
  });
});
