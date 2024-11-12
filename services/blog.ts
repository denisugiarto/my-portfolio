import { Article } from "@/types/blog";
import axios from "axios";

export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const { data } = await axios.get<Article[]>(
      `https://dev.to/api/articles?username=${process.env.NEXT_PUBLIC_DEV_USERNAME}`,
    );
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Error fetching article");
  }
};

export const fetchArticleBySlug = async (slug: string): Promise<Article> => {
  try {
    const { data } = await axios.get<Article>(
      `https://dev.to/api/articles/${process.env.NEXT_PUBLIC_DEV_USERNAME}/${slug}`,
    );
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Error fetching article");
  }
};
