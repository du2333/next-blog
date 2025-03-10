import Navbar from "@/components/navbar";
import TagCloud from "@/components/tag-cloud";
import Footer from "@/components/footer";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="mx-auto mt-8 flex max-w-6xl mb-8">
        <div className="flex-1 min-w-0">{children}</div>
        <aside className="ml-8 hidden w-64 md:block">
          <div className="top-8">
            <TagCloud />
          </div>
        </aside>
      </main>
      <Footer />
    </>
  );
}
