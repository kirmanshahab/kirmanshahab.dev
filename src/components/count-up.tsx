"use client";

import { useEffect, useRef } from "react";

const fmt = new Intl.NumberFormat("en-US");

/**
 * Renders the final number in HTML (so crawlers, no-JS and reduced-motion users
 * see it immediately), then counts up from 0 once, over 900ms, when scrolled into view.
 */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 900);
        const eased = 1 - Math.pow(1 - t, 4);
        el.textContent = fmt.format(Math.round(value * eased)) + suffix;
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        io.disconnect();
        run();
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, suffix]);

  return (
    <span ref={ref} className="num">
      {fmt.format(value) + suffix}
    </span>
  );
}
