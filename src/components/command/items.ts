import { work } from "#content";
import { nav, site } from "@/site.config";

export type CommandLink = { group: "Pages" | "Case studies" | "Elsewhere"; label: string; href: string; hint?: string; external?: boolean };

/** Built on the server and passed to the palette as plain props (no MDX bodies in the client bundle). */
export function commandLinks(): CommandLink[] {
  return [
    { group: "Pages", label: "Home", href: "/" },
    ...nav.map((n) => ({ group: "Pages" as const, label: n.label, href: n.href })),
    { group: "Pages", label: "Recruiter TL;DR", href: "/recruiter", hint: "one screen" },
    ...[...work]
      .sort((a, b) => a.order - b.order)
      .map((w) => ({ group: "Case studies" as const, label: w.title, href: w.url })),
    { group: "Elsewhere", label: "GitHub", href: site.github, external: true },
    { group: "Elsewhere", label: "LinkedIn", href: site.linkedin, external: true },
  ];
}
