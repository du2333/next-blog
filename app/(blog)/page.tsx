import Pagination from "@/components/Pagination";
import PostList from "@/components/PostList";
import PostListSkeleton from "@/components/skeletons/PostListSkeleton";
import { getTotalPages } from "@/lib/actions";
import { Suspense } from "react";
import { PostStatus } from "@prisma/client";

export const revalidate = 3600; // 每小时重新生成

export default async function Home() {
  const totalPages = await getTotalPages("", PostStatus.PUBLISHED);

  return (
    <section className="w-full min-h-screen">
      <Suspense fallback={<PostListSkeleton />}>
        <PostList currentPage={1} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Suspense>
          <Pagination totalPages={totalPages} customPathname="/page" />
        </Suspense>
      </div>
    </section>
  );
}
