import path from "path";
import fs from "fs";
import matter from "gray-matter";

export function getExamplePosts() {
    const files = fs.readdirSync(path.join(process.cwd(), "/example_posts"));

    return files.map((file: string) => {
        const filePath = path.join(process.cwd(), "/example_posts", file);
        const fileContent = fs.readFileSync(filePath, "utf8");

        const { data, content } = matter(fileContent);

        return {
            title: data.title,
            date: data.date,
            content: content,
        };
    });
}
