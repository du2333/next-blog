import { Post } from "@/lib/definitions";

export async function getTotalPages(
  posts: Post[],
  pageSize: number = 5
): Promise<number> {
  return Math.ceil(posts.length / pageSize);
}

export async function getPostsByPage(
  posts: Post[],
  page: number,
  pageSize: number = 5
): Promise<Post[]> {
  return posts.slice((page - 1) * pageSize, page * pageSize);
}
