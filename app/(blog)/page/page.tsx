import Pagination from "@/components/pagination";
import PostList from "@/components/post-list";
import PostListSkeleton from "@/components/skeletons/post-list-skeleton";
import { getTotalPages } from "@/lib/actions";
import { Suspense } from "react";
import { PostStatus } from "@prisma/client";

export default async function Home(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getTotalPages("", PostStatus.PUBLISHED);

  return (
    <section className="w-full min-h-screen">
      <Suspense fallback={<PostListSkeleton />}>
        <PostList currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </section>
  );
}
