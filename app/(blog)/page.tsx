import Pagination from "@/components/Pagination";
import PostList from "@/components/PostList";
import PostListSkeleton from "@/components/skeletons/PostListSkeleton";
import { getTotalPages } from "@/lib/actions";
import { Suspense } from "react";

// 静态生成第一页
export async function generateStaticParams() {
  return [
    {
      searchParams: {
        page: "1",
      },
    },
  ];
}

export const revalidate = 3600; // 每小时重新生成

export default async function Home(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getTotalPages('');

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
