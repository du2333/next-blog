import Pagination from "@/components/pagination";
import PostList from "@/components/post-list";
import { getTotalPages } from "@/lib/actions";
import { Suspense } from "react";
import { PostStatus } from "@prisma/client";

import { Skeleton } from "@/components/ui/skeleton";

export default async function Home() {
  const totalPages = await getTotalPages("", PostStatus.PUBLISHED);

  return (
    <section className="w-full min-h-screen p-4">
      <Suspense fallback={<PostListSkeleton />}>
        <PostList currentPage={1} />
      </Suspense>
      {/* <PostListSkeleton /> */}
      {totalPages > 1 && (
        <div className="mt-5 flex w-full justify-center">
          <Suspense>
            <Pagination totalPages={totalPages} customPathname="/page" />
          </Suspense>
        </div>
      )}
    </section>
  );
}

function PostListSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Skeleton className="h-[278px]" />
      <Skeleton className="h-[278px]" />
      <Skeleton className="h-[278px]" />
      <Skeleton className="h-[278px]" />
      <Skeleton className="h-[278px]" />
      <Skeleton className="h-[278px]" />
      <Skeleton className="h-[278px]" />
    </div>
  );
}
