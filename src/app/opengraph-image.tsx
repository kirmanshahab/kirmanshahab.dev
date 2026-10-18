import { ogImage, ogSize } from "@/lib/og";

export const alt = "Kirman Shahab, Senior Full Stack Engineer";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "kirmanshahab.dev", title: "I build the hard parts of SaaS." });
}
