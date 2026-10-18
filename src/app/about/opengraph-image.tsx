import { ogImage, ogSize } from "@/lib/og";

export const alt = "Kirman Shahab: about";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "about", title: "The parts of software that have to keep working at 3 a.m." });
}
