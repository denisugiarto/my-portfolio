"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { ReactNode } from "react";

interface ProjectsAnimationsProps {
  children: ReactNode;
}

export function ProjectsAnimations({ children }: ProjectsAnimationsProps) {
  return (
    <LazyMotion features={domAnimation}>
      <section id="projects" className="relative py-8">
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
