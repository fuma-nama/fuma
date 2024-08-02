import { Feed } from "feed";
import { documents } from "../source";
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

  for (const post of documents) {
    feed.addItem({
      id: post.id,
      link: `${site_url}/blog/${post.id}`,
      title: post.info.title,
      description: post.info.description,
      author: [{ name: "Fuma Nama" }],
      date: post.info.date,
    });
  }

  return feed;
}
