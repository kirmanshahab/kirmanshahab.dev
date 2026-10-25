import type { NodeId } from "./architecture";

/** Case-study covers: which architecture nodes each cover highlights. */
export const covers: Record<string, NodeId[]> = {
  crm: ["clients", "web", "api", "mongo", "redis", "ws"],
  queues: ["api", "redis", "campaign", "drip", "email", "imports", "twilio", "mail"],
  agents: ["api", "mcp", "agents", "llms", "stripe"],
  commerce: ["clients", "web", "api", "stripe"],
  chain: ["clients", "web", "api", "ws"],
  mobile: ["clients", "api", "ws"],
};

export type Project = {
  slug: string;
  name: string;
  oneLiner: string;
  stack: string[];
  status: "live" | "building" | "planned";
  repo?: string;
  demo?: string;
  eta: string;
};

/** Public side projects (plan section 8). Links appear only once a repo exists. */
export const projects: Project[] = [
  {
    slug: "hookrelay",
    name: "hookrelay",
    oneLiner: "Webhook delivery with an outbox, retries with jitter, HMAC signatures and a dead-letter queue, deployed to Azure with Terraform.",
    stack: ["NestJS", "PostgreSQL", "BullMQ", "Azure", "Terraform"],
    status: "planned",
    eta: "Weeks 3–5",
  },
  {
    slug: "mcp-tenant-tools",
    name: "mcp-tenant-tools",
    oneLiner: "A reference MCP server that lets AI agents work with multi-tenant data safely, scored by a 30-task eval harness.",
    stack: ["MCP", "TypeScript", "PostgreSQL", "Claude"],
    status: "planned",
    eta: "Weeks 5–6",
  },
  {
    slug: "tenantkit",
    name: "tenantkit",
    oneLiner: "Drop-in multi-tenancy for NestJS with Mongoose and Prisma, tested against 15 cross-tenant leak patterns.",
    stack: ["NestJS", "Mongoose", "Prisma", "PostgreSQL"],
    status: "building",
    eta: "Week 2",
  },
  {
    slug: "casper-graphql-gateway",
    name: "casper-graphql-gateway",
    oneLiner: "A Rust contract on Casper testnet, a GraphQL gateway with live subscriptions, and an Expo app that signs transactions.",
    stack: ["Rust", "Odra", "GraphQL", "Expo"],
    status: "planned",
    eta: "Weeks 7–8",
  },
];

export const timeline = [
  { period: "2023 – now", title: "Technical Architect, Full Stack", org: "XisLabs · Lahore", note: "Architect, analyst and delivery lead on a 111-module multi-tenant CRM. Earlier: MedusaJS commerce and a React Native client app." },
  { period: "2022 – 2023", title: "Blockchain & Full Stack Developer", org: "Scytale Labs · Remote", note: "Casper Network JS clients, GraphQL mutations, a React Native wallet." },
  { period: "2021", title: "Freelance Frontend Developer", org: "Remote", note: "Responsive React apps for e-commerce and small-business clients." },
  { period: "2016 – 2020", title: "BSc Computer Science", org: "Virtual University of Pakistan", note: "" },
];
