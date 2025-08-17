interface EmptyStateProps {
  title?: string;
  description?: string;
  showStudioLink?: boolean;
  variant?: 'error' | 'empty' | 'category';
  categoryName?: string;
}

export default function EmptyState({ 
  title = "No projects found",
  description = "Projects will appear here once they're added to the CMS.",
  showStudioLink = true,
  variant = 'empty',
  categoryName
}: EmptyStateProps) {
  if (variant === 'error') {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400">
          Error loading projects. Please try again later.
        </p>
      </div>
    );
  }

  if (variant === 'category') {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No projects found in the "{categoryName}" category.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <div className="mx-auto w-auto rounded-md bg-slate-100 dark:bg-slate-800 px-6 py-4 text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
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