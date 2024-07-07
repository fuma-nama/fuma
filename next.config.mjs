// @ts-check
import { withContent } from "@fuma-content/next";
import rehypeShiki from "@shikijs/rehype";
import remarkGfm from "remark-gfm";

export default withContent({
  content: {
    files: ["./content/**/*"],
    outputDir: "./.content",
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      // @ts-expect-error
      rehypePlugins: [[rehypeShiki, { theme: "github-dark" }]],
    },
  },
});
