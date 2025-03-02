import Link from "next/link";
import { getSortedPosts } from "@/lib/posts";
import DeleteButton from "@/components/DeleteButton";
import LogOutButton from "@/components/LogOutButton";
import { getCurrentUser } from "@/lib/currentUser";
import ToggleButton from "@/components/ToggleButton";

export default async function AdminPage() {
  const posts = await getSortedPosts();

  const user = await getCurrentUser({ redirectIfNotFound: false });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center">
        {user && (
          <h2 className="text-base-content text-lg">
            Welcome, {user.id} and {user.role}
          </h2>
        )}
        <ToggleButton />
        <LogOutButton />
      </div>
      <h1 className="text-2xl font-bold mb-6 text-base-content">文章管理</h1>
      <div className="mb-4">
        <Link
          href="/admin/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          新建文章
        </Link>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.fileName}
            className="border p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{post.fileName}</p>
              </div>
              <p className="text-sm text-gray-500 mt-1">{post.preview}</p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/edit/${post.fileName.replace(/\.md$/, "")}`}
                className="text-blue-500 hover:underline"
              >
                编辑
              </Link>
              <DeleteButton fileName={post.fileName} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
