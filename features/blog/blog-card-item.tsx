import { BlogPost } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { ArrowRightIcon, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogCardItem({ blog }: { blog: BlogPost }) {
  return (
    <div key={blog._id} className="rounded-md bg-card">
      <Link href={`/blog/${blog.slug.current}`}>
        <Image
          src={
            blog?.coverImage
              ? urlFor(blog.coverImage).width(512).height(400).url()
              : "/no-image.png"
          }
          alt={blog?.title}
          width={256}
          height={200}
          className="h-auto w-full rounded-t-md object-cover dark:bg-black"
        />
        <div className="p-4">
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
        </div>
      </Link>
    </div>
  );
}
