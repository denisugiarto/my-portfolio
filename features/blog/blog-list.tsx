import { BlogPost } from "@/lib/sanity";
import BlogCardItem from "./blog-card-item";
import Skeleton from "./skeleton";

type BlogListProps = {
  blogs: BlogPost[];
  isLoading: boolean;
  error?: string;
};
export default function BlogList({ blogs, isLoading, error }: BlogListProps) {
  if (isLoading) return <Skeleton />;

  if (error) return <p>{error ?? "the blog list can't load"}</p>;
  if (blogs?.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto w-auto rounded-md bg-slate-100 px-6 py-4 text-center dark:bg-slate-800">
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            No articles found
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8">
      {blogs?.map((blog) => <BlogCardItem key={blog._id} blog={blog} />)}
    </div>
  );
}
