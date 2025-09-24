import { BlogPost } from "@/lib/sanity";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

export default function BlogCardItem({ blog }: { blog: BlogPost }) {
  return (
    <Link
      href={`/blog/${blog.slug.current}`}
      className="block overflow-hidden rounded-lg bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <h2 className="text-lg font-semibold text-foreground">
        {blog.title}
      </h2>
      <div className="mb-2 mt-2 flex gap-x-2 text-sm">
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span className="text-slate-500">
            {new Date(blog.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        {blog.readTime && (
          <div className="flex items-center gap-1 text-slate-500">
            <Clock size={14} />
            <span>{blog.readTime} min read</span>
          </div>
        )}
      </div>
      {blog.tags && blog.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {blog.tags.map((tag) => (
            <div
              key={tag._id}
              className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-slate-800 dark:text-slate-300"
            >
              #{tag.name}
            </div>
          ))}
        </div>
      )}
    </Link>
  );
}
