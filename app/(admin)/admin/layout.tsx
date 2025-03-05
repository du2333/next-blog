import NavPanel from "@/components/admin/NavPanel";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
        <aside className="fixed left-0 h-screen w-16 md:w-56">
          <NavPanel />
        </aside>
        <main className="flex-1 ml-16 md:ml-56 p-4">{children}</main>
    </div>
  );
}
