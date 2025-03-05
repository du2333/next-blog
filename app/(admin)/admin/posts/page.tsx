import PostTable from "@/components/admin/PostTable";

export default function PostsPage() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Posts</h1>
          <p className="text-sm text-base-content/50">
            Manage your posts here.
          </p>
        </div>
        <button className="btn btn-primary">New Post</button>
      </div>
      <PostTable />
    </section>
  );
}
