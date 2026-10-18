"use client";

import { useEffect, useRef } from "react";

/**
 * Makes the hero map respond to the cursor: the node nearest the pointer and
 * its edges brighten. Desktop pointers only; no effect with reduced motion.
 */
export function MapCursor({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    const hero = root?.closest("section");
    if (!root || !hero) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const svg = root.querySelector<SVGSVGElement>("svg[data-system-map]");
    if (!svg) return;
    const nodes = [...svg.querySelectorAll<SVGGElement>("[data-node]")];
    const edges = [...svg.querySelectorAll<SVGPathElement>("path[data-from]")];
    let active: string | null = null;
    let frame = 0;

    const set = (id: string | null) => {
      if (id === active) return;
      active = id;
      for (const n of nodes) n.toggleAttribute("data-active", n.dataset.node === id);
      for (const e of edges) e.toggleAttribute("data-active", id !== null && (e.dataset.from === id || e.dataset.to === id));
    };

    const onMove = (ev: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let best: string | null = null;
        let bestDist = 72; // px: only react when the cursor is actually near a node
        for (const n of nodes) {
          const r = n.getBoundingClientRect();
          const d = Math.hypot(ev.clientX - (r.left + r.width / 2), ev.clientY - (r.top + r.height / 2));
          if (d < bestDist) { bestDist = d; best = n.dataset.node ?? null; }
        }
        set(best);
      });
    };
    const onLeave = () => set(null);
    hero.addEventListener("pointermove", onMove, { passive: true });
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
