import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/app-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger className="fixed top-0 z-50" />
        <div className="mx-auto max-w-7xl p-12 mt-8">{children}</div>
      </main>
    </SidebarProvider>
  );
}
