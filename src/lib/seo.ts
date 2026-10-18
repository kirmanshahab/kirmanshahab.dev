import { createElement } from "react";
import { site } from "@/site.config";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    email: `mailto:${site.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
    sameAs: [site.github, site.linkedin],
    knowsAbout: ["TypeScript", "Node.js", "NestJS", "Next.js", "Multi-tenant SaaS", "BullMQ", "Redis", "Model Context Protocol"],
  };
}

export function articleJsonLd(a: { title: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    url: new URL(a.url, site.url).toString(),
    author: { "@type": "Person", name: site.name, url: site.url },
  };
}

/** Renders a JSON-LD script. `<` is escaped so content can never close the tag. */
export function JsonLd({ data }: { data: object }) {
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, "\\u003c") },
  });
}
