"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "./currentUser";
import { cookies } from "next/headers";
import { updateSessionDb } from "./session";

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

export async function toggleRole() {
  const user = await getCurrentUser({ redirectIfNotFound: true });

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { role: user.role === "ADMIN" ? "EDITOR" : "ADMIN" },
  });

  await updateSessionDb(updatedUser, await cookies());
}