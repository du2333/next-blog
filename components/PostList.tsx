import PostItem from "./PostItem";
import { getFilteredPosts, getPostsByTag } from "@/lib/actions";
import ErrorCard from "./ErrorCard";
export default async function PostList({
  query,
  currentPage,
  isTagPage = false,
}: {
  query?: string;
  currentPage: number;
  isTagPage?: boolean;
}) {
  const posts = await (isTagPage
    ? getPostsByTag(query || "", currentPage)
    : getFilteredPosts(query || "", currentPage));

  if (posts.length === 0) {
    return <ErrorCard error={` No posts found with ${query}`} />;
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
