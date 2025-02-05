import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/lib/interfaces";

export function getSortedPosts(): Post[] {
    const directoryPath = path.join(process.cwd(), "example_posts");
    const fileNames = fs.readdirSync(directoryPath);

    const posts = fileNames
        .filter(fileName => fileName.endsWith(".md")) // 只获取 .md 文件
        .map(fileName => {
            const fullPath = path.join(directoryPath, fileName);
            const fileContent = fs.readFileSync(fullPath, "utf8");
            const { data, content } = matter(fileContent); // 解析元数据和内容
            return {
                fileName,
                content,
                title: data.title,
                date: data.date,
                preview: content.slice(0, 100) + "..."
            };
        });

    // 按日期排序
    return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}

