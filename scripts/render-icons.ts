// Renders design/monogram.svg to src/app/apple-icon.png (180px) and
// src/app/favicon.ico (16/32/48 PNG-in-ICO). Usage: pnpm tsx scripts/render-icons.ts
import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const svg = readFileSync(join(root, "design", "monogram.svg"), "utf8");

async function png(size: number, rounded: boolean) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  // Apple applies its own mask, so the touch icon is a full square.
  const markup = rounded ? svg : svg.replace(/rx="14"/, 'rx="0"');
  await page.setContent(`<style>html,body{margin:0;background:transparent}svg{width:${size}px;height:${size}px;display:block}</style>${markup}`);
  const buf = await page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
  await page.close();
  return buf;
}

/** ICO container holding PNG images (supported by every current browser). */
function ico(images: { size: number; data: Buffer }[]) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const e = 6 + i * 16;
    header.writeUInt8(size >= 256 ? 0 : size, e);
    header.writeUInt8(size >= 256 ? 0 : size, e + 1);
    header.writeUInt16LE(1, e + 4);
    header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(data.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((i) => i.data)]);
}

const browser = await chromium.launch();
writeFileSync(join(root, "src", "app", "apple-icon.png"), await png(180, false));
const sizes = [16, 32, 48];
const images = [];
for (const size of sizes) images.push({ size, data: await png(size, true) });
writeFileSync(join(root, "src", "app", "favicon.ico"), ico(images));
await browser.close();
console.log("wrote src/app/apple-icon.png and src/app/favicon.ico");
