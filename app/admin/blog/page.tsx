import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import DeletePostButton from "./_components/DeletePostButton";

export default async function AdminBlogPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { tags: true },
  });

  const categoryLabel = (cat: string) =>
    cat === "LAW" ? "Hukum" : "Budaya";

  const categoryStyle = (cat: string) =>
    cat === "LAW"
      ? "bg-blue-100 text-blue-700"
      : "bg-amber-100 text-amber-700";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl font-bold text-gray-900">Artikel</h1>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
        >
          + Tulis Artikel
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {posts.length === 0 ? (
          <p className="px-6 py-12 text-sm text-gray-400 text-center">
            Belum ada artikel.{" "}
            <Link href="/admin/blog/new" className="text-brand-600 hover:underline">
              Buat yang pertama!
            </Link>
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-medium text-gray-500">
                <th className="px-6 py-3 w-12"></th>
                <th className="px-6 py-3">Judul</th>
                <th className="px-6 py-3">Kategori</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Tanggal</th>
                <th className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
                  {/* Thumbnail */}
                  <td className="px-6 py-4">
                    <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden shrink-0 relative">
                      {post.featuredImage ? (
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-lg">
                          {post.category === "LAW" ? "⚖️" : "🎭"}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Judul */}
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{post.title}</p>
                    {post.tags.length > 0 && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {post.tags.map((t) => t.name).join(", ")}
                      </p>
                    )}
                  </td>

                  {/* Kategori */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${categoryStyle(post.category)}`}
                    >
                      {categoryLabel(post.category)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        post.published
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {post.published ? "Dipublikasikan" : "Draft"}
                    </span>
                  </td>

                  {/* Tanggal */}
                  <td className="px-6 py-4 text-gray-500">
                    {formatDate(post.createdAt)}
                  </td>

                  {/* Aksi */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="text-brand-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <DeletePostButton id={post.id} title={post.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
