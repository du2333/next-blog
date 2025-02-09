import { getPostsBySearch } from '@/lib/posts';
import Link from 'next/link';

export default async function Results({ query }: { query: string }) {
    if (!query.trim()) return null;

    const results = await getPostsBySearch(query);

    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">搜索结果 ({results.length} 篇)</h2>
            <div className="grid gap-4">
                {results.map(post => (
                    <Link
                        key={post.fileName}
                        href={`/post/${post.fileName.replace(/\.md$/, "")}`}
                        className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                        <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                        <p className="text-gray-600 mt-2">{post.preview}</p>
                        <div className="mt-3 text-sm text-gray-500">
                            {post.date.toLocaleDateString()}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
