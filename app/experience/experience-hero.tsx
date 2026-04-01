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
              className="mb-6 inline-flex items-center gap-2 border-[3px] border-foreground bg-background px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))] transition-none hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[0px_0px_0px_0px_hsl(var(--foreground))] md:mb-8 md:border-4 md:px-4 md:py-2 md:text-sm md:shadow-[4px_4px_0px_0px_hsl(var(--foreground))]"
            >
              <ArrowLeft className="h-4 w-4" />
              BACK TO HOME
            </Link>

            <div className="overflow-hidden border-[3px] border-foreground bg-card shadow-[4px_4px_0px_0px_hsl(var(--foreground))] md:border-4 md:shadow-[8px_8px_0px_0px_hsl(var(--foreground))]">
              <div className="bg-secondary p-5 sm:p-8 lg:p-12">
                <div className="mx-auto max-w-3xl">
                  <m.div
                    className="mb-4 inline-flex items-center gap-2 border-2 border-foreground bg-primary px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))] md:mb-6 md:px-3 md:py-1.5 md:text-xs"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    <BriefcaseBusiness className="h-4 w-4" />
                    CAREER JOURNEY
                  </m.div>

                  <m.h1
                    className="text-balance font-title text-xl font-black uppercase tracking-tight text-foreground sm:text-2xl md:text-3xl md:leading-[1.1] lg:text-4xl"
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
                    <p className="mt-6 max-w-2xl border-l-4 border-primary bg-background p-3 pl-3 text-sm font-bold leading-relaxed text-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] md:mt-8 md:p-4 md:pl-4 md:text-lg lg:text-xl">
                      A closer look at the teams, roles, and outcomes behind my
                      work, with the context needed to understand both scope and
                      impact.
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
