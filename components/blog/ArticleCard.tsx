import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface Tag {
  id: number;
  name: string;
}

interface ArticleCardProps {
  post: {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    publishedAt: Date | null;
    tags: Tag[];
  };
}

export default function ArticleCard({ post }: ArticleCardProps) {
  return (
    <article className="bg-white border border-gray-100 group hover:border-gold-300 hover:shadow-md transition-all duration-300">
      {/* Top gold accent */}
      <div className="h-0.5 w-0 bg-gold-500 group-hover:w-full transition-all duration-500" />

      <div className="p-7">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/blog?tag=${encodeURIComponent(tag.name)}`}
                className="text-xs font-semibold tracking-widest uppercase text-gold-600 hover:text-gold-800 transition-colors"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="font-serif text-xl font-bold text-dark-800 group-hover:text-gold-700 transition-colors leading-snug mb-3">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-dark-500 text-sm leading-relaxed line-clamp-2 mb-5">
            {post.excerpt}
          </p>
        )}

        {/* Divider */}
        <div className="w-full h-px bg-gray-100 mb-5" />

        {/* Meta */}
        <div className="flex items-center justify-between">
          {post.publishedAt && (
            <time
              dateTime={post.publishedAt.toISOString()}
              className="text-xs text-dark-400 font-medium"
            >
              {formatDate(post.publishedAt)}
            </time>
          )}
          <Link
            href={`/blog/${post.slug}`}
            className="text-xs font-semibold tracking-wide uppercase text-gold-600 hover:text-gold-800 transition-colors flex items-center gap-1.5"
          >
            Baca →
          </Link>
        </div>
      </div>
    </article>
  );
}
