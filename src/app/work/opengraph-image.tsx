import { ogImage, ogSize } from "@/lib/og";

export const alt = "Kirman Shahab: work";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "work", title: "Case studies: how the systems were built." });
}
