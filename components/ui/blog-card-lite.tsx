import { BlogPost } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardLiteProps {
  blog: BlogPost;
}

export default function BlogCardLite({ blog }: BlogCardLiteProps) {
  return (
    <article className="group overflow-hidden border-2 border-foreground bg-card shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all duration-150 hover:-translate-x-[4px] hover:-translate-y-[4px] hover:shadow-[8px_8px_0px_0px_hsl(var(--foreground))]">
      <Link href={`/blog/${blog.slug.current}`}>
        <div className="relative h-48 overflow-hidden">
          {blog.coverImage ? (
            <Image
              src={urlFor(blog.coverImage).width(400).height(200).url()}
              alt={blog.title}
              width={400}
              height={200}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
              <div className="text-6xl opacity-20">📝</div>
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={blog.publishedAt}>
              {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
          {blog.readTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{blog.readTime} min</span>
            </div>
          )}
        </div>

        <Link href={`/blog/${blog.slug.current}`}>
          <h2 className="mb-3 line-clamp-2 text-xl font-bold text-card-foreground transition-colors duration-200 group-hover:text-primary">
            {blog.title}
          </h2>
        </Link>

        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {blog.excerpt || "Click to read more..."}
        </p>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {blog.tags.slice(0, 2).map((tag) => (
              <span
                key={tag._id}
                className="inline-flex items-center rounded-none bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
              >
                #{tag.name}
              </span>
            ))}
            {blog.tags.length > 2 && (
              <span className="text-xs text-muted-foreground">
                +{blog.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
