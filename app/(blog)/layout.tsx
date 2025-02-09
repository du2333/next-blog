import "@/app/globals.css";
import TagCloud from "@/components/TagCloud";
import Link from "next/link";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8 flex gap-8">
          <main className="flex-1 min-w-0">
            <div className="flex items-center gap-4 mb-4">
              <Link
                href="/"
                className="text-2xl font-bold border-b-2 border-transparent hover:border-black transition-all duration-150"
              >
                主页
              </Link>
              <Link href="/search" className="text-2xl font-bold border-b-2 border-transparent hover:border-black transition-all duration-150">
                搜索
              </Link>
            </div>
            {children}
          </main>

          <aside className="w-64 hidden md:block">
            <div className="sticky top-8">
              <TagCloud />
            </div>
          </aside>
        </div>
      </body>
    </html>
  );
}
