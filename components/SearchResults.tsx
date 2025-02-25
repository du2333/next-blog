import { getPostsBySearch } from "@/lib/posts";
import PostItem from "@/components/PostItem";
import Link from "next/link";

export default async function Results({ query }: { query: string }) {
  if (!query.trim()) return null;

  const results = await getPostsBySearch(query);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-base-content">
        搜索结果 ({results.length} 篇)
      </h2>
      <ul>
        {results.map((post) => (
          <li key={post.fileName} className="mb-4">
            <Link
              href={`/post/${post.fileName.replace(/\.md$/, "")}`}
          >
              <PostItem post={post} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
