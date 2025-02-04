import { getSortedPosts } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const posts = getSortedPosts();
  return (
    <div>
      <h1>My Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.fileName}>
            <Link href={`/post/${post.fileName.replace(/\.md$/, "")}`}>
              {post.metadata.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
