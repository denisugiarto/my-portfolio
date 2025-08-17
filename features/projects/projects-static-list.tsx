'use client'

import { LazyMotion, domAnimation } from "framer-motion";
import { useState } from "react";
import { Project } from "@/lib/sanity";
import ProjectCard from "@/components/ui/project-card";
import EmptyState from "@/components/ui/empty-state";

interface ProjectsStaticListProps {
  initialProjects: Project[]
}

export default function ProjectsStaticList({ initialProjects }: ProjectsStaticListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!initialProjects || initialProjects.length === 0) {
    return <EmptyState showStudioLink={false} />;
  }

  // Get unique categories
  const categories = ['all', ...new Set(initialProjects.map(p => p.category).filter(Boolean))] as string[];
  
  // Filter projects by category
  const filteredProjects = selectedCategory === 'all' 
    ? initialProjects 
    : initialProjects.filter(p => p.category === selectedCategory);

  return (
    <LazyMotion features={domAnimation}>
      <div>
        {/* Category Filter */}
        {categories.length > 2 && (
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {category === 'all' ? 'All Projects' : category?.replace('-', ' ').toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
              variant="list"
            />
          ))}
        </div>

        {filteredProjects.length === 0 && selectedCategory !== 'all' && (
          <EmptyState variant="category" categoryName={selectedCategory} />
        )}
      </div>
    </LazyMotion>
  );
}