import Link from "next/link";
import { getAllTags } from "@/lib/posts";

export default async function TagCloud() {
  const tags = await getAllTags();

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">热门标签</h3>
      <div className="flex flex-wrap gap-2">
        {Object.entries(tags).map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="px-3 py-1 bg-gray-200 rounded-full text-sm hover:bg-gray-300 transition-colors"
          >
            {tag} ({count})
          </Link>
        ))}
      </div>
    </div>
  );
}
