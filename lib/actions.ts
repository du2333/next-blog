"use server";

import prisma from "@/lib/prisma";

export async function getPosts() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
}

export async function getUsers() {
  const users = await prisma.user.findMany();
  return users;
}

