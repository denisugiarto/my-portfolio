"use client";

import React from "react";
import { BlogPost } from "@/lib/sanity";
import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BlogList from "./blog-list";
import SearchInput from "@/components/ui/search-input";
import BlogCategoryNav from "@/components/blog-category-nav";
import { Pagination, PaginationInfo } from "@/components/ui/pagination";

interface BlogStaticContainerProps {
  initialBlogs: BlogPost[];
}

const BLOGS_PER_PAGE = 6;

export default function BlogStaticContainer({
  initialBlogs,
}: BlogStaticContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>(initialBlogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category") || null,
  );
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize from URL params
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    const searchFromUrl = searchParams.get("search");
    const pageFromUrl = searchParams.get("page");

    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
    if (pageFromUrl) {
      const page = parseInt(pageFromUrl, 10);
      if (page > 0) {
        setCurrentPage(page);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (initialBlogs) {
      // Extract unique categories from all blog posts
      const categories = new Set<string>();
      initialBlogs.forEach((blog) => {
        if (blog.tags) {
          blog.tags.forEach((tag) => categories.add(tag.name));
        }
      });
      setAvailableCategories(Array.from(categories).sort());
    }
  }, []);

  useEffect(() => {
    if (!initialBlogs) return;

    let filtered = initialBlogs;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (blog) => blog.tags?.some((tag) => tag.name === selectedCategory),
      );
    }

    setFilteredBlogs(filtered);

    // Reset to page 1 when filters change
    setCurrentPage(1);
  }, [initialBlogs, searchQuery, selectedCategory]);

  function handleSearch(query: string) {
    setSearchQuery(query);
    setCurrentPage(1);
    updateUrl({ search: query, category: selectedCategory, page: 1 });
  }

  function handleCategoryChange(category: string | null) {
    setSelectedCategory(category);
    setCurrentPage(1);
    updateUrl({ search: searchQuery, category, page: 1 });
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
    updateUrl({ search: searchQuery, category: selectedCategory, page });
  }

  function updateUrl({
    search,
    category,
    page,
  }: {
    search: string;
    category: string | null;
    page: number;
  }) {
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
  }

  // Calculate pagination values
  const totalBlogs = filteredBlogs.length;
  const totalPages = Math.ceil(totalBlogs / BLOGS_PER_PAGE);
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const endIndex = startIndex + BLOGS_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);
  const onSearchHandler = useCallback((query: string) => {
    handleSearch(query);
  }, []);

  return (
    <section className="container max-w-3xl pt-40">
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
          categories={availableCategories}
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
