'use client'

import { SiGithub } from "@icons-pack/react-simple-icons";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/services/projects";
import { urlFor } from "@/lib/sanity";

export default function Projects() {
  
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="container">
        <h2 className="title-section font-title">projects</h2>
        <div className="grid justify-between gap-8 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-60 w-full rounded-lg bg-gray-300 dark:bg-gray-700"></div>
              <div className="py-4 space-y-2">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h2 className="title-section font-title">projects</h2>
        <div className="text-center py-12">
          <p className="text-red-600 dark:text-red-400">
            Error loading projects. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="container">
        <h2 className="title-section font-title">projects</h2>
        <div className="text-center py-12">
          <div className="mx-auto w-auto rounded-md bg-slate-100 dark:bg-slate-800 px-6 py-4 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Projects will appear here once they're added to the CMS.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Visit Sanity Studio to add your projects.
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* SVG Background for Projects */}
        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="proj-gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(139, 69, 19, 0.08)" />
                <stop offset="100%" stopColor="rgba(245, 158, 11, 0.08)" />
              </linearGradient>
              <linearGradient id="proj-gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0.06)" />
                <stop offset="100%" stopColor="rgba(139, 69, 19, 0.06)" />
              </linearGradient>
            </defs>
            
            {/* Code blocks */}
            <m.rect
              x="100"
              y="200"
              width="120"
              height="80"
              rx="8"
              fill="url(#proj-gradient1)"
              initial={{ rotate: 5, opacity: 0.3 }}
              animate={{ 
                rotate: [5, -3, 5],
                opacity: [0.3, 0.6, 0.3],
                x: [0, 10, 0],
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <m.rect
              x="700"
              y="500"
              width="150"
              height="90"
              rx="12"
              fill="url(#proj-gradient2)"
              initial={{ rotate: -8, opacity: 0.4 }}
              animate={{ 
                rotate: [-8, 4, -8],
                opacity: [0.4, 0.7, 0.4],
                x: [0, -15, 0],
                y: [0, 10, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Floating project windows */}
            <m.rect
              x="300"
              y="100"
              width="200"
              height="120"
              rx="10"
              fill="none"
              stroke="rgba(99, 102, 241, 0.2)"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ rotate: 0 }}
              animate={{ 
                rotate: [0, 2, -2, 0],
                strokeDashoffset: [0, 10, 20, 30]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Gear wheels for development */}
            <m.circle
              cx="150"
              cy="600"
              r="40"
              fill="none"
              stroke="rgba(245, 158, 11, 0.2)"
              strokeWidth="3"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <m.circle
              cx="850"
              cy="200"
              r="30"
              fill="none"
              stroke="rgba(139, 69, 19, 0.25)"
              strokeWidth="2"
              initial={{ rotate: 0 }}
              animate={{ rotate: -360 }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Binary code rain */}
            {[...Array(15)].map((_, i) => (
              <m.text
                key={i}
                x={50 + (i * 60)}
                y={50}
                fill="rgba(34, 197, 94, 0.1)"
                fontSize="12"
                fontFamily="monospace"
                initial={{ y: 50, opacity: 0 }}
                animate={{ 
                  y: [50, 1000],
                  opacity: [0, 0.6, 0]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "linear"
                }}
              >
                {Math.random() > 0.5 ? '1' : '0'}
              </m.text>
            ))}
          </svg>
        </div>

        <m.div
          className="container relative z-10"
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
        <h2 className="title-section font-title">projects</h2>
        <div className="grid justify-between gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.slice(0, 3).map((project, index) => {
            return (
              <m.div
                className="transition-all ease-linear hover:scale-105 md:mr-4 md:hover:scale-110"
                key={project._id}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Link href={`/projects/${project.slug.current}`}>
                  <Image
                    src={project.coverImage ? urlFor(project.coverImage).width(420).height(300).url() : "/no-image.png"}
                    width={420}
                    height={300}
                    className="h-60 w-full rounded-lg object-cover shadow-lg transition-transform hover:scale-105"
                    alt={`${project.title} project`}
                  />
                </Link>
                <div className="py-4">
                  <Link href={`/projects/${project.slug.current}`}>
                    <h3 className="mb-2 text-xl font-bold capitalize text-slate-900 dark:text-slate-200 hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-base text-slate-600 dark:text-slate-300">
                    {project.shortDescription || project.description}
                  </p>
                  <div className="mt-4 flex gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="website link"
                        className="flex items-center gap-2 rounded-lg border bg-primary px-2 py-1 text-sm leading-none text-white shadow-md transition-all ease-in-out hover:scale-110"
                      >
                        <ExternalLink className="h-4 w-4" /> Web
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="demo link"
                        className="flex items-center gap-2 rounded-lg border bg-secondary px-2 py-1 text-sm leading-none text-white shadow-md transition-all ease-in-out hover:scale-110"
                      >
                        <ExternalLink className="h-4 w-4" /> Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="github repo"
                        className="flex items-center gap-2 rounded-lg border bg-primary px-2 py-1 text-sm leading-none text-white shadow-md transition-all ease-in-out hover:scale-110"
                      >
                        <SiGithub className="h-4 w-4" /> Repository
                      </a>
                    )}
                  </div>
                </div>
                <div className="pb-2 pt-0">
                  {project.technologies?.map((tech, techIndex) => {
                    return (
                      <span key={techIndex} className="tag">
                        #{tech}
                      </span>
                    );
                  })}
                </div>
              </m.div>
            );
          })}
        </div>
        <div className="mt-14 text-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-lg border-2 border-primary/50 bg-transparent px-8 py-4 font-semibold text-primary transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-primary hover:text-white"
          >
            View All Projects
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
        </m.div>
      </section>
    </LazyMotion>
  );
}
