import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [totalPosts, publishedPosts, draftPosts, unreadMessages] =
    await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { published: true } }),
      prisma.post.count({ where: { published: false } }),
      prisma.contactMessage.count({ where: { read: false } }),
    ]);

  const recentPosts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { tags: true },
  });

  const stats = [
    { label: "Total Artikel", value: totalPosts },
    { label: "Dipublikasikan", value: publishedPosts },
    { label: "Draft", value: draftPosts },
    { label: "Pesan Belum Dibaca", value: unreadMessages },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl font-bold text-gray-900">Dashboard</h1>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
        >
          + Tulis Artikel
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent posts */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-medium text-gray-900">Artikel Terbaru</h2>
          <Link href="/admin/blog" className="text-sm text-brand-600 hover:underline">
            Lihat semua
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {recentPosts.length === 0 ? (
            <p className="px-6 py-8 text-sm text-gray-400 text-center">Belum ada artikel.</p>
          ) : (
            recentPosts.map((post) => (
              <div key={post.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{post.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {post.published ? (
                      <span className="text-green-600">Dipublikasikan</span>
                    ) : (
                      <span className="text-yellow-600">Draft</span>
                    )}
                  </p>
                </div>
                <Link
                  href={`/admin/blog/${post.id}/edit`}
                  className="text-xs text-brand-600 hover:underline shrink-0"
                >
                  Edit
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
