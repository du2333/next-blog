import { Post } from "@prisma/client";
import { getTagsByPostId } from "@/lib/actions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PostTableProps {
  posts: Post[];
}

const columns = [
  {
    header: "Post Title",
  },
  {
    header: "Tags",
  },
  {
    header: "Status",
  },
  {
    header: "Created At",
  },
  {
    header: "Last Updated",
  },
];

export default function PostTable({ posts }: PostTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.header}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <PostTableRow key={post.id} post={post} />
        ))}
      </TableBody>
    </Table>
  );
}

async function PostTableRow({ post }: { post: Post }) {
  const tags = await getTagsByPostId(post.id);

  return (
    <TableRow>
      <TableCell>{post.title}</TableCell>
      <TableCell>{tags.map((tag) => tag.name).join(", ")}</TableCell>
      <TableCell>{post.status}</TableCell>
      <TableCell>{post.createdAt.toLocaleDateString()}</TableCell>
      <TableCell>{post.updatedAt.toLocaleDateString()}</TableCell>
    </TableRow>
  );
}
