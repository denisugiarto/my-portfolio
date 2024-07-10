import axios, { AxiosError } from "axios";
import { Article } from "../@types/blog.js";

export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const { data } = await axios.get<Article[]>(
      "https://dev.to/api/articles?username=deni_sugiarto_1a01ad7c3fb",
    );
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Error fetching article");
  }
};
