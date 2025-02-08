import { getSortedPosts } from "@/lib/posts";
import { renderMarkdown } from "@/lib/renderMarkdown";
import { notFound } from "next/navigation";

// 在build时生成所有post的静态页面
export async function generateStaticParams() {
    const posts = await getSortedPosts();
    return posts.map(post => ({
        // slug: post.fileName.replace(/\.md$/, ""), // Replace spaces with hyphens
        slug: post.fileName.replace(/\.md$/, "")
    }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const posts = await getSortedPosts();
    const { slug } = await params;
    // const post = posts.find(post => post.fileName.replace(/\.md$/, "") === slug);
    const post = posts.find(post => post.fileName.replace(/\.md$/, "") === decodeURIComponent(slug));

    if (!post) {
        return notFound();
    }

    const { content } = await renderMarkdown(`example_posts/${post.fileName}`);

    return (
        <div>
            <div className="prose prose-slate lg:prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
} 