import { useQuery } from "@tanstack/react-query";
import { ArrowRightIcon, MessageCircle, ThumbsUpIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReactTimeAgo from "react-time-ago";
import { fetchArticles } from "../../services/blog";
import Skeleton from "./skeleton";
const BlogList = () => {
  const {
    data: blogsList,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchArticles,
    refetchOnWindowFocus: false,
  });
  return (
    <section className="container pt-40">
      <h1 className="mb-4 text-3xl font-bold text-slate-100">Blog</h1>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {blogsList?.map((blog) => (
            <div key={blog.id} className="rounded-md bg-background">
              <Image
                src={blog?.social_image ?? "/no-image.png"}
                alt={blog?.title}
                width={256}
                height={200}
                className="h-auto w-full rounded-t-md object-scale-down dark:bg-black"
              />
              <div className="p-4">
                <Link
                  href={blog.url}
                  title={blog.url}
                  className="text-lg font-semibold text-foreground hover:text-primary"
                >
                  <h2>{blog.title}</h2>
                </Link>
                <div className="mb-2 mt-2 flex gap-x-2 text-sm">
                  <ReactTimeAgo
                    date={new Date(blog.published_at)}
                    locale="en-US"
                    title={blog.published_at}
                    className="text-slate-500"
                  />
                  <p className="text-gray-700 dark:text-slate-300">
                    by
                    <span className="ml-1 font-semibold capitalize text-primary dark:text-slate-300">
                      {blog.user?.name}
                    </span>
                  </p>
                  <p className="flex-auto flex-grow text-right text-slate-500">
                    {blog.reading_time_minutes} min read
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-900 dark:text-slate-100">
                  <ThumbsUpIcon size={16} />
                  <span className="mr-2">
                    {blog.public_reactions_count} reactions
                  </span>
                  <MessageCircle size={16} />
                  {blog.comments_count} comments
                </div>
                <p className="mb-2 mt-2 text-sm text-gray-700 dark:text-slate-300">
                  {blog.description}
                </p>
                <div className="flex flex-wrap">
                  {blog.tag_list.map((tag: string) => (
                    <div
                      key={tag}
                      className="rounded-full p-1 text-xs font-medium text-gray-700 dark:text-slate-300"
                    >
                      #{tag}
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-right">
                  <Link
                    href={`/blog/${blog.slug}`}
                    title={blog.url}
                    className="inline-flex items-center justify-end gap-2 rounded-full px-2 py-1 font-bold text-primary transition-all duration-500 hover:bg-slate-200 dark:text-slate-200"
                  >
                    Read More
                    <ArrowRightIcon height={16} width={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {error && <p>{error.message ?? "the blog list can't load"}</p>}
    </section>
  );
};

export default BlogList;
