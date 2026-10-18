import Link from "next/link";
import type { Route } from "next";

type Props = { id: string; eyebrow: string; title: string; href?: Route; linkLabel?: string };

export function SectionHeading({ id, eyebrow, title, href, linkLabel }: Props) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div className="grid gap-2">
        <p className="micro">{eyebrow}</p>
        <h2 id={id} className="text-h2">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="link shrink-0 text-small text-muted hover:text-ink">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
