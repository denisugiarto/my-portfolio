"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness } from "lucide-react";

const ExperienceHero = () => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative overflow-hidden px-4 pb-8 pt-24 sm:px-6 lg:px-8">
        <div className="container relative z-10">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/"
              className="mb-8 font-bold uppercase tracking-wider inline-flex items-center gap-2 border-2 border-foreground bg-background px-4 py-2 text-sm text-foreground transition-none shadow-[2px_2px_0px_0px_hsl(var(--foreground))] hover:shadow-[0px_0px_0px_0px_hsl(var(--foreground))] hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              <ArrowLeft className="h-4 w-4" />
              BACK TO HOME
            </Link>

            <div className="overflow-hidden border-4 border-foreground bg-card shadow-[8px_8px_0px_0px_hsl(var(--foreground))]">
              <div className="px-6 py-10 sm:px-8 sm:py-12 lg:px-12 bg-secondary">
                <div className="mx-auto max-w-3xl">
                  <m.div
                    className="mb-6 inline-flex items-center gap-2 border-2 border-foreground bg-primary px-3 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-primary-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    <BriefcaseBusiness className="h-4 w-4" />
                    CAREER JOURNEY
                  </m.div>

                  <m.h1
                    className="text-balance font-title text-5xl font-black uppercase tracking-tight text-foreground md:text-6xl md:leading-[1.1]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    EXPERIENCE THAT SHAPED HOW I BUILD, LEAD, AND DELIVER.
                  </m.h1>

                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                  >
                    <p className="mt-8 font-bold max-w-2xl text-lg leading-relaxed text-foreground md:text-xl border-l-4 border-primary pl-4 bg-background p-4 shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
                      A closer look at the teams, roles, and outcomes behind my work, with the context needed to understand both scope and impact.
                    </p>
                  </m.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default ExperienceHero;
