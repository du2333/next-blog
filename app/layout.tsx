import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-8">{children}</div>
      </body>
    </html>
  );
}
