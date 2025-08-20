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
        className="relative mx-auto max-w-4xl pt-20 lg:pt-32 text-center px-4 min-h-screen flex flex-col justify-center"
      >
        {/* Optimized SVG Background */}
        <div className="pointer-events-none absolute inset-0">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
            style={{ willChange: 'transform' }}
          >
            <defs>
              <linearGradient id="hero-gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.08)" />
                <stop offset="50%" stopColor="rgba(147, 51, 234, 0.08)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.08)" />
              </linearGradient>
              <linearGradient id="hero-gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(147, 51, 234, 0.04)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.04)" />
              </linearGradient>
              <pattern id="hero-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Optimized floating shapes with reduced complexity */}
            <m.circle
              cx="200" cy="200" r="120"
              fill="url(#hero-gradient1)"
              initial={{ scale: 0.9, opacity: 0.4 }}
              animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <m.polygon
              points="800,150 850,250 750,250"
              fill="url(#hero-gradient2)"
              initial={{ rotate: 0, opacity: 0.3 }}
              animate={{ rotate: [0, 360], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            <m.rect
              x="150" y="600" width="120" height="120" rx="15"
              fill="url(#hero-gradient1)"
              initial={{ rotate: 45, opacity: 0.3 }}
              animate={{ rotate: [45, 225, 45], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>
        
        {/* Main content container */}
        <div className="relative z-10">
          {children}
        </div>
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}

export function AnimatedContent({ children, delay = 0.2 }: AnimatedTextProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}

interface AnimatedTechStackProps {
  techs: Array<{
    icon: any;
    name: string;
    color: string; // Now expects hex color values
  }>;
}

export function AnimatedTechStack({ techs }: AnimatedTechStackProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
      className="mt-8"
    >
      <p className="mb-6 text-sm text-gray-400">Technologies I work with</p>
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 dark:bg-slate-600/10 bg-slate-700 backdrop-blur-md border border-black/20 dark:border-white/20 py-6 rounded-2xl">
        {techs.map((tech, index) => (
          <m.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
            className="flex items-center gap-2 hover:scale-110 transition-transform cursor-default"
          >
            <tech.icon className="h-5 w-5 md:h-6 md:w-6" style={{ color: tech.color }} />
            <span className="text-xs md:text-sm text-gray-100 hidden sm:inline">{tech.name}</span>
          </m.div>
        ))}
      </div>
    </m.div>
  );
}