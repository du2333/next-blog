import "@/app/globals.css";
import SearchModal from "@/components/SearchModal";
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
        <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8 justify-center">
          {/* 主内容区 */}
          <main className="max-w-3xl">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold hover:border-b-2 hover:border-black"
              >
                主页
              </Link>
              <SearchModal />
            </div>
            {children}
          </main>

          {/* 右侧边栏 */}
          <aside className="w-64 shrink-0 hidden md:block">
            <div className="sticky top-8">
              <TagCloud />
            </div>
          </aside>
        </div>
      </body>
    </html>
  );
}
