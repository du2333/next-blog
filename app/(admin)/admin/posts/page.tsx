import PostTable from "@/components/admin/post-table";
import { getFilteredPosts } from "@/lib/actions";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default async function PostsPage() {
  const posts = await getFilteredPosts('', 1);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Posts</h1>
          <p className="text-sm text-foreground/50">
            Manage your posts here.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">New Post</Link>
        </Button>
      </div>
      <PostTable posts={posts} />
    </section>
  );
}
