interface EmptyStateProps {
  title?: string;
  description?: string;
  showStudioLink?: boolean;
  variant?: "error" | "empty" | "category";
  categoryName?: string;
}

export default function EmptyState({
  title = "No projects found",
  description = "Projects will appear here once they're added to the CMS.",
  showStudioLink = true,
  variant = "empty",
  categoryName,
}: EmptyStateProps) {
  if (variant === "error") {
    return (
      <div className="py-12 text-center">
        <p className="text-red-600 dark:text-red-400">
          Error loading projects. Please try again later.
        </p>
      </div>
    );
  }

  if (variant === "category") {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">
          No projects found in the &quot;{categoryName}&quot; category.
        </p>
      </div>
    );
  }

  return (
    <div className="py-12 text-center">
      <div className="mx-auto w-auto rounded-md bg-slate-100 px-6 py-4 text-center dark:bg-slate-800">
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
        {showStudioLink && (
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Visit Sanity Studio to add your projects.
          </p>
        )}
      </div>
    </div>
  );
}
