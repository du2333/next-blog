"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "./currentUser";
import { cookies } from "next/headers";
import { updateSessionDb } from "./session";
import { PostStatus } from "@prisma/client";

const ITEMS_PER_PAGE = 10;

// post CRUD
export async function getFilteredPosts(
  query: string,
  currentPage: number,
  status?: PostStatus
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const posts = await prisma.post.findMany({
    where: {
      ...(status && { status }),
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: query,
            mode: "insensitive",
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

export async function getPostsByTag(
  tag: string,
  currentPage: number,
  status?: PostStatus
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const posts = await prisma.post.findMany({
    where: {
      tags: { some: { tag: { name: tag } } },
      ...(status && { status }),
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: offset,
    take: ITEMS_PER_PAGE,
  });
  return posts;
}

export async function getPostBySlug(slug: string, status?: PostStatus) {
  const post = await prisma.post.findUnique({
    where: { slug, ...(status && { status }) },
  });
  return post;
}

export async function getTotalPages(query: string, status?: PostStatus) {
  const total = await prisma.post.count({
    where: {
      ...(status && { status }),
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

export async function getTotalPagesByTag(tag: string, status?: PostStatus) {
  const total = await prisma.post.count({
    where: {
      tags: { some: { tag: { name: tag } } },
      ...(status && { status }),
    },
  });
  return Math.ceil(total / ITEMS_PER_PAGE);
}

export async function getAllTags(status?: PostStatus) {
  const tags = await prisma.tag.findMany({
    where: {
      posts: {
        some: {
          post: {
            ...(status && { status }),
          },
        },
      },
    },
    include: {
      posts: true,
    },
  });
  return tags;
}

export async function getAllSlugs(status?: PostStatus) {
  const slugs = await prisma.post.findMany({
    where: {
      ...(status && { status }),
    },
    select: {
      slug: true,
    },
  });
  return slugs.map((slug) => slug.slug);
}

export async function getTagsByPostId(postId: string) {
  const tags = await prisma.tag.findMany({
    where: {
      posts: { some: { postId } },
    },
  });
  return tags;
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
