import "./globals.css";
import TagCloud from "@/components/TagCloud";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8 justify-center">
          {/* 主内容区 */}
          <main className="flex-1 max-w-3xl">
            <div className="mb-8">
              {/* <SearchBar /> */}
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
