import { markdownRenderer } from "@/lib/MarkdownRenderer";
import { getAllSlugs, getPostBySlug } from "@/lib/actions";
import { PostStatus } from "@prisma/client";
import { notFound } from "next/navigation";

// 在build时生成所有post的静态页面
export async function generateStaticParams() {
  const slugs = await getAllSlugs(PostStatus.PUBLISHED);
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(
    decodeURIComponent(slug),
    PostStatus.PUBLISHED
  );

  if (!post) {
    return notFound();
  }

  const { content: htmlContent } = await markdownRenderer(post.content);

  return (
    <article className="prose text-foreground min-h-screen mx-auto">
      <div className="flex flex-col items-center">
        <h1>{post.title}</h1>
        <p className="text-foreground/50">
          Last updated: {post.updatedAt.toLocaleDateString()}
        </p>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </article>
  );
}
