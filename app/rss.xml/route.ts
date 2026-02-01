import { Feed } from "feed";
import { blog } from "content/blog";
import { NextResponse } from "next/server";

export const revalidate = false;

export function GET() {
  const feed = createFeed();

  return new NextResponse(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

function createFeed(): Feed {
  const site_url = "https://fuma-nama.vercel.app";

  const feed = new Feed({
    id: "fuma-nama",
    title: "Fuma Nama",
    description: "Fuma Nama's blog",
    language: "en",
    copyright: `All rights reserved ${new Date().getFullYear()}, Fuma Nama`,
    image: `${site_url}/banner.png`,
    link: site_url,
  });

  for (const post of blog.list()) {
    const frontmatter = post.compiled.frontmatter
    feed.addItem({
      id: post.id,
      link: `${site_url}/blog/${post.id}`,
      title: frontmatter.title,
      description: frontmatter.description,
      author: [{ name: "Fuma Nama" }],
      date: frontmatter.date,
    });
  }

  return feed;
}
