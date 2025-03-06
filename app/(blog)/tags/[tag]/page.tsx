import Pagination from "@/components/Pagination";
import PostList from "@/components/PostList";
import PostListSkeleton from "@/components/skeletons/PostListSkeleton";

import { getTotalPagesByTag } from "@/lib/actions";
import { Suspense } from "react";
import { PostStatus } from "@prisma/client";

type Params = { tag: string };
type searchParams = { page: string };

export default async function TagPage(props: {
  params: Promise<Params>;
  searchParams?: Promise<searchParams>;
}) {
  const { tag } = await props.params;
  const { page } = await props.searchParams || { page: "1" };

  const decodedTag = decodeURIComponent(tag);

  const currentPage = Number(page) || 1;
  const totalPages = await getTotalPagesByTag(decodedTag, PostStatus.PUBLISHED);

  return (
    <section className="w-full min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-base-content">
        标签: {decodedTag}
      </h1>
      <Suspense fallback={<PostListSkeleton />}>
        <PostList query={decodedTag} currentPage={currentPage} isTagPage={true} />
      </Suspense>
      <div className="flex justify-center mt-4">
        <Pagination totalPages={totalPages} />
      </div>
    </section>
  );
}
