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

  if (error) return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-destructive/10 p-4">
        <svg
          className="h-8 w-8 text-destructive"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">
        Error loading articles
      </h3>
      <p className="text-sm text-muted-foreground">{error}</p>
    </div>
  );

  if (blogs?.length === 0) {
    return null; // Empty state is handled by the parent component
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs?.map((blog) => (
        <BlogCardItem key={blog._id} blog={blog} />
      ))}
    </div>
  );
}
