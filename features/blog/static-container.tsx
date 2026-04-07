"use client";

import React from "react";
import { BlogPost, BlogCategory } from "@/lib/sanity";
import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BlogList from "./blog-list";
import SearchInput from "@/components/ui/search-input";
import BlogCategoryNav from "@/components/blog-category-nav";
import { Pagination, PaginationInfo } from "@/components/ui/pagination";
import { X, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BlogStaticContainerProps {
  initialBlogs: BlogPost[];
  categories: BlogCategory[];
}

const BLOGS_PER_PAGE = 6;

export default function BlogStaticContainer({
  initialBlogs,
  categories,
}: BlogStaticContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>(initialBlogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category") || null,
  );
  const [currentPage, setCurrentPage] = useState(1);

  // Get selected category name for display
  const selectedCategoryName = selectedCategory
    ? categories.find((c) => c._id === selectedCategory)?.name
    : null;

  // Check if any filters are active
  const hasActiveFilters = searchQuery || selectedCategory;

  // Initialize from URL params and sync pagination with filters
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    const searchFromUrl = searchParams.get("search");
    const pageFromUrl = searchParams.get("page");

    setSelectedCategory(categoryFromUrl);
    setSearchQuery(searchFromUrl || "");

    // Parse page from URL, default to 1
    const newPage = pageFromUrl ? parseInt(pageFromUrl, 10) : 1;
    setCurrentPage(newPage);
  }, [searchParams]);

  useEffect(() => {
    if (!initialBlogs) return;

    let filtered = initialBlogs;

    // Filter by search query (search in title, excerpt, content, and tags)
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((blog) => {
        const titleMatch = blog.title.toLowerCase().includes(lowerQuery);
        const excerptMatch = blog.excerpt?.toLowerCase().includes(lowerQuery);
        const contentMatch = blog.content?.toLowerCase().includes(lowerQuery);
        const tagMatch = blog.tags?.some((tag) =>
          tag.name.toLowerCase().includes(lowerQuery),
        );

        return titleMatch || excerptMatch || contentMatch || tagMatch;
      });
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (blog) => blog.category?._id === selectedCategory,
      );
    }

    setFilteredBlogs(filtered);
  }, [initialBlogs, searchQuery, selectedCategory]);

  function handleCategoryChange(category: string | null) {
    // Update URL with new category and reset to page 1
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    params.set("page", "1");
    const queryString = params.toString();
    const newUrl = queryString ? `/blog?${queryString}` : "/blog";
    router.replace(newUrl, { scroll: false });
  }

  function handlePageChange(page: number) {
    // Update URL with new page
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    const queryString = params.toString();
    const newUrl = queryString ? `/blog?${queryString}` : "/blog";
    router.replace(newUrl, { scroll: false });
  }

  // Clear all filters
  function clearAllFilters() {
    router.replace("/blog", { scroll: false });
  }

  // Stable search handler that doesn't depend on searchParams
  // This prevents SearchInput from triggering on every URL change
  const onSearchHandler = useCallback(
    (query: string) => {
      // Build URL params from current state, not from searchParams
      const params = new URLSearchParams();
      if (query) {
        params.set("search", query);
      }
      if (selectedCategory) {
        params.set("category", selectedCategory);
      }
      params.set("page", "1");
      const queryString = params.toString();
      const newUrl = queryString ? `/blog?${queryString}` : "/blog";
      router.replace(newUrl, { scroll: false });
    },
    [selectedCategory, router],
  );

  // Calculate pagination values
  const totalBlogs = filteredBlogs.length;
  const totalPages = Math.ceil(totalBlogs / BLOGS_PER_PAGE);
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const endIndex = startIndex + BLOGS_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

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
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Active Filters & Results Info */}
        <div className="flex flex-col gap-4 border-4 border-foreground bg-primary p-4 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] sm:flex-row sm:items-center sm:justify-between">
          {/* Active Filters */}
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

          {/* Results Count */}
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
      <BlogList blogs={paginatedBlogs} isLoading={false} error={undefined} />

      {/* Empty State with Filters */}
      {totalBlogs === 0 && hasActiveFilters && (
        <div className="mt-8 flex flex-col items-center justify-center border-4 border-foreground bg-card py-20 text-center shadow-[12px_12px_0px_0px_hsl(var(--foreground))]">
          <div className="mb-6 border-4 border-foreground bg-muted p-6 shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
            <Search className="h-12 w-12 stroke-[3] text-foreground" />
          </div>
          <h3 className="mb-4 text-3xl font-black uppercase tracking-tight text-foreground">
            NO ARTICLES FOUND
          </h3>
          <p className="mb-8 max-w-lg text-lg font-bold text-foreground">
            WE COULDN&apos;T FIND ANY ARTICLES MATCHING YOUR SEARCH CRITERIA.
            TRY ADJUSTING YOUR FILTERS OR SEARCH QUERY.
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
