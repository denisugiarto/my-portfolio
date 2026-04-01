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
    <section className="mt-16 w-full overflow-hidden border-4 border-foreground bg-card px-4 py-8 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] sm:px-10 md:shadow-[8px_8px_0px_0px_hsl(var(--foreground))] lg:px-12">
      <div className="mb-4 xl:mb-10">
        <p className="inline-block border-2 border-foreground bg-accent px-2 py-1 text-xs font-black uppercase tracking-widest text-accent-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
          CONTINUE READING
        </p>
        <h2 className="mt-4 font-title text-3xl font-black uppercase tracking-widest text-foreground md:text-4xl">
          RELATED ARTICLES
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article._id}
            href={`/blog/${article.slug.current}`}
            className="group block w-full border-4 border-foreground bg-background p-4 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-none hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_hsl(var(--foreground))] sm:p-6 md:hover:shadow-[12px_12px_0px_0px_hsl(var(--foreground))]"
          >
            {article.category && (
              <div className="mb-4 inline-block border-2 border-foreground bg-primary px-2 py-1 text-xs font-black uppercase tracking-widest text-primary-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
                {article.category.name}
              </div>
            )}

            <h3 className="mb-3 line-clamp-2 text-xl font-black uppercase leading-snug text-foreground decoration-4 underline-offset-4 transition-none group-hover:underline">
              {article.title}
            </h3>
            {article.excerpt && (
              <p className="mb-6 line-clamp-3 text-sm font-bold leading-relaxed text-muted-foreground">
                {article.excerpt}
              </p>
            )}

            <div className="mb-4 flex flex-wrap gap-3 text-xs font-black uppercase text-foreground">
              <div className="inline-flex items-center gap-2 border-2 border-foreground bg-muted px-2 py-1 shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
                <Calendar size={14} className="stroke-[3]" />
                <span>
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              {article.readTime && (
                <div className="inline-flex items-center gap-2 border-2 border-foreground bg-muted px-2 py-1 shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
                  <Clock size={14} className="stroke-[3]" />
                  <span>{article.readTime} MIN READ</span>
                </div>
              )}
            </div>

            {article.tags && article.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {article.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag._id}
                    className="border-2 border-foreground bg-background px-2 py-1 text-xs font-black uppercase text-muted-foreground"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
