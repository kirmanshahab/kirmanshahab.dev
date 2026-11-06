// Web version of Resume v2 (Documents\CV\Kirman-Shahab-CV-v2.html). Same
// content, except the phone number, which never goes on the website.
// When the resume changes, update both.

export const resume = {
  title: "Senior Full Stack Engineer",
  headline: "TypeScript · Node.js/NestJS · Next.js · React Native · AI Agents",
  summary:
    "Senior full stack engineer and technical architect with 5+ years of turning business needs into dependable software. For the last three years I have led a 10-person team building Maple Connect, a custom multi-tenant SaaS CRM now implemented for 10+ customers: a NestJS backend, a Next.js app, background queues, real-time features and AI agents. I cover the whole journey, from requirements to go-live, and I have also built e-commerce, mobile and blockchain products.",
  roles: [
    {
      title: "Technical Architect, Full Stack Development",
      org: "XisLabs, Lahore, Pakistan",
      period: "Jul 2023 – Present",
      bullets: [
        "Led the team that designed, built and rolled out Maple Connect, a custom SaaS CRM modelled on Microsoft Dynamics 365, Salesforce and Odoo, implemented for 10+ customers and used daily by 100+ staff.",
        "Architected a modular NestJS backend with 1,700+ REST endpoints and 350+ MongoDB schemas, and a Next.js frontend with 130+ pages on a shared component library.",
        "Built event-driven processing on BullMQ and Redis: 35+ queue processors and 100+ scheduled jobs, with separate API and worker processes, idempotent jobs, retries and a dead-letter store.",
        "Designed multi-tenant data separation with company-scoped queries, shared tenant helpers and guards, plus JWT authentication, RBAC generated from one permission registry, plan-based access, API keys and audit logging.",
        "Replaced per-worker send limits with one shared Redis budget after concurrent jobs multiplied past a provider's rate limits, and spread scheduled jobs with jitter so campaigns no longer fire in one burst.",
        "Built the AI layer: an MCP server exposing 268 permission-checked tools to AI agents, routing across Claude, OpenAI and Gemini, a team of AI agents for every user, and per-customer usage metering.",
        "Integrated Stripe (verified webhooks), Twilio voice and SMS, Retell AI, SendGrid, AWS SES, Google and Microsoft calendars and Meta, and shipped real-time features on Socket.IO with a Redis adapter.",
        "Wrote requirements, design documents and acceptance criteria; ran UAT, migrations and go-live for 10+ client implementations, and led a team of 5+ developers, 3 QA engineers and 2 business analysts.",
        "Ran production on Docker and Linux with GitHub Actions deployments and automated tests, and delivered a MedusaJS headless store and React Native apps for clients.",
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
      bullets: ["Built responsive React sites for e-commerce and small business clients, and added functionality to C# business applications on .NET Core and ASP.NET MVC."],
    },
  ],
  skills: [
    ["Backend", "TypeScript, Node.js, NestJS, Express, REST, GraphQL (Apollo/Yoga), Socket.IO, BullMQ, Mongoose"],
    ["Frontend & Mobile", "React, Next.js (App Router), React Native, React Query, Zustand, Redux Toolkit, Tailwind CSS"],
    ["Data & DevOps", "MongoDB, PostgreSQL, MySQL, Redis, Docker, GitHub Actions, AWS (S3, SES), DigitalOcean, Vercel"],
    ["AI & Blockchain", "MCP, tool calling, Claude, OpenAI, Gemini, Vercel AI SDK, Casper Network, Rust (basic)"],
    ["Architecture", "Multi-tenant SaaS, RBAC, event-driven design, job queues, rate limiting, webhooks, horizontal scaling"],
    ["Leadership", "Technical architecture, business analysis, requirements gathering, project management, Agile/Scrum"],
  ],
  education: [
    ["BSc in Computer Science, Virtual University of Pakistan, Lahore", "2016 – 2020"],
    ["MERN Stack Development Cohort, Gaper and Generation International, Lahore", "2021"],
  ],
  languages: "English (professional), Urdu (native)",
} as const;
