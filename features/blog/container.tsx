import React from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { fetchArticles } from "@/services/blog";
import { ArticleType } from "@/types/blog";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import Skeleton from "./skeleton";
import BlogCardItem from "./blog-card-item";
import BlogList from "./blog-list";
import SearchInput from "@/components/ui/search-input";

export default function BlogContainer() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchArticles,
    refetchOnWindowFocus: false,
  });

  const [filteredBlogs, setFilteredBlogs] = useState<ArticleType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (data) {
      return setFilteredBlogs(data);
    }
  }, [data]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredBlogs(data!);
    } else {
      const filteredBlogs = data?.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredBlogs(filteredBlogs!);
    }
  }, [data, searchQuery]);

  function handleSearch(query: string) {
    setSearchQuery(query);
  }

  return (
    <section className="container pt-40">
      <div className="mb-4 flex flex-col justify-between sm:flex-row">
        <h1 className="mb-4 text-3xl font-bold text-slate-100">Blog</h1>
        <div className="sm:w-64">
          <SearchInput
            name="search"
            placeholder="Search"
            type="text"
            onSearch={handleSearch}
          />
        </div>
      </div>
      <BlogList
        blogs={filteredBlogs}
        isLoading={isLoading}
        error={error?.message}
      />
    </section>
  );
}
