"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";

const ExperienceHero = () => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative pb-4 pt-20 lg:pt-12">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient
                id="hero-gradient1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(34, 197, 94, 0.1)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
              </linearGradient>
              <linearGradient
                id="hero-gradient2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(168, 85, 247, 0.08)" />
                <stop offset="100%" stopColor="rgba(34, 197, 94, 0.08)" />
              </linearGradient>
            </defs>

            <m.circle
              cx="200"
              cy="200"
              r="100"
              fill="url(#hero-gradient1)"
              initial={{ scale: 0.8, opacity: 0.3 }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.6, 0.3],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <m.circle
              cx="800"
              cy="300"
              r="80"
              fill="url(#hero-gradient2)"
              initial={{ scale: 0.9, opacity: 0.4 }}
              animate={{
                scale: [0.9, 1.1, 0.9],
                opacity: [0.4, 0.7, 0.4],
                x: [0, -40, 0],
                y: [0, 25, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
        </div>

        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <m.h1
              className="mb-6 font-bold text-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Professional
              <span className="block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-4xl text-transparent md:text-5xl">
                Experience
              </span>
            </m.h1>

            <m.p
              className="text-xl leading-relaxed text-muted-foreground md:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              A journey through my career, showcasing the roles, achievements,
              and technologies that have shaped my professional growth and
              expertise.
            </m.p>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default ExperienceHero;
