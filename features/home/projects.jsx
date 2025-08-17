'use client'

import { LazyMotion, domAnimation, m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedProjects } from "@/services/projects";
import ProjectCard from "@/components/ui/project-card";
import LoadingState from "@/components/ui/loading-state";
import EmptyState from "@/components/ui/empty-state";

export default function Projects() {
  
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchFeaturedProjects,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingState count={3} variant="container" />;
  }

  if (error) {
    return (
      <div className="container">
        <h2 className="title-section font-title">projects</h2>
        <EmptyState variant="error" />
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="container">
        <h2 className="title-section font-title">projects</h2>
        <EmptyState />
      </div>
    );
  }
  return (
    <LazyMotion features={domAnimation}>
      <section id="projects" className="relative py-20 lg:py-32 overflow-hidden">
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
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
              variant="home"
              showStatus={false}
              showCompletionDate={false}
            />
          ))}
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
