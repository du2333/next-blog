"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "./currentUser";
import { cookies } from "next/headers";
import { updateSessionDb } from "./session";

const ITEMS_PER_PAGE = 10;

// post CRUD
export async function getFilteredPosts(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const posts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
          },
        },
        {
          content: {
            contains: query,
          },
        },
        {
          tags: {
            some: {
              tag: {
                name: {
                  contains: query,
                },
              },
            },
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: offset,
    take: ITEMS_PER_PAGE,
  });

  return posts;
}

export async function getPostsByTag(tag: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const posts = await prisma.post.findMany({
    where: {
      tags: { some: { tag: { name: tag } } },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: offset,
    take: ITEMS_PER_PAGE,
  });
  return posts;
}

export async function getPostBySlug(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug },
  });
  return post;
}

export async function getTotalPages(query: string) {
  const total = await prisma.post.count({
    where: {
      OR: [
        {
          title: {
            contains: query,
          },
        },
        {
          content: {
            contains: query,
          },
        },
        {
          tags: {
            some: {
              tag: {
                name: {
                  contains: query,
                },
              },
            },
          },
        },
      ],
    },
  });
  return Math.ceil(total / ITEMS_PER_PAGE);
}

export async function getTotalPagesByTag(tag: string) {
  const total = await prisma.post.count({
    where: {
      tags: { some: { tag: { name: tag } } },
    },
  });
  return Math.ceil(total / ITEMS_PER_PAGE);
}

export async function getAllTags() {
  const tags = await prisma.tag.findMany({
    include: {
      posts: true,
    },
  });
  return tags;
}

export async function getAllSlugs() {
  const slugs = await prisma.post.findMany({
    select: {
      slug: true,
    },
  });
  return slugs.map((slug) => slug.slug);
}

// authentication related
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
