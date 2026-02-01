import { blog } from "content/blog";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Date } from "./page.client";
import { createMetadata } from "@/lib/metadata";
import { HTMLAttributes, type AnchorHTMLAttributes } from "react";
import dynamic from "next/dynamic";

const CommentsWithAuth = dynamic(() => import("./comment").then((res) => res.CommentsWithAuth));

function MDXLink({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) return <a {...props} />;

  const isExternal = href.startsWith("https://") || href.startsWith("http://");

  if (isExternal) {
    return <a href={href} target="_blank" rel="noreferrer noopener" {...props} />;
  }

  return <Link href={href} {...props} />;
}

const headingTypes = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

function Heading({
  as: As,
  ...props
}: { as: (typeof headingTypes)[number] } & HTMLAttributes<HTMLHeadingElement>) {
  if (props.id)
    return (
      <a href={`#${props.id}`} className="no-underline group">
        <As {...props}>
          <span className="absolute -ml-4 mt-0.5 text-neutral-500 text-base opacity-0 transition-opacity group-hover:opacity-100">
            #
          </span>
          {props.children}
        </As>
      </a>
    );

  return <As {...props}>{props.children}</As>;
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const document = blog.get(id);
  if (!document) notFound();
  const Body = document.compiled.default;

  return (
    <>
      <article className="prose prose-sm prose-invert text-neutral-300 prose-li:marker:text-neutral-300">
        <Body
          components={{
            a: MDXLink,
            img: (props) => <img className="rounded-xl" {...props} />,
            ...Object.fromEntries(
              headingTypes.map((type) => [
                type,
                (props: HTMLAttributes<HTMLHeadingElement>) => <Heading as={type} {...props} />,
              ]),
            ),
            pre: ({ className, style: _style, ...props }) => (
              <pre
                className={cn(
                  "text-sm p-2 bg-neutral-900 border border-neutral-800 rounded-lg max-h-[500px] overflow-auto",
                  className,
                )}
                {...props}
              >
                {props.children}
              </pre>
            ),
          }}
        />
      </article>
      <p className="mt-8 text-sm">
        <span className="font-medium mr-1">Last Updated:</span>
        <Date className="text-neutral-400" value={document.compiled.frontmatter.date} />
      </p>
      <footer className="flex flex-row items-end justify-between bg-neutral-900 border border-neutral-800 rounded-xl p-4 mt-4">
        <div>
          <p className="text-sm font-medium text">Fuma Nama</p>
          <p className="text-sm text-neutral-400">An open-sourcerer.</p>
        </div>
        <Link
          href="/blog"
          className="text-xs rounded-md px-2 py-1.5 border border-neutral-700 bg-neutral-800 font-medium transition-colors hover:bg-neutral-700"
        >
          Back to blog
        </Link>
      </footer>
      <CommentsWithAuth page={id} />
    </>
  );
}

export function generateStaticParams() {
  return blog.list().map((d) => ({
    id: d.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const document = blog.get(id);
  if (!document) notFound();

  const frontmatter = document.compiled.frontmatter;
  return createMetadata({
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      type: "article",
      authors: "Fuma Nama",
      modifiedTime: frontmatter.date.toISOString(),
    },
  });
}
