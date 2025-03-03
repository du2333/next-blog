export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="max-w-6xl mx-auto p-6">{children}</main>;
}
