import { ArticleType } from "@/types/blog";
import BlogCardItem from "./blog-card-item";
import Skeleton from "./skeleton";

type BlogListProps = {
  blogs: ArticleType[];
  isLoading: boolean;
  error?: string;
};
export default function BlogList({ blogs, isLoading, error }: BlogListProps) {
  if (isLoading) return <Skeleton />;

  if (error) return <p>{error ?? "the blog list can't load"}</p>;
  if (blogs?.length === 0) {
    return (
      <p className="mx-auto w-auto rounded-md bg-slate-100 px-2 py-1 text-center text-sm font-semibold">
        No articles found
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {blogs?.map((blog) => <BlogCardItem key={blog.id} blog={blog} />)}
    </div>
  );
}
