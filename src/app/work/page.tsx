import type { Metadata } from "next";
import { work } from "#content";
import { CaseCard } from "@/components/case-card";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies from three years leading a multi-tenant CRM, plus headless commerce, blockchain and React Native.",
  alternates: { canonical: "/work" },
};

export default function WorkIndex() {
  const items = [...work].sort((a, b) => a.order - b.order);
  return (
    <div className="container-page">
      <PageHeader
        eyebrow="Work"
        title="Case studies"
        lead="How the systems were built, what I decided, and what broke along the way. The code is private, so the diagrams are generic and any code is written fresh to illustrate a pattern."
      />
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((w, i) => (
          <li key={w.slug} data-reveal style={{ "--i": i } as React.CSSProperties}>
            <CaseCard item={w} />
          </li>
        ))}
      </ul>
    </div>
  );
}
