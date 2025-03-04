export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="mx-auto mt-8 flex max-w-6xl mb-8">{children}</main>;
}
