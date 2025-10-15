"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
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
    return IconComponent ? <IconComponent className="h-3 w-3" /> : null;
  };

  const getCategoryColor = (category: BlogCategory) => {
    if (category.color === "other" && category.customColor) {
      return category.customColor;
    }

    const colorMap: Record<string, string> = {
      blue: "bg-blue-500 hover:bg-blue-600",
      green: "bg-green-500 hover:bg-green-600",
      red: "bg-red-500 hover:bg-red-600",
      yellow: "bg-yellow-500 hover:bg-yellow-600",
      purple: "bg-purple-500 hover:bg-purple-600",
      pink: "bg-pink-500 hover:bg-pink-600",
      indigo: "bg-indigo-500 hover:bg-indigo-600",
      gray: "bg-gray-500 hover:bg-gray-600",
    };

    return category.color ? colorMap[category.color] : undefined;
  };

  return (
    <div className="mb-6">
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        Filter by category
      </h3>
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedCategory === null ? "default" : "secondary"}
          className={cn(
            "cursor-pointer transition-all duration-200 hover:scale-105",
            selectedCategory === null
              ? "bg-primary text-primary-foreground"
              : "hover:bg-primary/20",
          )}
          onClick={() => onCategoryChange(null)}
        >
          All
        </Badge>
        {categories.map((category) => {
          const isSelected = selectedCategory === category._id;
          const colorClass = getCategoryColor(category);
          const Icon = getIconComponent(category.icon);

          return (
            <Badge
              key={category._id}
              variant={isSelected ? "default" : "secondary"}
              className={cn(
                "cursor-pointer transition-all duration-200 hover:scale-105 gap-1",
                isSelected
                  ? colorClass || "bg-primary text-primary-foreground"
                  : "hover:bg-primary/20",
              )}
              style={
                isSelected && category.color === "other" && category.customColor
                  ? { backgroundColor: category.customColor, color: "white" }
                  : undefined
              }
              onClick={() => onCategoryChange(category._id)}
            >
              {Icon}
              {category.name}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
