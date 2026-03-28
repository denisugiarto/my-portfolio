"use client";

import { cn } from "@/lib/utils";
import { BlogCategory } from "@/lib/sanity";
import * as LucideIcons from "lucide-react";

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
  const getIconComponent = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className="h-4 w-4" /> : null;
  };

  const getCategoryStyle = (category: BlogCategory, isSelected: boolean) => {
    // For selected state with custom color
    if (isSelected && category.color === "other" && category.customColor) {
      return {
        backgroundColor: category.customColor,
        color: "white",
        borderColor: category.customColor,
      };
    }

    // For selected state with predefined color
    if (isSelected && category.color && category.color !== "other") {
      const colorMap: Record<string, string> = {
        blue: "bg-blue-500 border-blue-500 text-white",
        green: "bg-green-500 border-green-500 text-white",
        red: "bg-red-500 border-red-500 text-white",
        yellow: "bg-yellow-500 border-yellow-500 text-white",
        purple: "bg-purple-500 border-purple-500 text-white",
        pink: "bg-pink-500 border-pink-500 text-white",
        indigo: "bg-indigo-500 border-indigo-500 text-white",
        gray: "bg-gray-500 border-gray-500 text-white",
      };
      return { className: colorMap[category.color] };
    }

    // Default selected state
    if (isSelected) {
      return { className: "bg-primary border-primary text-primary-foreground" };
    }

    // Unselected state
    return { className: "bg-transparent border-border hover:bg-muted hover:border-primary/30" };
  };

  return (
    <div className="mb-6">
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        Filter by category
      </h3>
      <div className="flex flex-wrap gap-2">
        {/* All categories button */}
        <button
          onClick={() => onCategoryChange(null)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
            selectedCategory === null
              ? "bg-primary border-primary text-primary-foreground shadow-sm"
              : "bg-transparent border-border hover:bg-muted hover:border-primary/30"
          )}
        >
          <LucideIcons.LayoutGrid className="h-4 w-4" />
          All
        </button>

        {/* Category buttons */}
        {categories.map((category) => {
          const isSelected = selectedCategory === category._id;
          const Icon = getIconComponent(category.icon);
          const style = getCategoryStyle(category, isSelected);

          return (
            <button
              key={category._id}
              onClick={() => onCategoryChange(category._id)}
              style={style.style}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                style.className
              )}
            >
              {Icon}
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
