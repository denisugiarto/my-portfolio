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
  // Memoize category styles to prevent re-renders
  const categoryStyles = useMemo(() => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-500 text-white",
      green: "bg-green-500 text-white",
      red: "bg-red-500 text-white",
      yellow: "bg-yellow-500 text-black",
      purple: "bg-purple-500 text-white",
      pink: "bg-pink-500 text-white",
      indigo: "bg-indigo-500 text-white",
      gray: "bg-gray-500 text-white",
    };

    return categories.map((category) => {
      const isSelected = selectedCategory === category._id;
      
      let style: { style?: React.CSSProperties; className: string } = { className: "" };
      
      if (isSelected && category.color === "other" && category.customColor) {
        style = {
          style: { backgroundColor: category.customColor, color: "white" },
          className: "",
        };
      } else if (isSelected && category.color && category.color !== "other") {
        style = { className: colorMap[category.color] || "" };
      } else if (isSelected) {
        style = { className: "bg-primary text-primary-foreground" };
      }
      
      return { category, style, isSelected };
    });
  }, [categories, selectedCategory]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 md:gap-3">
        {/* All categories button */}
        <Button
          type="button"
          onClick={() => onCategoryChange(null)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-none border-[3px] border-foreground px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-none md:gap-2 md:px-4 md:py-2 md:text-sm",
            selectedCategory === null
              ? "bg-primary text-primary-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))]"
              : "bg-background text-foreground hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_hsl(var(--foreground))]"
          )}
        >
          <LayoutGrid className="h-4 w-4 md:h-5 md:w-5 stroke-[3]" />
          All
        </Button>

        {/* Category buttons */}
        {categoryStyles.map(({ category, style, isSelected }) => (
          <Button
            type="button"
            key={category._id}
            onClick={() => onCategoryChange(category._id)}
            style={style.style}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-none border-[3px] border-foreground px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-none md:gap-2 md:px-4 md:py-2 md:text-sm",
              isSelected
                ? "shadow-[4px_4px_0px_0px_hsl(var(--foreground))]"
                : "bg-background text-foreground hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_hsl(var(--foreground))]",
              style.className
            )}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
