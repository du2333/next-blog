import { getSortedPosts } from "@/lib/posts";
import { renderMarkdown } from "@/lib/renderMarkdown";
import { notFound } from "next/navigation";

// 在build时生成所有post的静态页面
export async function generateStaticParams() {
    const posts = getSortedPosts();
    return posts.map(post => ({
        slug: post.fileName.replace(/\.md$/, ""), // 去掉 .md 扩展名
    }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const posts = getSortedPosts();
    const { slug } = await params;
    const post = posts.find(post => post.fileName.replace(/\.md$/, "") === slug);

    if (!post) {
        return notFound();
    }

    const { content } = await renderMarkdown(`example_posts/${post.fileName}`);

    return (
        <div>
            <div className="prose lg:prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
} 