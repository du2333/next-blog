import { Post } from "@/lib/definitions";

export default function PostItem({ post }: { post: Post }) {
  return (
    <div className="card bg-base-200 w-full shadow-xl">
      <div className="card-body text-base-content">
        <h2 className="card-title">{post.title}</h2>
        <p>{post.preview}</p>
        <p className="text-sm text-gray-500">{post.date.toLocaleDateString()}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Read More</button>
        </div>
      </div>
    </div>
  );
}
