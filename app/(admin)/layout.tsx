import "@/app/globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-gray-100">
                <div className="max-w-4xl mx-auto p-6">
                    {children}
                </div>
            </body>
        </html>
    );
}