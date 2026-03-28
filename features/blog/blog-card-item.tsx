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
      className="group relative block overflow-hidden rounded-xl bg-card border border-border/50 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
    >
      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h2 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {blog.title}
        </h2>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {blog.excerpt}
          </p>
        )}

        {/* Meta info */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-primary/70" />
            <span>
              {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          {blog.readTime && (
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-primary/70" />
              <span>{blog.readTime} min read</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {displayTags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {displayTags.map((tag) => (
              <span
                key={tag._id}
                className="inline-flex items-center rounded-md bg-muted/50 px-2 py-0.5 text-xs font-medium text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary"
              >
                #{tag.name}
              </span>
            ))}
            {hasMoreTags && (
              <span className="inline-flex items-center rounded-md bg-muted/50 px-2 py-0.5 text-xs font-medium text-muted-foreground">
                +{(blog.tags?.length || 0) - 3}
              </span>
            )}
          </div>
        )}

        {/* Read more indicator */}
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all duration-200 group-hover:opacity-100">
          <span>Read article</span>
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
