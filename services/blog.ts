import { BlogPost } from "@/lib/sanity";
import { getBlogPosts, getBlogPostBySlug, getFeaturedBlogPosts } from "@/lib/sanity-queries";

export const fetchArticles = async (): Promise<BlogPost[]> => {
  try {
    return await getBlogPosts();
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Error fetching articles");
  }
};
export const fetchArticlesFeatured = async (): Promise<BlogPost[]> => {
  try {
    return await getFeaturedBlogPosts();
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Error fetching articles");
  }
};

export const fetchArticleBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    return await getBlogPostBySlug(slug);
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Error fetching article");
  }
};
