import Navbar from "@/components/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="mx-auto mt-8 flex max-w-6xl mb-8">{children}</main>
    </>
  );
}
