// Web version of Resume v2 (Documents\CV\Kirman-Shahab-CV-v2.html). Same
// content, except the phone number, which never goes on the website.
// When the resume changes, update both.

export const resume = {
  title: "Senior Full Stack Engineer",
  headline: "TypeScript · Node.js/NestJS · Next.js · Distributed Systems · AI Agents",
  summary:
    "Senior full stack engineer who builds the hard parts of SaaS: multi-tenant isolation, job queues that don’t melt, billing and metering, and AI agents that safely touch real customer data. ≈4,300 commits over 3 years leading a 111-module multi-tenant CRM (NestJS, Next.js, MongoDB, Redis/BullMQ); previously blockchain (Casper) and React Native.",
  roles: [
    {
      title: "Technical Architect, Full Stack Development",
      org: "XisLabs, Lahore, Pakistan",
      period: "Jul 2023 – Oct 2026",
      bullets: [
        "Technical architect for Maple Connect, a multi-tenant SaaS CRM for lending and mortgage teams: 111 NestJS modules, ~4,000 TypeScript files, ~1,340 test specs. Top contributor with ≈4,300 commits across 9 production apps.",
        "Also business analyst and project manager for a small team: requirements, specs, sprints, delivery.",
        "Architected multi-tenant data isolation with request-scoped tenant context and guards across all 111 modules, plus RBAC (JWT, OAuth 2.0) and plan-based entitlements enforced on API and client.",
        "Built event-driven job processing on BullMQ and Redis for campaigns, drip sequences, cron automations and bulk imports. Designed a global Redis rate budget shared by every worker after an email-provider suspension; zero suspensions afterwards.",
        "Removed a cron thundering herd (every past-due campaign firing at 07:00:05) with jittered scheduling, and moved scheduled email off the provider onto BullMQ delayed jobs with pause/resume.",
        "Shipped a Model Context Protocol (MCP) server exposing CRM operations to AI agents, with tool calling across 3 LLM providers (Claude, OpenAI, Gemini). Built per-use token metering and a wallet, and fixed an uncharged-calls bug with a data migration.",
        "Delivered real-time features on Socket.IO with a Redis adapter for horizontal scaling, and integrated 7 platforms: Stripe (subscriptions, webhooks), Twilio Voice/SMS, Retell AI, SendGrid, AWS S3/SES, Google and Outlook calendars.",
        "Ran CI/CD on GitHub Actions and Docker with Playwright e2e tests; added a TypeScript type-check gate to an SWC build that was silently shipping 17 type errors, and fixed a Next.js build peaking at 7.64 GB on an 8 GB builder.",
        "Built MedusaJS headless storefronts (Meilisearch, multi-region, 2 payment gateways) and a React Native app for WoodUImagine.",
      ],
    },
    {
      title: "Blockchain & Full Stack Developer",
      org: "Scytale Labs, Remote",
      period: "Jan 2022 – Jul 2023",
      bullets: [
        "Built JS/TS client libraries for the Casper Network blockchain (casper-js-sdk): deploys, signing, state queries.",
        "Designed and tested GraphQL mutations that connected smart contracts to the backend and frontend, end to end.",
        "Built a React Native app (iOS/Android) with wallet connectivity and transaction signing.",
        "Built MERN stack services and dashboards (MongoDB, Express, React, Node.js).",
      ],
    },
    {
      title: "Freelance Frontend Developer",
      org: "Self-employed, Remote",
      period: "2021",
      bullets: ["Built responsive, mobile-first React apps for e-commerce and small business clients, from requirements to delivery."],
    },
  ],
  skills: [
    ["Backend", "TypeScript, Node.js, NestJS, Express, REST, GraphQL (Apollo/Yoga), Socket.IO, BullMQ, Mongoose"],
    ["Frontend & Mobile", "React, Next.js (App Router), React Native, React Query, Zustand, Redux Toolkit, Tailwind CSS"],
    ["Data & DevOps", "MongoDB, Redis, Meilisearch, Docker, GitHub Actions, AWS (S3, SES), DigitalOcean"],
    ["AI & Blockchain", "MCP, tool calling, Claude, OpenAI, Gemini, Vercel AI SDK, Casper Network, Rust (basic)"],
    ["Architecture", "Multi-tenant SaaS, RBAC, event-driven design, job queues, rate limiting, webhooks, horizontal scaling"],
    ["Leadership", "Technical architecture, business analysis, requirements gathering, project management, Agile/Scrum"],
  ],
  education: [
    ["BSc in Computer Science, Virtual University of Pakistan, Lahore", "2016 – 2020"],
    ["Junior Full Stack Development Program, Gaper, Lahore", "2021"],
  ],
  languages: "English (professional), Urdu (native)",
} as const;
