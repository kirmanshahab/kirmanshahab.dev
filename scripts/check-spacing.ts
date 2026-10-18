// Fails if any Tailwind spacing utility (padding, margin, gap, space) uses a
// value outside the plan's scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px (6.5.5).
// Tailwind's --spacing is 4px, so allowed steps are 1 2 3 4 6 8 12 16 24 32.
// Exception: 20 (80px), the mobile section rhythm the plan specifies separately.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ALLOWED = new Set(["0", "px", "1", "2", "3", "4", "6", "8", "12", "16", "24", "32", "20"]);
const UTIL = /(?<![\w-])-?(?:[a-z0-9]+:)*-?(p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me|gap|gap-x|gap-y|space-x|space-y|scroll-mt|scroll-pt)-(\d+(?:\.\d+)?|px)(?![\w.[-])/g;

function* files(dir: string): Generator<string> {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* files(p);
    else if (/\.(tsx|ts|mdx)$/.test(name)) yield p;
  }
}

const problems: string[] = [];
for (const file of files(join(root, "src"))) {
  readFileSync(file, "utf8").split("\n").forEach((line, i) => {
    for (const m of line.matchAll(UTIL)) {
      if (!ALLOWED.has(m[2]!)) problems.push(`${relative(root, file)}:${i + 1}  ${m[0]}  (${Number(m[2]) * 4}px is off-scale)`);
    }
  });
}

if (problems.length) {
  console.error(`Off-scale spacing (plan 6.5.5):\n${problems.join("\n")}`);
  process.exit(1);
}
console.log("spacing: all utilities on the 4/8/12/16/24/32/48/64/96/128 scale");
