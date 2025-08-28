"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { ReactNode } from "react";

interface ProjectsAnimationsProps {
  children: ReactNode;
}

export function ProjectsAnimations({ children }: ProjectsAnimationsProps) {
  return (
    <LazyMotion features={domAnimation}>
      <section id="projects" className="relative">
        {/* Optimized SVG Background for Projects */}
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
            style={{ willChange: "transform" }}
          >
            <defs>
              <linearGradient
                id="proj-gradient1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(139, 69, 19, 0.06)" />
                <stop offset="100%" stopColor="rgba(245, 158, 11, 0.06)" />
              </linearGradient>
              <linearGradient
                id="proj-gradient2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0.04)" />
                <stop offset="100%" stopColor="rgba(139, 69, 19, 0.04)" />
              </linearGradient>
            </defs>

            {/* Simplified floating elements */}
            <m.rect
              x="100"
              y="200"
              width="120"
              height="80"
              rx="8"
              fill="url(#proj-gradient1)"
              initial={{ rotate: 5, opacity: 0.3 }}
              animate={{ rotate: [5, -3, 5], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <m.rect
              x="700"
              y="500"
              width="150"
              height="90"
              rx="12"
              fill="url(#proj-gradient2)"
              initial={{ rotate: -8, opacity: 0.3 }}
              animate={{ rotate: [-8, 4, -8], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            <m.rect
              x="300"
              y="100"
              width="200"
              height="120"
              rx="10"
              fill="none"
              stroke="rgba(99, 102, 241, 0.15)"
              strokeWidth="2"
              strokeDasharray="5,5"
              animate={{ strokeDashoffset: [0, 30] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />

            <m.circle
              cx="150"
              cy="600"
              r="40"
              fill="none"
              stroke="rgba(245, 158, 11, 0.15)"
              strokeWidth="2"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>

        {/* Main content container */}
        <div className="container relative z-10">{children}</div>
      </section>
    </LazyMotion>
  );
}

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
}

export function AnimatedProjectSection({
  children,
  delay = 0.5,
}: AnimatedSectionProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {children}
    </m.div>
  );
}

interface AnimatedProjectGridProps {
  children: ReactNode;
}

export function AnimatedProjectGrid({ children }: AnimatedProjectGridProps) {
  return (
    <m.div
      className="grid justify-between gap-8 md:grid-cols-2 xl:grid-cols-3"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {children}
    </m.div>
  );
}

interface AnimatedViewAllProps {
  children: ReactNode;
}

export function AnimatedViewAll({ children }: AnimatedViewAllProps) {
  return (
    <m.div
      className="mt-14 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {children}
    </m.div>
  );
}
