import { Post } from "@prisma/client";
import Link from "next/link";

export default function PostItem({ post }: { post: Post }) {
  return (
    <Link href={`/post/${post.slug}`}>
      <div className="card bg-base-200 w-full shadow-xl hover:bg-base-300 transition-all duration-300">
        <div className="card-body text-base-content">
          <h2 className="card-title">{post.title}</h2>
          <p className="text-sm text-gray-500">
            {post.updatedAt.toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
}
