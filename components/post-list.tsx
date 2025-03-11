import PostItem from "./post-item";
import { getFilteredPosts, getPostsByTag } from "@/lib/actions";
import { PostStatus } from "@prisma/client";

export default async function PostList({
  query,
  currentPage,
  isTagPage = false,
  isSearchPage = false,
}: {
  query?: string;
  currentPage: number;
  isTagPage?: boolean;
  isSearchPage?: boolean;
}) {
  if (isSearchPage && !query) {
    return null;
  }

  const posts = await (isTagPage
    ? getPostsByTag(query || "", currentPage, PostStatus.PUBLISHED)
    : getFilteredPosts(query || "", currentPage, PostStatus.PUBLISHED));

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
