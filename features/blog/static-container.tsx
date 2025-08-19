'use client'

import React from "react";
import { BlogPost } from "@/lib/sanity";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BlogList from "./blog-list";
import SearchInput from "@/components/ui/search-input";
import BlogCategoryNav from "@/components/blog-category-nav";

interface BlogStaticContainerProps {
  initialBlogs: BlogPost[]
}

export default function BlogStaticContainer({ initialBlogs }: BlogStaticContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>(initialBlogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  // Initialize from URL params
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    const searchFromUrl = searchParams.get('search');
    
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    if (initialBlogs) {
      setFilteredBlogs(initialBlogs);
      
      // Extract unique categories from all blog posts
      const categories = new Set<string>();
      initialBlogs.forEach(blog => {
        if (blog.tags) {
          blog.tags.forEach(tag => categories.add(tag));
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
      filtered = filtered.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((blog) =>
        blog.tags?.includes(selectedCategory)
      );
    }

    setFilteredBlogs(filtered);
  }, [initialBlogs, searchQuery, selectedCategory]);

  function handleSearch(query: string) {
    setSearchQuery(query);
    updateUrl({ search: query, category: selectedCategory });
  }

  function handleCategoryChange(category: string | null) {
    setSelectedCategory(category);
    updateUrl({ search: searchQuery, category });
  }

  function updateUrl({ search, category }: { search: string; category: string | null }) {
    const params = new URLSearchParams();
    
    if (search) {
      params.set('search', search);
    }
    if (category) {
      params.set('category', category);
    }
    
    const queryString = params.toString();
    const newUrl = queryString ? `/blog?${queryString}` : '/blog';
    
    router.replace(newUrl, { scroll: false });
  }

  return (
    <section className="container pt-40">
      <div className="mb-6">
        <div className="mb-4 flex flex-col justify-between sm:flex-row">
          <h1 className="mb-4 text-3xl font-bold text-slate-100">Blog</h1>
          <div className="sm:w-64">
            <SearchInput
              name="search"
              placeholder="Search articles..."
              type="text"
              onSearch={handleSearch}
            />
          </div>
        </div>
        
        {availableCategories.length > 0 && (
          <BlogCategoryNav
            categories={availableCategories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        )}
      </div>
      <BlogList
        blogs={filteredBlogs}
        isLoading={false}
        error={undefined}
      />
    </section>
  );
}