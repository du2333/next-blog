import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-foreground/50">
        The page you are looking for does not exist.
      </p>
      <Link href="/" className="underline underline-offset-4">
        Go to Home
      </Link>
    </div>
  );
}
