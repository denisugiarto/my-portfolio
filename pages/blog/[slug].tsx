import { Layout } from "@/components/Layout/Layout";
import { fetchArticleBySlug, fetchArticles } from "@/services/blog";
import { Article } from "@/types/blog";
import { ChevronLeft, MessageCircle, ThumbsUpIcon } from "lucide-react";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType
} from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import Markdown from "react-markdown";

interface ArticlePageProps {
  article: Article;
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const articles = await fetchArticles();

    const paths = articles.map((article) => ({
      params: { slug: article.slug },
    }));

    return {
      paths,
      fallback: "blocking", // or false if you want 404 for new paths
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps<ArticlePageProps> = async ({
  params,
}) => {
  try {
    const slug = params?.slug as string;
    const article = await fetchArticleBySlug(slug);

    if (!article) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        article,
      },
      // Revalidate every hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      notFound: true,
    };
  }
};

export default function Page({
  article,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout activeNavbar="blog">
      <NextSeo
        title={article.title}
        description={article.description}
        openGraph={{
          url: "https://www.denisugiarto.my.id",
          title: article.title,
          description: article.description,
          type: "article",
          images: [
            {
              url: "https://www.denisugiarto.my.id/android-chrome-512x512.png",
              width: 512,
              height: 512,
              alt: "logo image",
              type: "image/png",
            },
          ],
          article: {
            publishedTime: article.created_at,
            modifiedTime: article.published_at,
            authors: [
              "https://www.denisugiarto.my.id/android-chrome-512x512.png",
            ],
            tags: article.tags,
          },
        }}
      />
      <section className="container pt-20">
        <Link href="/blog" className="mb-4 flex gap-2 hover:bg-slate-500 w-max rounded-md pr-2 py-1" title="back to blog page">
          <ChevronLeft />
          Back
        </Link>
        <h1 className="mb-2 text-3xl font-bold">{article.title}</h1>
        <div className="flex gap-4 mb-2">
          {article.tags.map((tag) => (
            <div key={tag} className="text-sm font-light italic">
              #{tag}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-900 dark:text-slate-100 mb-8">
          <ThumbsUpIcon size={16} />
          <span className="mr-2">{article.public_reactions_count} reactions</span>
          <MessageCircle size={16} />
          {article.comments_count} comments
        </div>
        <Markdown className="bg-slate-900 p-4">{article.body_markdown}</Markdown>
      </section>
    </Layout>
  );
}
