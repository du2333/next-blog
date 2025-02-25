import Link from "next/link";
import PostItem from "@/components/PostItem";
import Pagination from "@/components/Pagination";
import { getSortedPosts } from "@/lib/posts";
import { getPostsByPage, getTotalPages } from "@/lib/utils";

export default async function Home(props: {
  searchParams: Promise<{ page: string }>;
}) {
  const pageSize = 15;
  const allPosts = await getSortedPosts();
  const totalPages = await getTotalPages(allPosts, pageSize);
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;

  const posts = await getPostsByPage(allPosts, currentPage, pageSize);

  return (
    <div>
      <ul>
        {posts.length > 0 ? (
          posts.map((post) => (
            <li
              key={post.fileName}
              className="list-none mb-4"
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
