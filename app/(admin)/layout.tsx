import "@/app/globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body className="min-h-screen bg-base-100">
          <div className="max-w-6xl mx-auto p-6">{children}</div>
        </body>
      </html>
    );
}