import { ogImage, ogSize } from "@/lib/og";

export const alt = "Kirman Shahab: contact";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "contact", title: "Let’s talk." });
}
