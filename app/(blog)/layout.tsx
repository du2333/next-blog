import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import TagCloud from "@/components/TagCloud";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider>
        <body className="min-h-screen bg-base-100">
          <Navbar />
          <div className="max-w-6xl mx-auto flex gap-8 mt-8 mb-8">
            <main className="flex-1 min-w-0">{children}</main>
            <aside className="w-64 hidden md:block">
              <div className="sticky top-8">
                <TagCloud />
              </div>
            </aside>
          </div>
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
