interface LoadingStateProps {
  count?: number;
  variant?: "grid" | "container";
}

export default function LoadingState({
  count = 6,
  variant = "grid",
}: LoadingStateProps) {
  const skeletonItems = [...Array(count)].map((_, index) => (
    <div key={index} className="animate-pulse">
      <div className="h-60 w-full rounded-lg bg-gray-300 dark:bg-gray-700"></div>
      <div className="space-y-2 py-4">
        <div className="h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
        <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-700"></div>
        <div className="h-4 w-2/3 rounded bg-gray-300 dark:bg-gray-700"></div>
      </div>
    </div>
  ));

  if (variant === "container") {
    return (
      <div className="container">
        <h2 className="title-section font-title">projects</h2>
        <div className="grid justify-between gap-8 md:grid-cols-2 xl:grid-cols-3">
          {skeletonItems}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {skeletonItems}
    </div>
  );
}
