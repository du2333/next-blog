import { getSortedPosts } from "@/lib/posts";
import Link from "next/link";
import PostItem from "@/components/PostItem";

export default function Home() {
  const posts = getSortedPosts();
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-4">My Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.fileName} className="list-none bg-white p-4 rounded-md mb-4">
            <Link href={`/post/${post.fileName.replace(/\.md$/, "")}`}>
              <PostItem post={post} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
