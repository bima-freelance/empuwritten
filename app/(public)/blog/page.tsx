import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ArticleCard from "@/components/blog/ArticleCard";

export const metadata: Metadata = {
  title: "Blog",
  description: "Semua tulisan di Empuwritten.",
};

const POSTS_PER_PAGE = 9;

interface BlogPageProps {
  searchParams: { tag?: string; page?: string; category?: string };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentTag = searchParams.tag;
  const currentCategory = searchParams.category;
  const currentPage = Number(searchParams.page) || 1;
  const skip = (currentPage - 1) * POSTS_PER_PAGE;

  const where = {
    published: true,
    ...(currentTag ? { tags: { some: { name: currentTag } } } : {}),
    ...(currentCategory ? { category: currentCategory as "LAW" | "CULTURE" } : {}),
  };

  const [posts, total, allTags] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip,
      take: POSTS_PER_PAGE,
      include: { tags: true },
    }),
    prisma.post.count({ where }),
    prisma.tag.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: { select: { posts: { where: { published: true } } } },
      },
    }),
  ]);

  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  // Helper: build URL dengan preserve params lain
  const buildUrl = (params: Record<string, string | undefined>) => {
    const merged = {
      ...(currentTag ? { tag: currentTag } : {}),
      ...(currentCategory ? { category: currentCategory } : {}),
      ...params,
    };
    const qs = Object.entries(merged)
      .filter(([, v]) => v !== undefined && v !== "")
      .map(([k, v]) => `${k}=${encodeURIComponent(v!)}`)
      .join("&");
    return `/blog${qs ? `?${qs}` : ""}`;
  };

  return (
    <>
      {/* Page Header */}
      <section className="bg-hero py-20 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold-500 to-transparent" />
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
            <span className="w-10 h-px bg-gold-500" />
            Tulisan
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            {currentCategory === "LAW"
              ? "Tulisan Hukum"
              : currentCategory === "CULTURE"
              ? "Tulisan Budaya"
              : currentTag
              ? `Tag: ${currentTag}`
              : "Semua Tulisan"}
          </h1>
          <p className="text-gray-400 text-sm">
            <Link href="/" className="hover:text-gold-400 transition-colors">
              Beranda
            </Link>
            <span className="mx-2 text-dark-500">/</span>
            <span className="text-gold-400">Tulisan</span>
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-6 mb-10">

            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold tracking-widest uppercase text-dark-400">
                Kategori
              </span>
              <div className="flex gap-2">
                <Link
                  href={buildUrl({ category: undefined, page: undefined })}
                  className={`text-xs font-semibold tracking-widest uppercase px-4 py-2 transition-colors ${
                    !currentCategory
                      ? "bg-dark-800 text-white"
                      : "bg-white border border-gray-200 text-dark-500 hover:border-dark-400 hover:text-dark-700"
                  }`}
                >
                  Semua
                </Link>
                <Link
                  href={buildUrl({ category: "LAW", page: undefined })}
                  className={`text-xs font-semibold tracking-widest uppercase px-4 py-2 transition-colors ${
                    currentCategory === "LAW"
                      ? "bg-blue-700 text-white"
                      : "bg-white border border-gray-200 text-dark-500 hover:border-blue-400 hover:text-blue-600"
                  }`}
                >
                  ⚖️ Hukum
                </Link>
                <Link
                  href={buildUrl({ category: "CULTURE", page: undefined })}
                  className={`text-xs font-semibold tracking-widest uppercase px-4 py-2 transition-colors ${
                    currentCategory === "CULTURE"
                      ? "bg-amber-600 text-white"
                      : "bg-white border border-gray-200 text-dark-500 hover:border-amber-400 hover:text-amber-600"
                  }`}
                >
                  🎭 Budaya
                </Link>
              </div>
            </div>

            {/* Tag Filter */}
            {allTags.length > 0 && (
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-semibold tracking-widest uppercase text-dark-400">
                  Tag
                </span>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={buildUrl({ tag: undefined, page: undefined })}
                    className={`text-xs font-semibold tracking-widest uppercase px-4 py-2 transition-colors ${
                      !currentTag
                        ? "bg-gold-600 text-white"
                        : "bg-white border border-gray-200 text-dark-500 hover:border-gold-400 hover:text-gold-600"
                    }`}
                  >
                    Semua
                  </Link>
                  {allTags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={buildUrl({ tag: tag.name, page: undefined })}
                      className={`text-xs font-semibold tracking-widest uppercase px-4 py-2 transition-colors ${
                        currentTag === tag.name
                          ? "bg-gold-600 text-white"
                          : "bg-white border border-gray-200 text-dark-500 hover:border-gold-400 hover:text-gold-600"
                      }`}
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Posts Grid */}
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-dark-400 text-sm">
                Belum ada tulisan yang sesuai filter.
              </p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-14">
                  {currentPage > 1 && (
                    <Link
                      href={buildUrl({ page: String(currentPage - 1) })}
                      className="px-5 py-2.5 border border-gray-300 text-xs font-semibold uppercase tracking-wide text-dark-600 hover:border-gold-500 hover:text-gold-600 transition-colors"
                    >
                      ← Sebelumnya
                    </Link>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={buildUrl({ page: String(p) })}
                      className={`w-9 h-9 flex items-center justify-center text-xs font-semibold transition-colors ${
                        p === currentPage
                          ? "bg-gold-600 text-white"
                          : "border border-gray-300 text-dark-500 hover:border-gold-400 hover:text-gold-600"
                      }`}
                    >
                      {p}
                    </Link>
                  ))}
                  {currentPage < totalPages && (
                    <Link
                      href={buildUrl({ page: String(currentPage + 1) })}
                      className="px-5 py-2.5 border border-gray-300 text-xs font-semibold uppercase tracking-wide text-dark-600 hover:border-gold-500 hover:text-gold-600 transition-colors"
                    >
                      Berikutnya →
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
