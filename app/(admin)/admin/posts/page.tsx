// "use client";

import PostTable from "@/components/admin/post-table";
import { getFilteredPosts } from "@/lib/actions";
import Link from "next/link";
// import { useState } from "react";
// import { Post } from "@prisma/client";

export default async function PostsPage() {
  // const [posts, setPosts] = useState<Post[]>([]);
  const posts = await getFilteredPosts('', 1);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Posts</h1>
          <p className="text-sm text-base-content/50">
            Manage your posts here.
          </p>
        </div>
        <Link href="/admin/posts/new" className="btn btn-primary">New Post</Link>
      </div>
      <PostTable posts={posts} />
    </section>
  );
}
