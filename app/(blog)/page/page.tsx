import Pagination from "@/components/Pagination";
import PostList from "@/components/PostList";
import PostListSkeleton from "@/components/skeletons/PostListSkeleton";
import { getTotalPages } from "@/lib/actions";
import { Suspense } from "react";

export default async function Home(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getTotalPages("");

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
