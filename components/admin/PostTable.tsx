import { Post } from "@prisma/client";
import { getTagsByPostId } from "@/lib/actions";

interface PostTableProps {
  posts: Post[];
}

export default function PostTable({ posts }: PostTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Post Title</th>
            <th>Tags</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <TableRow key={post.id} post={post} />
          ))}
        </tbody>
      </table>
    </div>
  );
}


async function TableRow({ post }: { post: Post }) {
  const tags = await getTagsByPostId(post.id);
  
  return (
    <tr>
      <td>{post.title}</td>
      <td>{tags.map((tag) => tag.name).join(", ")}</td>
      <td>{post.status}</td>
      <td>{post.createdAt.toLocaleDateString()}</td>
      <td>{post.updatedAt.toLocaleDateString()}</td>
    </tr>
  );
}