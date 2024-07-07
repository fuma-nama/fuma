// @ts-check
import { withContent } from "@fuma-content/next";
import rehypeShiki from "@shikijs/rehype";
import remarkGfm from "remark-gfm";
import remarkHeadingId from "remark-heading-id";

export default withContent({
  content: {
    files: ["./content/**/*"],
    outputDir: "./.content",
    mdxOptions: {
      remarkPlugins: [remarkGfm, [remarkHeadingId, { defaults: true }]],
      // @ts-expect-error
      rehypePlugins: [[rehypeShiki, { theme: "github-dark" }]],
    },
  },
});
