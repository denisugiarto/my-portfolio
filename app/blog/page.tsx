import { Layout } from "@/components/Layout/Layout";
import BlogPageClient from "@/features/blog/blog-page-client";
import { getPaginatedBlogPosts, getBlogCategories } from "@/lib/sanity-queries";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Latest articles and insights about web development, React, Next.js, and modern frontend technologies.",
};

// Enable ISR with revalidation
export const revalidate = 3600;

export default async function BlogPage() {
  // Fetch only first page of blog posts and categories at build time
  const [{ posts, total }, categories] = await Promise.all([
    getPaginatedBlogPosts(0, 6),
    getBlogCategories(),
  ]);

  const initialData = {
    posts,
    total,
    categories,
    page: 1,
    totalPages: Math.ceil(total / 6),
  };

  return (
    <Layout activeNavbar="Blog" isNavColorBlack>
      <Suspense fallback={<div className="container pt-40">Loading...</div>}>
        <BlogPageClient initialData={initialData} />
      </Suspense>
    </Layout>
  );
}
