import Link from "next/link";
import { getAllTags } from "@/lib/actions";
import { PostStatus } from "@prisma/client";

export default async function TagCloud() {
  const tags = await getAllTags(PostStatus.PUBLISHED);

  return (
    <div className="space-y-2">
      <h3 className="text-base-content font-semibold">所有标签</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button className="btn btn-sm btn-outline" key={tag.id}>
            <Link href={`/tags/${encodeURIComponent(tag.name)}`}>
              {tag.name} ({tag.posts.length})
            </Link>
          </button>
        ))}
      </div>
    </div>
  );
}
