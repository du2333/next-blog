import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export async function renderMarkdown(filePath: string) {
    const fullPath = path.join(process.cwd(), filePath);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContent);

    const processedContent = await remark()
        .use(html) // 转换为 HTML
        .process(content);

    const htmlContent = processedContent.toString();

    return {
        metadata: data,
        content: htmlContent,
    };
} 