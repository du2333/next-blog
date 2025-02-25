import Link from "next/link";
import { getAllTags } from "@/lib/posts";

export default async function TagCloud() {
  const tags = await getAllTags();

  return (
    <div className="space-y-2">
      <h3 className="text-base-content font-semibold">热门标签</h3>
      <div className="flex flex-wrap gap-2">
        {Object.entries(tags).map(([tag, count]) => (
          <button className="btn btn-sm btn-outline" key={tag}>
            <Link href={`/tags/${encodeURIComponent(tag)}`}>
              {tag} ({count})
            </Link>
          </button>
        ))}
      </div>
    </div>
  );
}
