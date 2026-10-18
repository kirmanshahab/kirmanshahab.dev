import { ogImage, ogSize } from "@/lib/og";

export const alt = "Kirman Shahab: resume";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "resume", title: "Resume" });
}
