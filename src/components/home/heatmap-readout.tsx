"use client";

import { useEffect, useState } from "react";

const DAY = 86_400_000;
const nf = new Intl.NumberFormat("en-US");
const df = new Intl.DateTimeFormat("en-US", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

type Props = { firstDate: string; daily: Record<string, number>; step: number; labelH: number };

/**
 * Hovering the heatmap shows the day under the pointer ("12 commits · Tue, Feb 6, 2024").
 * Reads the pointer position in SVG coordinates, so the cells need no per-day DOM nodes.
 */
export function HeatmapReadout({ firstDate, daily, step, labelH }: Props) {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    const start = new Date(`${firstDate}T00:00:00Z`);
    const weekZero = start.getTime() - ((start.getUTCDay() + 6) % 7) * DAY;
    const svgs = [...document.querySelectorAll<SVGSVGElement>(".heat-band")];
    const handlers = svgs.map((svg) => {
      const from = Number(svg.dataset.from);
      const onMove = (e: PointerEvent) => {
        const m = svg.getScreenCTM();
        if (!m) return;
        const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
        const col = Math.floor(p.x / step);
        const row = Math.floor((p.y - labelH) / step);
        if (row < 0 || row > 6 || p.x - col * step > step - 3) return setText(null);
        const date = new Date(weekZero + ((from + col) * 7 + row) * DAY).toISOString().slice(0, 10);
        const n = daily[date];
        if (n === undefined) return setText(null);
        setText(`${n === 0 ? "No" : nf.format(n)} commit${n === 1 ? "" : "s"} · ${df.format(new Date(`${date}T00:00:00Z`))}`);
      };
      const onLeave = () => setText(null);
      svg.addEventListener("pointermove", onMove);
      svg.addEventListener("pointerleave", onLeave);
      return () => {
        svg.removeEventListener("pointermove", onMove);
        svg.removeEventListener("pointerleave", onLeave);
      };
    });
    return () => handlers.forEach((off) => off());
  }, [firstDate, daily, step, labelH]);

  return (
    <div className="flex h-4 items-center gap-2 font-mono text-micro text-muted" aria-live="polite">
      {text ? (
        <span className="num text-ink-2">{text}</span>
      ) : (
        <>
          Less
          {[0, 1, 2, 3, 4].map((l) => (
            <svg key={l} width={12} height={12} viewBox="0 0 12 12" aria-hidden>
              <rect width={12} height={12} rx={2} className={`heat-${l}`} />
            </svg>
          ))}
          More
        </>
      )}
    </div>
  );
}
