import { BlogPost } from "@/lib/sanity";
import { Calendar, Clock } from "lucide-react";

interface BlogHeaderProps {
  article: BlogPost;
}

export default function BlogHeader({ article }: BlogHeaderProps) {
  return (
    <>
      {article.category && (
        <div className="mb-6 inline-block border-2 border-foreground bg-primary px-3 py-1 text-sm font-black uppercase tracking-widest text-primary-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
          {article.category.name}
        </div>
      )}

      <h1 className="mb-8 block break-words font-title text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-foreground md:leading-[1.1] border-b-8 border-foreground pb-2">
        {article.title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm font-bold uppercase tracking-wider text-foreground">
        <div className="inline-flex items-center gap-2 border-2 border-foreground bg-muted px-4 py-2 shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
          <Calendar className="h-5 w-5 stroke-[3]" />
          <span>
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        {article.readTime && (
          <div className="inline-flex items-center gap-2 border-2 border-foreground bg-muted px-4 py-2 shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
            <Clock className="h-5 w-5 stroke-[3]" />
            <span>{article.readTime} MIN READ</span>
          </div>
        )}
      </div>

      {article.tags && article.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {article.tags.map((tag) => (
            <div
              key={tag._id}
              className="border-2 border-foreground bg-background px-3 py-1.5 text-xs font-black uppercase tracking-widest text-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))] hover:bg-foreground hover:text-background transition-none"
            >
              #{tag.name}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
