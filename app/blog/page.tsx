import { createMetadata } from "@/lib/metadata";
import { Card } from "./card";
import { blogPosts } from "@/lib/content";

export const metadata = createMetadata({
  title: "Blog",
  description: "My precious thoughts and inspirations.",
});

export default function Page() {
  return (
    <main>
      <h1 className="font-semibold text-xl mb-2">Blog</h1>
      <p className="text-sm text-neutral-400 mb-4">My precious thoughts and inspirations.</p>
      <div className="flex flex-col gap-2">
        {blogPosts
          .list()
          .toSorted(
            (a, b) => b.compiled.frontmatter.date.getTime() - a.compiled.frontmatter.date.getTime(),
          )
          .map((d) => (
            <Card key={d.id} slug={d.slug} {...d.compiled.frontmatter} />
          ))}
      </div>
      <div className="flex flex-row text-sm flex-wrap gap-4 justify-between mt-8">
        <p className="text-neutral-400">
          <i>"I know that I know nothing"</i> - Socrates
        </p>
        <a
          href="/rss.xml"
          target="_blank"
          rel="noreferrer noopener"
          className="text-neutral-100 transition-colors hover:text-neutral-300"
        >
          RSS
        </a>
      </div>
    </main>
  );
}
