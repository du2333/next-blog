import { renderMarkdown } from "@/lib/renderMarkdown";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";
import { getSortedPosts } from "@/lib/posts";

// 在build时生成所有post的静态页面
export async function generateStaticParams() {
    const posts = await getSortedPosts();
    return posts.map(post => ({
        slug: post.fileName.replace(/\.md$/, "")    
    }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(decodeURIComponent(slug));

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