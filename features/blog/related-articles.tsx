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
    <section className="mt-16 border-4 border-foreground bg-card px-6 py-10 shadow-[8px_8px_0px_0px_hsl(var(--foreground))] sm:px-10 lg:px-12">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b-4 border-foreground pb-6">
        <div>
          <p className="inline-block bg-accent px-2 py-1 text-xs font-black uppercase tracking-widest text-accent-foreground border-2 border-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
            CONTINUE READING
          </p>
          <h2 className="mt-4 font-title text-3xl md:text-4xl font-black uppercase tracking-widest text-foreground">
            RELATED ARTICLES
          </h2>
        </div>
        <p className="max-w-xl text-lg font-bold leading-relaxed text-foreground bg-secondary p-4 border-4 border-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
          A FEW MORE POSTS IN THE SAME ORBIT, PICKED TO KEEP THE READING FLOW
          GOING.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article._id}
            href={`/blog/${article.slug.current}`}
            className="group block border-4 border-foreground bg-background p-6 transition-none hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_0px_hsl(var(--foreground))] shadow-[4px_4px_0px_0px_hsl(var(--foreground))]"
          >
            {article.category && (
              <div className="mb-4 inline-block border-2 border-foreground bg-primary px-2 py-1 text-xs font-black uppercase tracking-widest text-primary-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
                {article.category.name}
              </div>
            )}

            <h3 className="mb-3 line-clamp-2 text-xl font-black uppercase leading-snug text-foreground transition-none group-hover:underline decoration-4 underline-offset-4">
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
