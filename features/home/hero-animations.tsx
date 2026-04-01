"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { ReactNode } from "react";

interface HeroAnimationsProps {
  children: ReactNode;
}

export function HeroAnimations({ children }: HeroAnimationsProps) {
  return (
    <LazyMotion features={domAnimation}>
      <section
        id="home"
        className="relative flex flex-col justify-center overflow-hidden pb-12 pt-24 text-center lg:pb-24 lg:pt-36"
      >
        <div className="container relative z-10 mx-auto">{children}</div>
      </section>
    </LazyMotion>
  );
}

interface AnimatedTextProps {
  children: ReactNode;
  delay?: number;
}

export function AnimatedText({ children, delay = 0 }: AnimatedTextProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}

export function AnimatedContent({ children, delay = 0.2 }: AnimatedTextProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}

interface AnimatedTechStackProps {
  techs: Array<{
    icon: any;
    name: string;
    color: string;
  }>;
}

export function AnimatedTechStack({ techs }: AnimatedTechStackProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
      className="mt-16"
    >
      <p className="mb-4 inline-block border-2 border-foreground bg-accent px-2 py-1 text-sm font-black uppercase tracking-[0.2em] text-accent-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
        CORE STACK
      </p>
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-4 border-4 border-foreground bg-card px-6 py-8 shadow-[8px_8px_0px_0px_hsl(var(--foreground))] md:gap-6 md:px-10">
        {techs.map((tech, index) => (
          <m.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.4 + index * 0.03 }}
            className="flex cursor-default items-center gap-2 border-2 border-foreground bg-background px-4 py-3 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-none hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))]"
          >
            <tech.icon
              className="h-6 w-6 md:h-7 md:w-7"
              style={{ color: tech.color }}
            />
            <span className="text-sm font-bold uppercase tracking-wider text-foreground md:text-base">
              {tech.name}
            </span>
          </m.div>
        ))}
      </div>
    </m.div>
  );
}
