import { Post } from "@/lib/interfaces";

export default function PostItem({ post }: { post: Post }) {
    return (
        <>
            <div className="flex justify-between">
                <div className="text-xl font-bold text-gray-800 hover:text-gray-600">{post.title}</div>
                <div className="text-sm text-gray-500">
                    {post.date.toLocaleDateString()}
                </div>
            </div>
            <div className="text-sm text-gray-500">
                {post.preview}
            </div>
        </>
    );
};