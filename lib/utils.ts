import { Post } from "./interfaces";
import { getSortedPosts } from "./posts";

export async function getTotalPages(posts: Post[], pageSize: number = 5): Promise<number> {
    return Math.ceil(posts.length / pageSize);
}

export async function getPostsByPage(posts: Post[], page: number, pageSize: number = 5): Promise<Post[]> {
    return posts.slice((page - 1) * pageSize, page * pageSize);
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
    const posts = await getSortedPosts();
    return posts.filter(post => post.tags?.includes(tag));
}

export async function getPostsBySearch(query: string): Promise<Post[]> {
    const posts = await getSortedPosts();
    return posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()) || post.content.toLowerCase().includes(query.toLowerCase()));
}