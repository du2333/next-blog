import PostItem from "@/components/PostItem";
import { getPostsByTag } from "@/lib/posts";

import Link from "next/link";
import Pagination from "@/components/Pagination";
import { getPostsByPage, getTotalPages } from "@/lib/utils";

type Params = { tag: string };
type searchParams = { page: string };

export default async function TagPage(props: {
  params: Params;
  searchParams: searchParams;
}) {
  const { tag } = await props.params;
  const { page } = await props.searchParams;

  const allPosts = await getPostsByTag(tag);
  const totalPages = await getTotalPages(allPosts);
  const currentPage = Number(page) || 1;
  const posts = await getPostsByPage(allPosts, currentPage);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-base-content">标签: {tag}</h1>
      <ul className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <li
              key={post.fileName}
              className="list-nonemb-4"
            >
              <Link href={`/post/${post.fileName.replace(/\.md$/, "")}`}>
                <PostItem post={post} />
              </Link>
            </li>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-screen gap-4">
            <div className="text-2xl font-bold text-red-500">
              No posts found
            </div>
            <Link href="/" className="hover:underline">
              Go to Home
            </Link>
          </div>
        )}
      </ul>
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
