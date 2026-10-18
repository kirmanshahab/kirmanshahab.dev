// Every URL and identity detail lives here. Never add the phone number:
// it's on the resume PDF Kirman sends directly, never on the website.
export const site = {
  name: "Kirman Shahab",
  role: "Senior Full Stack Engineer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kirmanshahab.dev",
  positioning:
    "Senior full-stack engineer who builds the hard parts of SaaS: multi-tenant isolation, job queues that don’t melt, billing and metering, and AI agents that safely touch real customer data.",
  location: "Lahore, Pakistan",
  timezone: "UTC+5",
  availability: "Open to roles · remote / relocation",
  email: "kirmanshahab@gmail.com",
  github: "https://github.com/kirmanshahab",
  githubUser: "kirmanshahab",
  linkedin: "https://www.linkedin.com/in/kirman-shahab-369689203",
  cal: "https://cal.com/kirmanshahab", // placeholder until Kirman creates the account
  repo: "https://github.com/kirmanshahab/kirmanshahab.dev",
  resumePdf: "/kirman-shahab-resume.pdf",
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;
