import Navbar from "@/components/Navbar";
import TagCloud from "@/components/TagCloud";
import Footer from "@/components/Footer";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto flex mt-8 mb-8">
        <div className="flex-1 min-w-0 px-4">{children}</div>
        <aside className="w-64 hidden md:block">
          <div className="sticky top-8">
            <TagCloud />
          </div>
        </aside>
      </main>
      <Footer />
    </>
  );
}
