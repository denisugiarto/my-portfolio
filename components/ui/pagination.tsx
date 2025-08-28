import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 5,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const delta = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const showStartEllipsis = visiblePages[0] > 1;
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages;

  return (
    <nav
      className={cn(
        "flex items-center justify-center space-x-2",
        className || "",
      )}
      aria-label="Pagination Navigation"
    >
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
          "border border-border hover:bg-muted",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent",
          currentPage === 1
            ? "text-muted-foreground"
            : "text-foreground hover:text-foreground",
        )}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Previous
      </button>

      {/* First Page + Ellipsis */}
      {showFirstLast && showStartEllipsis && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className={cn(
              "flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              "border border-border hover:bg-muted hover:text-foreground",
              currentPage === 1
                ? "border-primary bg-primary text-primary-foreground"
                : "text-muted-foreground",
            )}
            aria-label="Go to page 1"
          >
            1
          </button>
          <span className="flex items-center justify-center px-2 py-2 text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </span>
        </>
      )}

      {/* Visible Page Numbers */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={cn(
            "flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
            "border border-border hover:bg-muted hover:text-foreground",
            currentPage === page
              ? "border-primary bg-primary text-primary-foreground"
              : "text-muted-foreground",
          )}
          aria-label={`Go to page ${page}`}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      {/* Last Page + Ellipsis */}
      {showFirstLast && showEndEllipsis && (
        <>
          <span className="flex items-center justify-center px-2 py-2 text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </span>
          <button
            onClick={() => handlePageChange(totalPages)}
            className={cn(
              "flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              "border border-border hover:bg-muted hover:text-foreground",
              currentPage === totalPages
                ? "border-primary bg-primary text-primary-foreground"
                : "text-muted-foreground",
            )}
            aria-label={`Go to page ${totalPages}`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
          "border border-border hover:bg-muted",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent",
          currentPage === totalPages
            ? "text-muted-foreground"
            : "text-foreground hover:text-foreground",
        )}
        aria-label="Go to next page"
      >
        Next
        <ChevronRight className="ml-1 h-4 w-4" />
      </button>
    </nav>
  );
}

interface PaginationInfoProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  className?: string;
}

export function PaginationInfo({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  className,
}: PaginationInfoProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={cn("text-sm text-muted-foreground", className || "")}>
      Showing {startItem} to {endItem} of {totalItems} articles
    </div>
  );
}
