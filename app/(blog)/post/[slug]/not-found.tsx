import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-destructive">Post not found</h1>
      <Link href="/" className="underline underline-offset-4">
        Go to Home
      </Link>
    </div>
  );
}
