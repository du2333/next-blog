import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const postData: Prisma.PostCreateInput[] = [
  {
    title: "My second post",
    tags: {
      create: [
        {
          tag: {
            connectOrCreate: {
              where: { name: "技术" },
              create: { name: "技术" },
            },
          },
        },
      ],
    },
    content: "This is my second post.",
    slug: "my-second-post",
  },
  {
    title: "My third post",
    tags: {
      create: [
        {
          tag: {
            connectOrCreate: {
              where: { name: "生活" },
              create: { name: "生活" },
            },
          },
        },
      ],
    },
    content: "This is my third post.",
    slug: "my-third-post",
  },
  {
    title: "My fourth post",
    tags: {
      create: [
        {
          tag: {
            connectOrCreate: {
              where: { name: "健康" },
              create: { name: "健康" },
            },
          },
        },
      ],
    },
    content: "This is my fourth post.",
    slug: "my-fourth-post",
  },
  {
    title: "My fifth post",
    tags: {
      create: [
        {
          tag: {
            connectOrCreate: {
              where: { name: "科技" },
              create: { name: "科技" },
            },
          },
        },
      ],
    },
    content: "This is my fifth post.",
    slug: "my-fifth-post",
  },
];

export async function main() {
  for (const p of postData) {
    await prisma.post.create({ data: p });
  }
}

main();
