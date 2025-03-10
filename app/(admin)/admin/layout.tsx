import NavPanel from "@/components/admin/nav-panel";
import Breadcrumbs from "@/components/admin/breadcrumbs";

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
      <main className="flex-1 ml-16 md:ml-56 p-4 min-h-full">
        <div className="mx-auto max-w-4xl px-6 pt-8 lg:px-8">
          <div className="mb-16">
            <Breadcrumbs />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
