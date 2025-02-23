import { getPostBySlug, updatePost } from "@/lib/posts";
import { notFound, redirect } from "next/navigation";

export default async function EditPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(decodeURIComponent(params.slug));

  if (!post) return notFound();

  async function updateAction(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tags = formData.get("tags") as string;
    if (!post) return;
    await updatePost(post.fileName, { title, content, tags: tags.split(",") });
    redirect("/admin");
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">编辑文章</h1>
      <form action={updateAction}>
        <input
          type="text"
          name="title"
          defaultValue={post.title}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <textarea
          name="content"
          defaultValue={post.content}
          className="w-full h-96 p-2 border rounded font-mono"
          required
        />
        <input
          type="text"
          name="tags"
          defaultValue={post.tags?.join(",")}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          保存更改
        </button>
      </form>
    </div>
  );
}
