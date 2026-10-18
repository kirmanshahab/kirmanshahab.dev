import { work } from "#content";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "Case study by Kirman Shahab";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = work.find((w) => w.slug === slug);
  return ogImage({ eyebrow: "Case study", title: item?.title ?? "Case study", footer: item ? `${item.period} · ${item.role}` : undefined });
}
