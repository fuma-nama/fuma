import { resolve } from "node:url";
import { MetadataRoute } from "next";
import { baseUrl } from "@/lib/metadata";
import { blogPosts } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const getUrl = (v: string) => resolve(baseUrl, v);

  return [
    {
      url: getUrl("/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: getUrl("/projects"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: getUrl("/blog"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...blogPosts.list().map<MetadataRoute.Sitemap[number]>((d) => ({
      url: getUrl(`/blog/${d.slug}`),
      lastModified: d.compiled.frontmatter.date,
      changeFrequency: "weekly",
      priority: 0.5,
    })),
  ];
}
