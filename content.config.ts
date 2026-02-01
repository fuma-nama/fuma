import { defineConfig } from "fuma-content/config";
import { mdxCollection } from "fuma-content/collections/mdx";
import rehypeShiki from "@shikijs/rehype";
import remarkGfm from "remark-gfm";
import remarkHeadingId from "remark-heading-id";
import { z } from "zod";

export default defineConfig({
  collections: {
    blog: mdxCollection({
      dir: "content",
      frontmatter: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
      }),
      options: () => ({
        remarkPlugins: [remarkGfm, [remarkHeadingId, { defaults: true }]],
        rehypePlugins: [[rehypeShiki, { theme: "github-dark" }]],
      }),
    }),
  },
});
