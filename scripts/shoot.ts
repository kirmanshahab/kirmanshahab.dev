// Design QA (plan 6.5.10): screenshots every page at all 7 breakpoints in
// light and dark into design/qa/<date>/, and reports horizontal overflow.
// Usage: pnpm build && pnpm start -p 3100, then:
//   pnpm shoot                      # all pages
//   pnpm shoot / /work              # only these paths
// Env: BASE_URL (default http://localhost:3100), ONLY_WIDTHS=390,1440
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const base = process.env.BASE_URL ?? "http://localhost:3100";
const allPages = ["/", "/work", "/work/multi-tenant-crm", "/about", "/resume", "/contact", "/?r=1", "/this-does-not-exist"];
const pages = process.argv.length > 2 ? process.argv.slice(2) : allPages;
const widths = (process.env.ONLY_WIDTHS ?? "360,390,768,1024,1280,1440,1920").split(",").map(Number);
const themes = ["light", "dark"] as const;
const date = new Date().toISOString().slice(0, 10);
const out = join(root, "design", "qa", date);
mkdirSync(out, { recursive: true });

const slug = (p: string) => (p === "/" ? "home" : p.replace(/^\//, "").replace(/[/?=]/g, "_"));
const issues: string[] = [];

const browser = await chromium.launch();
for (const theme of themes) {
  const ctx = await browser.newContext({ colorScheme: theme, reducedMotion: "reduce", deviceScaleFactor: 1 });
  for (const width of widths) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width, height: 900 });
    for (const p of pages) {
      await page.goto(base + p, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const sw = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
        if (sw <= vw) return null;
        const wide = [...document.querySelectorAll("body *")]
          .filter((el) => el.getBoundingClientRect().right > vw + 1 && !el.closest("[aria-hidden='true'], .hero-map"))
          .slice(0, 3)
          .map((el) => `${el.tagName.toLowerCase()}.${String((el as HTMLElement).className).split(" ").slice(0, 3).join(".")}`);
        return { sw, vw, wide };
      });
      if (overflow) issues.push(`${p} @${width} ${theme}: scrollWidth ${overflow.sw} > ${overflow.vw} ${overflow.wide.join(", ")}`);
      await page.screenshot({ path: join(out, `${slug(p)}-${width}-${theme}.png`), fullPage: true });
    }
    await page.close();
  }
  await ctx.close();
}
await browser.close();
console.log(`shots → design/qa/${date}/ (${pages.length} pages × ${widths.length} widths × 2 themes)`);
if (issues.length) {
  console.log(`\nOverflow issues:\n${issues.join("\n")}`);
  process.exitCode = 1;
} else console.log("no horizontal overflow at any width");
