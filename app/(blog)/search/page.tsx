import Search from "@/components/Search";
import PostListSkeleton from "@/components/skeletons/PostListSkeleton";
import PostList from "@/components/PostList";
import Pagination from "@/components/Pagination";

import { getTotalPages } from "@/lib/actions";
import { Suspense } from "react";

export default async function SearchPage(props: {
  searchParams?: Promise<{
    q: string;
    page: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const q = searchParams?.q || "";
  const page = Number(searchParams?.page) || 1;

  const totalPages = await getTotalPages(q);

  return (
    <section className="w-full min-h-screen">
      <Search />
      <Suspense fallback={<PostListSkeleton />}>
        <PostList query={q} currentPage={Number(page)} />
      </Suspense>
      <div className="flex justify-center mt-4">
        <Pagination totalPages={totalPages} />
      </div>
    </section>
  );
}
