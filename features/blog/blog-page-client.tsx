"use client";

import { BlogPost, BlogCategory } from "@/lib/sanity";
import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BlogCardLite from "@/components/ui/blog-card-lite";
import SearchInput from "@/components/ui/search-input";
import BlogCategoryNav from "@/components/blog-category-nav";
import { Pagination } from "@/components/ui/pagination";
import { X, Filter, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BlogData {
  posts: BlogPost[];
  total: number;
  categories: BlogCategory[];
  page: number;
  totalPages: number;
}

const BLOGS_PER_PAGE = 6;

export default function BlogPageClient({
  initialData,
}: {
  initialData: BlogData;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [blogData, setBlogData] = useState<BlogData>(initialData);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category") || null,
  );
  const [isLoading, setIsLoading] = useState(false);

  const selectedCategoryName = selectedCategory
    ? blogData.categories.find((c) => c._id === selectedCategory)?.name
    : null;

  const hasActiveFilters = searchQuery || selectedCategory;

  // Fetch blog data from API
  const fetchBlogData = useCallback(
    async (page: number, search: string, category: string | null) => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("page", page.toString());
        params.set("limit", BLOGS_PER_PAGE.toString());
        if (search) params.set("search", search);
        if (category) params.set("category", category);

        const response = await fetch(`/api/blog?${params.toString()}`);
        const data = await response.json();
        setBlogData(data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  // Update URL and fetch data
  const updateAndFetch = useCallback(
    (page: number, search: string, category: string | null) => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category) params.set("category", category);
      if (page > 1) params.set("page", page.toString());

      const queryString = params.toString();
      const newUrl = queryString ? `/blog?${queryString}` : "/blog";
      router.replace(newUrl, { scroll: false });

      fetchBlogData(page, search, category);
    },
    [router, fetchBlogData],
  );

  function handleCategoryChange(category: string | null) {
    setSelectedCategory(category);
    updateAndFetch(1, searchQuery, category);
  }

  function handlePageChange(page: number) {
    updateAndFetch(page, searchQuery, selectedCategory);
  }

  const onSearchHandler = useCallback(
    (query: string) => {
      setSearchQuery(query);
      updateAndFetch(1, query, selectedCategory);
    },
    [selectedCategory, updateAndFetch],
  );

  function clearAllFilters() {
    setSearchQuery("");
    setSelectedCategory(null);
    updateAndFetch(1, "", null);
  }

  const totalBlogs = blogData.total;
  const totalPages = blogData.totalPages;
  const currentPage = blogData.page;
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const endIndex = startIndex + BLOGS_PER_PAGE;

  return (
    <section className="container max-w-6xl pt-32 lg:pt-40">
      {/* Header Section */}
      <div className="mb-16">
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <h1 className="border-b-6 mb-4 inline-block border-foreground pb-2 text-4xl font-black uppercase tracking-tight text-foreground md:border-b-8 md:text-7xl lg:text-8xl">
              BLOG
            </h1>
            <p className="max-w-xl border-4 border-primary bg-secondary p-3 text-sm font-bold uppercase leading-relaxed text-foreground shadow-[3px_3px_0px_0px_hsl(var(--foreground))] md:border-l-8 md:p-4 md:text-lg md:shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
              INSIGHTS, TUTORIALS, AND THOUGHTS ON WEB DEVELOPMENT
            </p>
          </div>
          <div className="w-full sm:w-80">
            <SearchInput
              name="search"
              placeholder="SEARCH ARTICLES..."
              type="text"
              onSearch={onSearchHandler}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6 border-[3px] border-foreground bg-card p-4 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] md:mb-8 md:border-4 md:p-6 md:shadow-[8px_8px_0px_0px_hsl(var(--foreground))]">
          <p className="mb-2 text-xs font-black uppercase tracking-widest text-foreground md:mb-3 md:text-sm">
            CATEGORIES
          </p>
          <BlogCategoryNav
            categories={blogData.categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Active Filters & Results INFO */}
        <div className="flex flex-col gap-4 border-4 border-foreground bg-primary p-4 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-primary-foreground">
              <Filter size={18} className="stroke-[3]" />
              FILTERS:
            </span>
            {hasActiveFilters ? (
              <>
                {searchQuery && (
                  <span className="inline-flex items-center gap-2 border-2 border-foreground bg-background px-3 py-1 text-xs font-black uppercase text-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
                    <Search size={14} className="stroke-[3]" />
                    {searchQuery}
                    <Button
                      type="button"
                      onClick={() => onSearchHandler("")}
                      className="font-inherit ml-2 h-auto w-auto border-0 border-l-2 border-foreground bg-transparent p-0 pl-2 normal-case tracking-normal text-inherit shadow-none transition-none hover:translate-x-0 hover:translate-y-0 hover:text-destructive hover:shadow-none active:translate-x-0 active:translate-y-0"
                      aria-label="Clear search filter"
                    >
                      <X size={14} className="stroke-[3]" />
                    </Button>
                  </span>
                )}
                {selectedCategoryName && (
                  <span className="inline-flex items-center gap-2 border-2 border-foreground bg-background px-3 py-1 text-xs font-black uppercase text-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
                    {selectedCategoryName}
                    <Button
                      type="button"
                      onClick={() => handleCategoryChange(null)}
                      className="font-inherit ml-2 h-auto w-auto border-0 border-l-2 border-foreground bg-transparent p-0 pl-2 normal-case tracking-normal text-inherit shadow-none transition-none hover:translate-x-0 hover:translate-y-0 hover:text-destructive hover:shadow-none active:translate-x-0 active:translate-y-0"
                      aria-label="Clear category filter"
                    >
                      <X size={14} className="stroke-[3]" />
                    </Button>
                  </span>
                )}
                <Button
                  type="button"
                  onClick={clearAllFilters}
                  className="ml-2 h-auto w-auto border-0 bg-transparent p-0 text-sm font-black uppercase text-primary-foreground underline decoration-2 underline-offset-4 shadow-none transition-none hover:translate-x-0 hover:translate-y-0 hover:text-background hover:shadow-none active:translate-x-0 active:translate-y-0"
                >
                  CLEAR ALL
                </Button>
              </>
            ) : (
              <span className="text-sm font-bold uppercase text-primary-foreground">
                NONE
              </span>
            )}
          </div>

          <div
            className={cn(
              "text-sm font-black uppercase tracking-wider text-primary-foreground",
              hasActiveFilters ? "sm:text-right" : "",
            )}
          >
            {totalBlogs > 0 ? (
              <span>
                SHOWING{" "}
                <span className="border-2 border-foreground bg-background px-2 py-1 text-foreground">
                  {startIndex + 1}-{Math.min(endIndex, totalBlogs)}
                </span>{" "}
                OF{" "}
                <span className="border-2 border-foreground bg-background px-2 py-1 text-foreground">
                  {totalBlogs}
                </span>{" "}
                {totalBlogs === 1 ? "ARTICLE" : "ARTICLES"}
              </span>
            ) : (
              <span className="border-2 border-foreground bg-destructive px-3 py-1 text-destructive-foreground">
                NO ARTICLES FOUND
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Blog List */}
      {isLoading ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="mb-4 h-48 w-full rounded-none bg-gray-300 dark:bg-gray-700" />
              <div className="space-y-2">
                <div className="h-6 w-3/4 rounded-none bg-gray-300 dark:bg-gray-700" />
                <div className="h-4 w-full rounded-none bg-gray-300 dark:bg-gray-700" />
              </div>
            </div>
          ))}
        </div>
      ) : blogData.posts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogData.posts.map((blog) => (
            <BlogCardLite key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border-4 border-foreground bg-card py-20 text-center shadow-[12px_12px_0px_0px_hsl(var(--foreground))]">
          <div className="mb-6 border-4 border-foreground bg-muted p-6 shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
            <Search className="h-12 w-12 stroke-[3] text-foreground" />
          </div>
          <h3 className="mb-4 text-3xl font-black uppercase tracking-tight text-foreground">
            NO ARTICLES FOUND
          </h3>
          <p className="mb-8 max-w-lg text-lg font-bold text-foreground">
            WE COULDN'T FIND ANY ARTICLES MATCHING YOUR SEARCH CRITERIA.
          </p>
          <Button
            size="lg"
            onClick={clearAllFilters}
            className="border-4 border-foreground bg-primary px-8 text-lg font-black uppercase tracking-widest text-primary-foreground shadow-[6px_6px_0px_0px_hsl(var(--foreground))] transition-none hover:translate-x-1 hover:translate-y-1 hover:shadow-[0px_0px_0px_0px_hsl(var(--foreground))]"
          >
            CLEAR ALL FILTERS
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-16 pb-16">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mb-8"
          />
        </div>
      )}
    </section>
  );
}
