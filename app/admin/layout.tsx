import Link from "next/link";
import { headers } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";

  // Halaman login: render tanpa sidebar (tidak ada auth check di sini,
  // middleware sudah handle redirect)
  if (pathname === "/admin/login" || pathname === "") {
    return <>{children}</>;
  }

  // Semua halaman admin lainnya: render dengan sidebar
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <Link
            href="/"
            className="font-serif text-lg font-bold text-gray-900 hover:text-brand-600 transition-colors"
          >
            Empuwritten
          </Link>
          <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { href: "/admin", label: "Dashboard" },
            { href: "/admin/blog", label: "Artikel" },
            { href: "/admin/messages", label: "Pesan Masuk" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <Link
            href="/api/auth/signout"
            className="text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            Keluar
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
