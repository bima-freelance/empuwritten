import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

interface BlogDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug, published: true },
  });
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug, published: true },
    include: { tags: true },
  });

  if (!post) notFound();

  const [prevPost, nextPost] = await Promise.all([
    prisma.post.findFirst({
      where: { published: true, publishedAt: { lt: post.publishedAt ?? undefined } },
      orderBy: { publishedAt: "desc" },
      select: { title: true, slug: true },
    }),
    prisma.post.findFirst({
      where: { published: true, publishedAt: { gt: post.publishedAt ?? undefined } },
      orderBy: { publishedAt: "asc" },
      select: { title: true, slug: true },
    }),
  ]);

  return (
    <>
      {/* Page Header */}
      <section className="bg-hero py-20 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold-500 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 max-w-3xl">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-5">
              {post.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/blog?tag=${encodeURIComponent(tag.name)}`}
                  className="text-xs font-semibold tracking-widest uppercase text-gold-400 hover:text-gold-300 transition-colors flex items-center gap-2"
                >
                  <span className="w-4 h-px bg-gold-500" />
                  {tag.name}
                </Link>
              ))}
            </div>
          )}

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            {post.publishedAt && (
              <time dateTime={post.publishedAt.toISOString()}>
                {formatDate(post.publishedAt)}
              </time>
            )}
            <span className="w-1 h-1 bg-dark-500 rounded-full" />
            <Link href="/blog" className="hover:text-gold-400 transition-colors">
              Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_280px] gap-14">
            {/* Main content */}
            <article>
              <div
                className="prose-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-2 items-center">
                  <span className="text-xs font-semibold uppercase tracking-widest text-dark-400 mr-2">
                    Tags:
                  </span>
                  {post.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/blog?tag=${encodeURIComponent(tag.name)}`}
                      className="text-xs font-semibold tracking-widest uppercase border border-gray-200 px-3 py-1.5 text-dark-500 hover:border-gold-400 hover:text-gold-600 transition-colors"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Prev / Next */}
              {(prevPost || nextPost) && (
                <nav className="mt-12 grid grid-cols-2 gap-6">
                  {prevPost ? (
                    <Link
                      href={`/blog/${prevPost.slug}`}
                      className="group bg-gray-50 border border-gray-100 hover:border-gold-300 p-5 transition-all"
                    >
                      <p className="text-xs font-semibold uppercase tracking-widest text-dark-400 mb-2">
                        ← Sebelumnya
                      </p>
                      <p className="text-sm font-serif font-bold text-dark-700 group-hover:text-gold-700 transition-colors line-clamp-2">
                        {prevPost.title}
                      </p>
                    </Link>
                  ) : <div />}

                  {nextPost ? (
                    <Link
                      href={`/blog/${nextPost.slug}`}
                      className="group bg-gray-50 border border-gray-100 hover:border-gold-300 p-5 transition-all text-right"
                    >
                      <p className="text-xs font-semibold uppercase tracking-widest text-dark-400 mb-2">
                        Berikutnya →
                      </p>
                      <p className="text-sm font-serif font-bold text-dark-700 group-hover:text-gold-700 transition-colors line-clamp-2">
                        {nextPost.title}
                      </p>
                    </Link>
                  ) : <div />}
                </nav>
              )}
            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* About author */}
              <div className="bg-dark-800 p-6">
                <div className="w-16 h-16 bg-gold-600 flex items-center justify-center font-serif text-2xl font-bold text-white mb-4">
                  E
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-2">
                  Empuwritten
                </h3>
                <p className="text-dark-300 text-xs leading-relaxed mb-4">
                  Ruang untuk berbagi kata, cerita, dan gagasan yang bermakna.
                </p>
                <Link
                  href="/about"
                  className="text-xs font-semibold tracking-widest uppercase text-gold-400 hover:text-gold-300 transition-colors"
                >
                  Selengkapnya →
                </Link>
              </div>

              {/* All tags */}
              <div className="border border-gray-100 p-6">
                <h3 className="font-serif text-base font-bold text-dark-800 mb-4 pb-3 border-b border-gray-100">
                  Kategori
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/blog?tag=${encodeURIComponent(tag.name)}`}
                      className="text-xs font-semibold tracking-widest uppercase border border-gray-200 px-3 py-1.5 text-dark-500 hover:border-gold-400 hover:text-gold-600 hover:bg-gold-50 transition-all"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
