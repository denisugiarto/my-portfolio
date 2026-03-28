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
    <section className="container max-w-6xl pt-40">
      {/* Header Section */}
      <div className="mb-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground dark:text-slate-100">
              Blog
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Insights, tutorials, and thoughts on web development
            </p>
          </div>
          <div className="sm:w-72">
            <SearchInput
              name="search"
              placeholder="Search articles..."
              type="text"
              onSearch={onSearchHandler}
            />
          </div>
        </div>

        {/* Category Filter */}
        <BlogCategoryNav
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Active Filters & Results Info */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Filter size={14} />
                Active filters:
              </span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <Search size={12} />
                  "{searchQuery}"
                  <button
                    onClick={() => onSearchHandler("")}
                    className="ml-1 hover:text-primary/80"
                    aria-label="Clear search filter"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              {selectedCategoryName && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {selectedCategoryName}
                  <button
                    onClick={() => handleCategoryChange(null)}
                    className="ml-1 hover:text-primary/80"
                    aria-label="Clear category filter"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Results Count */}
          <div
            className={cn(
              "text-sm text-muted-foreground",
              hasActiveFilters ? "sm:text-right" : "",
            )}
          >
            {totalBlogs > 0 ? (
              <span>
                Showing{" "}
                <span className="font-medium text-foreground">
                  {startIndex + 1}-{Math.min(endIndex, totalBlogs)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">{totalBlogs}</span>{" "}
                {totalBlogs === 1 ? "article" : "articles"}
              </span>
            ) : (
              <span>No articles found</span>
            )}
          </div>
        </div>
      </div>

      {/* Blog List */}
      <BlogList blogs={paginatedBlogs} isLoading={false} error={undefined} />

      {/* Empty State with Filters */}
      {totalBlogs === 0 && hasActiveFilters && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 rounded-full bg-muted p-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            No articles found
          </h3>
          <p className="mb-4 max-w-md text-sm text-muted-foreground">
            We couldn't find any articles matching your search criteria. Try
            adjusting your filters or search query.
          </p>
          <Button variant="outline" onClick={clearAllFilters}>
            Clear all filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12">
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
