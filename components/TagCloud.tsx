import Link from "next/link";
import { getAllTags } from "@/lib/actions";
import { PostStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

export default async function TagCloud() {
  const tags = await getAllTags(PostStatus.PUBLISHED);

  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag.id} variant="secondary">
            <Link href={`/tags/${encodeURIComponent(tag.name)}`}>
              {tag.name} ({tag.posts.length})
            </Link>
          </Badge>
        ))}
      </div>
    </div>
  );
}
