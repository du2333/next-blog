import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getSortedPosts() {
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
                metadata: data, // 将元数据存储在 metadata 属性中
                content, // 直接存储内容
                date: new Date(data.date), // 解析日期
            };
        });

    // 按日期排序
    return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getAllCategories() {
    const posts = getSortedPosts();
    const categories = new Set<string>();

    posts.forEach(post => {
        if (post.metadata.category) {
            categories.add(post.metadata.category);
        }
    });

    return Array.from(categories);
}
