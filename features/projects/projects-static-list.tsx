"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Grid3X3, Grid2X2 } from "lucide-react";
import { Project } from "@/lib/sanity";
import ProjectCard from "@/components/ui/project-card";
import EmptyState from "@/components/ui/empty-state";
import { Select } from "@/components/ui/select";

interface ProjectsStaticListProps {
  initialProjects: Project[];
}

export default function ProjectsStaticList({
  initialProjects,
}: ProjectsStaticListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");
  const [isLoading, setIsLoading] = useState(false);

  if (!initialProjects || initialProjects.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="mx-auto max-w-md">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Grid3X3 className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            No projects yet
          </h3>
          <p className="text-muted-foreground">
            Projects will appear here once they're added to the portfolio.
          </p>
        </div>
      </div>
    );
  }

  // Simulate loading when filters change
  const handleFilterChange = (callback: () => void) => {
    setIsLoading(true);
    setTimeout(() => {
      callback();
      setIsLoading(false);
    }, 300);
  };

  // Get unique categories
  const categories = [
    "all",
    ...new Set(initialProjects.map((p) => p.category).filter(Boolean)),
  ] as string[];

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered =
      selectedCategory === "all"
        ? initialProjects
        : initialProjects.filter((p) => p.category === selectedCategory);

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          project.technologies?.some((tech) =>
            tech.name.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.completedAt || b._id).getTime() -
            new Date(a.completedAt || a._id).getTime()
          );
        case "oldest":
          return (
            new Date(a.completedAt || a._id).getTime() -
            new Date(b.completedAt || b._id).getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [initialProjects, selectedCategory, searchQuery, sortBy]);

  return (
    <LazyMotion features={domAnimation}>
      <div>
        {/* Search and Filter Controls */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col-reverse md:flex-row-reverse items-center gap-4 justify-between">
            {/* Search Bar */}
            <div className="relative flex-grow w-full md:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col gap-2">
              {/* Category Filter */}
              {categories.length > 2 && (
                <>
                  <h3 className="text-center text-sm font-semibold text-foreground md:text-left">
                    Filter by Category
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                    {categories.map((category) => (
                      <m.button
                        key={category}
                        onClick={() =>
                          handleFilterChange(() =>
                            setSelectedCategory(category),
                          )
                        }
                        className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                          selectedCategory === category
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                            : "border border-border bg-card text-muted-foreground hover:border-accent hover:bg-accent hover:text-accent-foreground"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {category === "all"
                          ? "All Projects"
                          : category
                              ?.replace("-", " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </m.button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </m.div>

        {/* Projects Grid */}
        {isLoading ? (
          // Loading Skeleton
          <div
            className={`grid gap-4 sm:gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            }`}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="h-52 animate-pulse bg-muted"></div>
                <div className="p-6">
                  <div className="mb-3 h-6 animate-pulse rounded bg-muted"></div>
                  <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-muted"></div>
                  <div className="mb-4 h-4 w-1/2 animate-pulse rounded bg-muted"></div>
                  <div className="mb-4 flex gap-2">
                    <div className="h-6 w-16 animate-pulse rounded-full bg-muted"></div>
                    <div className="h-6 w-20 animate-pulse rounded-full bg-muted"></div>
                    <div className="h-6 w-14 animate-pulse rounded-full bg-muted"></div>
                  </div>
                  <div className="h-3 w-24 animate-pulse rounded bg-muted"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <m.div
            className={`grid gap-4 sm:gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project._id}
                project={project}
                index={index}
                variant="list"
              />
            ))}
          </m.div>
        ) : (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-16 text-center"
          >
            {searchQuery ? (
              <div className="mx-auto max-w-md">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  No projects found
                </h3>
                <p className="mb-4 text-muted-foreground">
                  No projects match your search for "{searchQuery}". Try
                  adjusting your search terms.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <EmptyState variant="category" categoryName={selectedCategory} />
            )}
          </m.div>
        )}
      </div>
    </LazyMotion>
  );
}
