"use client";

import React from "react";
import { BlogPost, BlogCategory } from "@/lib/sanity";
import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BlogList from "./blog-list";
import SearchInput from "@/components/ui/search-input";
import BlogCategoryNav from "@/components/blog-category-nav";
import { Pagination, PaginationInfo } from "@/components/ui/pagination";

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

  // Initialize from URL params
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    const searchFromUrl = searchParams.get("search");
    const pageFromUrl = searchParams.get("page");

    setSelectedCategory(categoryFromUrl);
    setSearchQuery(searchFromUrl || "");
    setCurrentPage(pageFromUrl ? parseInt(pageFromUrl, 10) : 1);
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
    // Only update URL, let useEffect handle state changes
    updateUrl({ search: searchQuery, category, page: 1 });
  }

  function handlePageChange(page: number) {
    // Only update URL, let useEffect handle state changes
    updateUrl({ search: searchQuery, category: selectedCategory, page });
  }

  const updateUrl = useCallback(
    ({
      search,
      category,
      page,
    }: {
      search: string;
      category: string | null;
      page: number;
    }) => {
      const params = new URLSearchParams(searchParams.toString());

      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      if (category) {
        params.set("category", category);
      } else {
        params.delete("category");
      }

      if (page) {
        params.set("page", page.toString());
      } else {
        params.delete("page");
      }

      const queryString = params.toString();
      const newUrl = queryString ? `/blog?${queryString}` : "/blog";

      router.replace(newUrl, { scroll: false });
    },
    [router, searchParams],
  );

  // Calculate pagination values
  const totalBlogs = filteredBlogs.length;
  const totalPages = Math.ceil(totalBlogs / BLOGS_PER_PAGE);
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const endIndex = startIndex + BLOGS_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);
  const onSearchHandler = useCallback(
    (query: string) => {
      // Only update URL, let useEffect handle state changes
      updateUrl({ search: query, category: selectedCategory, page: 1 });
    },
    [selectedCategory, updateUrl],
  );

  return (
    <section className="container max-w-6xl pt-40">
      <div className="mb-6">
        <div className="mb-4 flex flex-col justify-between sm:flex-row">
          <h1 className="mb-4 text-3xl font-bold dark:text-slate-100 ">Blog</h1>
          <div className="sm:w-64">
            <SearchInput
              name="search"
              placeholder="Search articles..."
              type="text"
              onSearch={onSearchHandler}
            />
          </div>
        </div>

        <BlogCategoryNav
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Show pagination info */}
        {totalBlogs > 0 && (
          <div className="mt-4 flex items-center justify-between">
            <PaginationInfo
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalBlogs}
              itemsPerPage={BLOGS_PER_PAGE}
            />
          </div>
        )}
      </div>

      <BlogList blogs={paginatedBlogs} isLoading={false} error={undefined} />

      {/* Pagination */}
      <div className="mt-12">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mb-8"
        />
      </div>
    </section>
  );
}
