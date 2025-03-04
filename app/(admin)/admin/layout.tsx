import Navbar from "@/components/Navbar";
import NavPanel from "@/components/admin/NavPanel";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="fixed top-0 w-full h-16 bg-base-100 z-50">
        <Navbar />
      </nav>

      <div className="flex pt-16">
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-56">
          <NavPanel />
        </aside>
        <main className="flex-1 ml-56 p-4">{children}</main>
      </div>
    </div>
  );
}
