import { markdownRenderer } from "@/lib/MarkdownRenderer";
import { getPosts, getPostBySlug } from "@/lib/actions";
import ErrorCard from "@/components/ErrorCard";

// 在build时生成所有post的静态页面
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(decodeURIComponent(slug));

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ErrorCard error="Post not found" />
      </div>
    );
  }

  const { content: htmlContent } = await markdownRenderer(post.content);

  return (
    <article className="prose text-base-content min-h-screen">
      <div className="flex flex-col items-center">
        <h1>{post.title}</h1>
        <p className="text-neutral-content">Last updated: {post.updatedAt.toLocaleDateString()}</p>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </article>
  );
}
