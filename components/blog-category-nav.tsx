"use client";

import { cn } from "@/lib/utils";
import { BlogCategory } from "@/lib/sanity";
import { LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

interface BlogCategoryNavProps {
  categories: BlogCategory[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function BlogCategoryNav({
  categories,
  selectedCategory,
  onCategoryChange,
}: BlogCategoryNavProps) {

  return (
    <div>
      <div className="flex flex-wrap gap-2 md:gap-3">
        {/* All categories button */}
        <Button
          type="button"
          size='sm'
          onClick={() => onCategoryChange(null)}
          color={selectedCategory === null ? 'primary' : 'white'}
        >
          <LayoutGrid className="h-4 w-4 stroke-[3] md:h-5 md:w-5" />
          All
        </Button>

        {/* Category buttons */}
        {categories.map((category) => (
          <Button
            type="button"
            variant='default'
            size='sm'
            color={selectedCategory === category._id ? 'primary' : 'white'}
            key={category._id}
            onClick={() => onCategoryChange(category._id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
