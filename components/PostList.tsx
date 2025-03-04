import PostItem from "./PostItem";
import { getFilteredPosts } from "@/lib/actions";

export default async function PostList({
  query,
  currentPage,
}: {
  query?: string;
  currentPage: number;
}) {
  const posts = await getFilteredPosts(query || '', currentPage);

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
