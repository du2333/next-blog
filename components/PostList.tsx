import PostItem from "./PostItem";
import { getFilteredPosts, getPostsByTag } from "@/lib/actions";
import ErrorCard from "./ErrorCard";
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
    ? getPostsByTag(query || "", currentPage)
    : getFilteredPosts(query || "", currentPage));

  const errorMessage = query
    ? `No posts found with ${query}`
    : "No posts found";

  if (posts.length === 0) {
    return <ErrorCard error={errorMessage} />;
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
