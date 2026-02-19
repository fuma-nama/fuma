import { blog } from "content/blog";
import path from "node:path";

export const blogPosts = blog.transform((id, item) => [id, { ...item, slug: idToSlug(item.id) }]);

export function idToSlug(id: string) {
  return path.basename(id, path.extname(id));
}
