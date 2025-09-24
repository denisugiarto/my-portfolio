import { BlogPost } from "@/lib/sanity";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

interface RelatedArticlesProps {
  articles: BlogPost[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article._id}
            href={`/blog/${article.slug.current}`}
            className="block overflow-hidden rounded-lg bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <h3 className="mb-2 font-semibold text-foreground line-clamp-2">
              {article.title}
            </h3>
            {article.excerpt && (
              <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                {article.excerpt}
              </p>
            )}
            <div className="flex gap-x-3 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              {article.readTime && (
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>{article.readTime} min</span>
                </div>
              )}
            </div>
            {article.tags && article.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {article.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag._id}
                    className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}