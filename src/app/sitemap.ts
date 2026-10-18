import type { MetadataRoute } from "next";
import { work } from "#content";
import { site } from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/work", "/about", "/resume", "/contact"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const studies = work.map((w) => ({ url: `${site.url}${w.url}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 }));
  return [...pages, ...studies];
}
