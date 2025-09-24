import { Layout } from "@/components/Layout/Layout";
import Markdown from "@/components/ui/markdown";
import BlogHeader from "@/features/blog/blog-header";
import RelatedArticles from "@/features/blog/related-articles";
import {
  getBlogPostBySlug,
  getBlogPosts,
  getRelatedBlogPosts,
} from "@/lib/sanity-queries";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Enable ISR with 60 second revalidation
export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const articles = await getBlogPosts();
    return articles
      .filter((article) => article.slug?.current)
      .map((article) => ({
        slug: article.slug.current,
      }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const article = await getBlogPostBySlug(slug);

    if (!article) {
      return {
        title: "Article Not Found",
      };
    }

    return {
      title: article.seo?.metaTitle || article.title,
      description: article.seo?.metaDescription || article.excerpt || "",
      openGraph: {
        title: article.title,
        description: article.excerpt || "",
        type: "article",
        publishedTime: article.publishedAt,
        authors: ["Deni Sugiarto"],
        tags: article.tags?.map((tag) => tag.name),
        images: article.coverImage
          ? [
              {
                url: article.coverImage.toString(),
                width: 1200,
                height: 630,
                alt: article.title,
              },
            ]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.excerpt || "",
      },
    };
  } catch (error) {
    return {
      title: "Article Not Found",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { slug } = await params;
    const article = await getBlogPostBySlug(slug);

    if (!article) {
      notFound();
    }

    const tagIds = article.tags?.map((tag) => tag._id) || [];
    const relatedArticles = await getRelatedBlogPosts(article._id, tagIds, 3);

    return (
      <Layout activeNavbar="Blog" isNavColorBlack>
        <section className="container p-4 pt-24 lg:max-w-screen-md">
          <BlogHeader article={article} />
          {article.content && <Markdown>{article.content}</Markdown>}
          <RelatedArticles articles={relatedArticles} />
        </section>
      </Layout>
    );
  } catch (error) {
    console.error("Error loading article:", error);
    notFound();
  }
}
