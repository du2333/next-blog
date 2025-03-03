import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="min-h-screen bg-base-100">{children}</body>
    </html>
  );
}
