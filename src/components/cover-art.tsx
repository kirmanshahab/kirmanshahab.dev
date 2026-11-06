import { Blocks, Bot, CakeSlice, Network, ShoppingBag, Smartphone, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// One calm, warm panel per case study, built only from design tokens.
const art: Record<string, { icon: LucideIcon; angle: number; sun: number; accent: number }> = {
  crm: { icon: Network, angle: 135, sun: 34, accent: 10 },
  queues: { icon: Workflow, angle: 200, sun: 18, accent: 22 },
  agents: { icon: Bot, angle: 160, sun: 28, accent: 16 },
  commerce: { icon: ShoppingBag, angle: 120, sun: 40, accent: 8 },
  chain: { icon: Blocks, angle: 220, sun: 14, accent: 24 },
  mobile: { icon: Smartphone, angle: 150, sun: 26, accent: 18 },
  bakery: { icon: CakeSlice, angle: 135, sun: 32, accent: 20 },
};

export function CoverArt({ cover, className = "" }: { cover: string; className?: string }) {
  const a = art[cover] ?? art.crm!;
  const Icon = a.icon;
  return (
    <div
      aria-hidden
      className={`grid place-items-center ${className}`}
      style={{
        background: `radial-gradient(70% 90% at 85% 10%, color-mix(in oklab, var(--sun) ${a.sun}%, transparent), transparent 70%), linear-gradient(${a.angle}deg, color-mix(in oklab, var(--accent) ${a.accent}%, var(--surface-2)), var(--surface-2))`,
      }}
    >
      <span className="grid size-16 place-items-center rounded-[20px] border border-line-strong bg-surface text-accent shadow-[0_12px_30px_-12px_rgb(60_30_10/0.35)] dark:shadow-none">
        <Icon size={28} strokeWidth={1.5} />
      </span>
    </div>
  );
}
