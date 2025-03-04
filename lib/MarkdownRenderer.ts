import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export async function markdownRenderer(markdownContent: string) {
  const { data, content } = matter(markdownContent);

  const processedContent = await remark()
    .use(html)
    .process(content);

  const htmlContent = processedContent.toString();

  return {
    metadata: data,
    content: htmlContent,
  };
}
