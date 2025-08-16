'use client'

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface BlogCategoryNavProps {
  categories: string[]
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
}

export default function BlogCategoryNav({
  categories,
  selectedCategory,
  onCategoryChange,
}: BlogCategoryNavProps) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">
        Filter by category
      </h3>
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedCategory === null ? "default" : "secondary"}
          className={cn(
            "cursor-pointer transition-all duration-200 hover:scale-105",
            selectedCategory === null 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-primary/20"
          )}
          onClick={() => onCategoryChange(null)}
        >
          All
        </Badge>
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "secondary"}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:scale-105",
              selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "hover:bg-primary/20"
            )}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  )
}