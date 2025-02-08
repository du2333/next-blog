import { Post } from "./interfaces";
import { getSortedPosts } from "./posts";

export function getTotalPages(posts: Post[], pageSize: number = 5): number {
    return Math.ceil(posts.length / pageSize);
}

export function getPostsByPage(posts: Post[], page: number, pageSize: number = 5): Post[] {
    return posts.slice((page - 1) * pageSize, page * pageSize);
}

export function getPostsByTag(tag: string): Post[] {
    const posts = getSortedPosts();
    return posts.filter(post => post.tags?.includes(tag));
}