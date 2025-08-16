'use client'

import { SiGithub } from "@icons-pack/react-simple-icons";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { ExternalLink, Monitor, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Project, urlFor } from "@/lib/sanity";

interface ProjectsStaticListProps {
  initialProjects: Project[]
}

export default function ProjectsStaticList({ initialProjects }: ProjectsStaticListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!initialProjects || initialProjects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-auto rounded-md bg-slate-100 dark:bg-slate-800 px-6 py-4 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No projects found
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Projects will appear here once they're added to the CMS.
          </p>
        </div>
      </div>
    );
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
            <m.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group overflow-hidden rounded-lg bg-card shadow-lg transition-all hover:shadow-xl"
            >
              <Link href={`/projects/${project.slug.current}`}>
                <div className="relative overflow-hidden">
                  <Image
                    src={project.coverImage ? urlFor(project.coverImage).width(400).height(250).url() : "/no-image.png"}
                    width={400}
                    height={250}
                    className="h-60 w-full object-cover transition-transform group-hover:scale-105"
                    alt={`${project.title} project`}
                  />
                  {project.status && (
                    <div className="absolute top-3 right-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                        project.status === 'completed' 
                          ? 'bg-success text-success-foreground'
                          : project.status === 'in-progress'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {project.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-6">
                <Link href={`/projects/${project.slug.current}`}>
                  <h3 className="mb-2 text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </Link>
                
                <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
                  {project.shortDescription || project.description}
                </p>

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="tag text-xs">
                        #{tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Project Links */}
                <div className="flex gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 rounded bg-primary px-2 py-1 text-xs text-white transition-all hover:bg-primary/90"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={12} /> Live
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 rounded bg-secondary px-2 py-1 text-xs text-white transition-all hover:bg-secondary/90"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Monitor size={12} /> Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 rounded bg-gray-600 px-2 py-1 text-xs text-white transition-all hover:bg-gray-500"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <SiGithub size={12} /> Code
                    </a>
                  )}
                </div>

                {/* Completion Date */}
                {project.completedAt && (
                  <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar size={12} />
                    <span>
                      {new Date(project.completedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short'
                      })}
                    </span>
                  </div>
                )}
              </div>
            </m.div>
          ))}
        </div>

        {filteredProjects.length === 0 && selectedCategory !== 'all' && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No projects found in the "{selectedCategory}" category.
            </p>
          </div>
        )}
      </div>
    </LazyMotion>
  );
}