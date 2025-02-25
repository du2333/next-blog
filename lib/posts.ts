"use server";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/lib/definitions";

const postsDirectory = path.join(process.cwd(), "example_posts");

export async function getSortedPosts(): Promise<Post[]> {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md")) // 只获取 .md 文件
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContent = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContent); // 解析元数据和内容
      return {
        fileName,
        content,
        title: data.title,
        date: data.date,
        preview: content.slice(0, 100) + "...",
        tags: data.tags || [],
      };
    });

  // 按日期排序
  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}

// 新增获取所有标签的函数
export async function getAllTags(): Promise<Record<string, number>> {
  const posts = await getSortedPosts();
  const tagCount: Record<string, number> = {};

  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  return tagCount;
}

export async function createPost({
  title,
  content,
  tags,
}: {
  title: string;
  content: string;
  tags?: string[];
}) {
  const fileName = `${Date.now()}-${title.toLowerCase()}.md`;
  const filePath = path.join(postsDirectory, fileName);

  const frontmatter = `---\ntitle: ${title}\ndate: ${new Date().toISOString()}\ntags: [${tags?.join(
    ","
  )}]\n---\n\n`;
  fs.writeFileSync(filePath, frontmatter + content);

  return fileName;
}

export async function deletePost(fileName: string) {
  try {
    const filePath = path.join(postsDirectory, fileName);
    fs.unlinkSync(filePath);
    return { success: "文章删除成功" };
  } catch (error) {
    console.error(error);
    return { error: `删除文章失败` };
  }
}

export async function updatePost(
  originalFileName: string,
  { title, content, tags }: { title: string; content: string; tags?: string[] }
) {
  const newFileName = `${Date.now()}-${title.toLowerCase()}.md`;
  const oldPath = path.join(postsDirectory, originalFileName);
  const newPath = path.join(postsDirectory, newFileName);

  const frontmatter = `---\ntitle: ${title}\ndate: ${new Date().toISOString()}\ntags: [${tags?.join(
    ","
  )}]\n---\n\n`;
  const updatedContent = frontmatter + `\n${content}`;

  fs.writeFileSync(newPath, updatedContent);
  fs.unlinkSync(oldPath);

  return newFileName;
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getSortedPosts();
  return posts.filter((post) => post.tags?.includes(tag));
}

export async function getPostsBySearch(query: string): Promise<Post[]> {
  // intentionally slow down the search
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const posts = await getSortedPosts();
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
  );
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getSortedPosts();
  return posts.find((post) => post.fileName.replace(/\.md$/, "") === slug);
}
