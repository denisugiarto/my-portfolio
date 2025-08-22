import { BlogPost } from "@/lib/sanity";
import { Calendar, Clock } from "lucide-react";

interface BlogHeaderProps {
  article: BlogPost;
}

export default function BlogHeader({ article }: BlogHeaderProps) {
  return (
    <>
      <h1 className="mb-4 text-3xl font-bold sm:text-5xl">{article.title}</h1>
      
      <div className="mb-4 flex items-center gap-4 text-sm text-neutral-500">
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>
            {new Date(article.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
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
              className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-slate-800 dark:text-slate-300"
            >
              #{tag.name}
            </div>
          ))}
        </div>
      )}

      {article.excerpt && (
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
          {article.excerpt}
        </p>
      )}
    </>
  );
}
