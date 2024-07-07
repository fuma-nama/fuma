import { documents } from "@/app/source";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Date } from "./page.client";
import { createMetadata } from "@/lib/metadata";
import { HTMLAttributes, type AnchorHTMLAttributes } from "react";
import dynamic from "next/dynamic";

const CommentsWithAuth = dynamic(
  () => import("./comment").then((res) => res.CommentsWithAuth),
  {
    ssr: false,
  }
);

function MDXLink({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) return <a {...props} />;

  const isExternal = href.startsWith("https://") || href.startsWith("http://");

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" {...props} />
    );
  }

  return <Link href={href} {...props} />;
}

function Heading({
  as: As,
  ...props
}: { as: string } & HTMLAttributes<HTMLHeadingElement>) {
  return (
    <a
      href={props.id ? `#${props.id}` : undefined}
      className="relative group no-underline"
    >
      <span className="absolute -left-5 text-neutral-500 text-base h-full content-center opacity-0 transition-opacity group-hover:opacity-100">
        #
      </span>
      <As {...props}>{props.children}</As>
    </a>
  );
}

export default function Page({ params }: { params: { id: string } }) {
  const document = documents.find((d) => d.id === params.id);
  if (!document) notFound();

  return (
    <>
      <article className="prose prose-sm prose-invert text-neutral-400 prose-li:marker:text-neutral-300">
        <document.renderer
          components={{
            a: MDXLink,
            ...Object.fromEntries(
              ["h1", "h2", "h3", "h4", "h5", "h6"].map((type) => [
                type,
                (props: HTMLAttributes<HTMLHeadingElement>) => (
                  <Heading as={type} {...props} />
                ),
              ])
            ),
            pre: ({ className, style: _style, ...props }) => (
              <pre
                className={cn(
                  "text-sm p-2 bg-neutral-900 border border-neutral-800 rounded-lg max-h-[500px] overflow-auto",
                  className
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
        <Date className="text-neutral-400" value={document.info.date} />
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
      <CommentsWithAuth page={params.id} />
    </>
  );
}

export function generateStaticParams() {
  return documents.map((d) => ({
    id: d.id,
  }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const document = documents.find((d) => d.id === params.id);
  if (!document) notFound();

  return createMetadata({
    title: document.info.title,
    description: document.info.description,
    openGraph: {
      type: "article",
      authors: "Fuma Nama",
      modifiedTime: document.info.date.toISOString(),
    },
  });
}
