import { defineCollection, defineConfig, s } from "velite";

const work = defineCollection({
  name: "Work",
  pattern: "work/*.mdx",
  schema: s
    .object({
      slug: s.slug("work"),
      title: s.string().max(90),
      summary: s.string().max(220),
      period: s.string(),
      role: s.string(),
      order: s.number(),
      featured: s.boolean().default(false),
      status: s.enum(["published", "draft"]).default("draft"),
      tldr: s.array(s.string()).length(3),
      stack: s.array(s.string()),
      cover: s.string(),
      body: s.mdx(),
    })
    .transform((data) => ({ ...data, url: `/work/${data.slug}` })),
});

export default defineConfig({
  root: "content",
  output: { data: ".velite", assets: "public/static", base: "/static/", name: "[name]-[hash:6].[ext]", clean: true },
  collections: { work },
});
