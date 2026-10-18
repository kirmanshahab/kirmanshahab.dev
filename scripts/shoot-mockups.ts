// Screenshots the static design mockups (plan 6.5.2) at 1440 and 390px, light + dark.
// Usage: pnpm tsx scripts/shoot-mockups.ts
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "design", "mockups");
const out = join(dir, "shots");
mkdirSync(out, { recursive: true });

const mockups = ["a-editorial", "b-system-map", "c-terminal"];
const widths = [1440, 390];
const themes = ["light", "dark"] as const;

const browser = await chromium.launch();
for (const name of mockups) {
  for (const width of widths) {
    for (const theme of themes) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1, colorScheme: theme });
      const url = `${pathToFileURL(join(dir, `${name}.html`)).href}?theme=${theme}`;
      await page.goto(url, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(3500); // let the one-shot edge pulses finish
      const file = join(out, `${name}-${width}-${theme}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log("shot", file.replace(root, "."));
      await page.close();
    }
  }
}
await browser.close();
