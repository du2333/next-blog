import { Post } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { getTagsByPostId } from "@/lib/actions";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PostItem({ post }: { post: Post }) {
  const tags = await getTagsByPostId(post.id);

  return (
    <Link href={`/post/${post.slug}`} className="w-full">
      <Card>
        <CardHeader>
          <Image
            src="/img/post-cover.png"
            alt={post.title}
            width={600}
            height={400}
            className="w-full h-40 object-cover"
          />
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardFooter className="flex justify-between text-foreground/50">
          <p>{tags.map((tag) => `#${tag.name}`).join(" ")}</p>
          <p>{post.updatedAt.toLocaleDateString()}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
