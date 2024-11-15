import { ArticleType } from "@/types/blog";
import { MessageCircle, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import Author from "./author";

function BlogHeader({
  title,
  tags,
  comments_count,
  public_reactions_count,
  url,
  readable_publish_date,
  user,
}: Pick<
  ArticleType,
  | "title"
  | "tags"
  | "url"
  | "public_reactions_count"
  | "comments_count"
  | "readable_publish_date"
  | "user"
>) {
  return (
    <>
      <h1 className="mb-2 text-xl font-bold sm:text-4xl">{title}</h1>
      <div className="mb-2 flex gap-4">
        {tags?.map((tag) => (
          <div key={tag} className="text-sm font-light italic">
            #{tag}
          </div>
        ))}
      </div>
      <Link
        href={url}
        target="_blank"
        className="mb-2 flex items-center gap-2 text-xs text-slate-900 dark:text-slate-100"
      >
        <ThumbsUpIcon size={16} />
        <span className="mr-2">{public_reactions_count} reactions</span>
        <MessageCircle size={16} />
        {comments_count} comments
      </Link>
      <div className="flex items-center gap-x-2 text-neutral-500 mt-2">
        <Author name={user?.name} profile_image={user?.profile_image} />
        <span className="text-sm ">Posted on {readable_publish_date}</span>
      </div>
    </>
  );
}

export default BlogHeader;
