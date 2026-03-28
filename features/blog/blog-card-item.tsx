import { BlogPost } from "@/lib/sanity";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";

export default function BlogCardItem({ blog }: { blog: BlogPost }) {
  // Get the first few tags to display
  const displayTags = blog.tags?.slice(0, 3) || [];
  const hasMoreTags = (blog.tags?.length || 0) > 3;

  return (
    <Link
      href={`/blog/${blog.slug.current}`}
      className="group relative block overflow-hidden border-4 border-foreground bg-card p-6 shadow-[6px_6px_0px_0px_hsl(var(--foreground))] transition-none hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_hsl(var(--foreground))]"
    >
      {/* Content */}
      <div className="flex h-full flex-col">
        {/* Title */}
        <h2 className="text-2xl font-black uppercase text-foreground line-clamp-2 transition-none group-hover:underline decoration-4 underline-offset-4 mb-4">
          {blog.title}
        </h2>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="mb-6 text-base font-bold text-muted-foreground line-clamp-3">
            {blog.excerpt}
          </p>
        )}

        {/* Meta info */}
        <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-black uppercase text-foreground">
          <div className="flex items-center gap-2 border-2 border-foreground bg-muted px-2 py-1 shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
            <Calendar size={14} className="stroke-[3]" />
            <span>
              {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          {blog.readTime && (
            <div className="flex items-center gap-2 border-2 border-foreground bg-muted px-2 py-1 shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
              <Clock size={14} className="stroke-[3]" />
              <span>{blog.readTime} MIN</span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="mt-auto pt-2">
          {displayTags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {displayTags.map((tag) => (
                <span
                  key={tag._id}
                  className="inline-flex items-center border-2 border-foreground bg-background px-2 py-1 text-xs font-black uppercase text-muted-foreground transition-none group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[2px_2px_0px_0px_hsl(var(--foreground))]"
                >
                  #{tag.name}
                </span>
              ))}
              {hasMoreTags && (
                <span className="inline-flex items-center border-2 border-foreground bg-background px-2 py-1 text-xs font-black uppercase text-muted-foreground">
                  +{(blog.tags?.length || 0) - 3}
                </span>
              )}
            </div>
          )}

          {/* Read more indicator */}
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary transition-none group-hover:text-foreground">
            <span className="border-b-4 border-transparent group-hover:border-foreground pb-1">READ ARTICLE</span>
            <ArrowRight size={18} className="stroke-[3] transition-none group-hover:translate-x-2" />
          </div>
        </div>
      </div>
    </Link>
  );
}
