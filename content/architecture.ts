// The generic shape of the multi-tenant CRM (plan 6.3.1). Generic labels only:
// no tenant, client or company names. Drives the hero map, case-study covers
// and (Phase 2) the interactive architecture explorer.
//
// Coordinates are in a 760×520 viewBox. Node width is derived from the label
// length (Geist Mono has a fixed 0.6em advance), so nothing is measured in the browser.

export type NodeId =
  | "clients" | "web" | "api" | "mongo" | "redis"
  | "campaign" | "drip" | "email" | "imports"
  | "twilio" | "mail" | "stripe" | "llms"
  | "ws" | "mcp" | "agents";

export type ArchNode = { id: NodeId; label: string; x: number; y: number };
export type ArchEdge = { from: NodeId; to: NodeId };

export const VIEWBOX = { width: 760, height: 520 };
export const NODE_HEIGHT = 28;
export const LABEL_SIZE = 11;
const MONO_ADVANCE = 0.6;

export const nodes: ArchNode[] = [
  { id: "clients", label: "clients", x: 40, y: 64 },
  { id: "web", label: "next.js app", x: 176, y: 64 },
  { id: "api", label: "nestjs api · tenant guard", x: 336, y: 64 },
  { id: "mongo", label: "mongodb", x: 600, y: 24 },
  { id: "redis", label: "redis", x: 600, y: 104 },
  { id: "campaign", label: "campaign", x: 368, y: 200 },
  { id: "drip", label: "drip", x: 368, y: 248 },
  { id: "email", label: "email", x: 368, y: 296 },
  { id: "imports", label: "imports", x: 368, y: 344 },
  { id: "twilio", label: "twilio", x: 600, y: 200 },
  { id: "mail", label: "sendgrid / ses", x: 600, y: 248 },
  { id: "stripe", label: "stripe", x: 600, y: 296 },
  { id: "llms", label: "llms", x: 600, y: 344 },
  { id: "ws", label: "socket.io", x: 176, y: 200 },
  { id: "mcp", label: "mcp server", x: 176, y: 440 },
  { id: "agents", label: "ai agents", x: 40, y: 440 },
];

export const groups = [
  { label: "bullmq workers", x: 368, y: 184 },
  { label: "providers", x: 600, y: 184 },
];

export const edges: ArchEdge[] = [
  { from: "clients", to: "web" },
  { from: "web", to: "api" },
  { from: "api", to: "mongo" },
  { from: "api", to: "redis" },
  { from: "api", to: "campaign" },
  { from: "api", to: "drip" },
  { from: "api", to: "email" },
  { from: "api", to: "imports" },
  { from: "campaign", to: "twilio" },
  { from: "drip", to: "mail" },
  { from: "email", to: "mail" },
  { from: "api", to: "stripe" },
  { from: "api", to: "llms" },
  { from: "api", to: "ws" },
  { from: "api", to: "mcp" },
  { from: "mcp", to: "agents" },
];

/** The highlighted path in the hero: request → queue → email provider. */
export const heroPath: NodeId[] = ["web", "api", "redis", "campaign", "email", "mail"];

const RIGHT_BUS = 572;
const LEFT_BUS = 320;

export function nodeWidth(n: ArchNode) {
  return Math.ceil(n.label.length * LABEL_SIZE * MONO_ADVANCE) + 24;
}

const byId = Object.fromEntries(nodes.map((n) => [n.id, n])) as Record<NodeId, ArchNode>;

/** Orthogonal SVG path for an edge, routed through shared buses so lines never cross labels. */
export function edgePath({ from, to }: ArchEdge): string {
  const a = byId[from];
  const b = byId[to];
  const aw = nodeWidth(a);
  const bw = nodeWidth(b);
  const mid = NODE_HEIGHT / 2;
  if (a.y === b.y) {
    const [l, r] = a.x < b.x ? [a, b] : [b, a];
    return `M${l.x + nodeWidth(l)} ${l.y + mid} H${r.x}`;
  }
  if (from === "api" && b.x > a.x + aw - 40) return `M${a.x + aw} ${a.y + mid} H${RIGHT_BUS} V${b.y + mid} H${b.x}`;
  if (from === "api" && b.x > a.x) return `M${a.x + 16} ${a.y + NODE_HEIGHT} V${b.y + mid} H${b.x}`;
  if (from === "api") return `M${a.x} ${a.y + mid} H${LEFT_BUS} V${b.y + mid} H${b.x + bw}`;
  if (b.x === a.x) return `M${a.x + 16} ${a.y + NODE_HEIGHT} V${b.y}`;
  const mx = Math.round((a.x + aw + b.x) / 2) + (to === "mail" ? 0 : 24);
  return `M${a.x + aw} ${a.y + mid} H${mx} V${b.y + mid} H${b.x}`;
}
