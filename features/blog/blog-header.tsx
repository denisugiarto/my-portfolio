import { BlogPost } from "@/lib/sanity";
import { Calendar, Clock } from "lucide-react";

interface BlogHeaderProps {
  article: BlogPost;
}

export default function BlogHeader({ article }: BlogHeaderProps) {
  return (
    <>
      <h1 className="mb-4 text-3xl font-bold md:text-5xl md:leading-tight">
        {article.title}
      </h1>

      <div className="mb-4 flex items-center gap-4 text-sm text-neutral-500">
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        {article.readTime && (
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{article.readTime} min read</span>
          </div>
        )}
      </div>

      {article.tags && article.tags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <div
              key={tag._id}
              className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium italic text-gray-500 dark:bg-slate-800 dark:text-slate-300"
            >
              #{tag.name}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
