"use client";

import { ListItem } from "@/components/ui/list";
import { urlFor } from "@/lib/sanity";
import {
  calculateDuration,
  fetchExperiences,
  formatDateRange,
} from "@/services/experience";
import { useQuery } from "@tanstack/react-query";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";

const ExperienceClient = () => {
  const {
    data: experiences,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["experiences"],
    queryFn: fetchExperiences,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <section className="relative pt-0">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="space-y-16">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-4 md:gap-8">
                    <div className="hidden h-16 w-16 flex-shrink-0 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800 md:block"></div>
                    <div className="flex-1 animate-pulse rounded-xl border border-border bg-card p-6 md:p-8">
                      <div className="space-y-4">
                        <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-800"></div>
                        <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-800"></div>
                        <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-800"></div>
                        <div className="space-y-2">
                          <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-800"></div>
                          <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-800"></div>
                          <div className="h-3 w-4/5 rounded bg-gray-200 dark:bg-gray-800"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative pt-0">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="py-12 text-center">
              <div className="mx-auto w-auto rounded-md border border-red-200 bg-red-50 px-6 py-4 dark:border-red-800 dark:bg-red-900/20">
                <h3 className="mb-2 text-lg font-semibold text-red-900 dark:text-red-100">
                  Error Loading Experience
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Unable to load experience data. Please try again later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!experiences || experiences.length === 0) {
    return (
      <section className="relative pt-0">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="py-12 text-center">
              <div className="mx-auto w-auto rounded-md border border-slate-200 bg-slate-100 px-6 py-4 dark:border-slate-700 dark:bg-slate-800">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  No Experience Found
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative pt-0">
        {/* Decorative Background */}
        <div className="pointer-events-none absolute inset-0">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient
                id="exp-gradient1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(34, 197, 94, 0.08)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.08)" />
              </linearGradient>
              <linearGradient
                id="exp-gradient2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(168, 85, 247, 0.05)" />
                <stop offset="100%" stopColor="rgba(34, 197, 94, 0.05)" />
              </linearGradient>
            </defs>

            {/* Animated timeline line */}
            <m.line
              x1="50"
              y1="100"
              x2="50"
              y2="900"
              stroke="rgba(59, 130, 246, 0.15)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />

            {/* Floating geometric shapes */}
            <m.polygon
              points="150,200 200,170 250,200 250,260 200,290 150,260"
              fill="url(#exp-gradient1)"
              initial={{ rotate: 0, scale: 0.8 }}
              animate={{
                rotate: [0, 120, 240, 360],
                scale: [0.8, 1.1, 0.8],
                x: [0, 20, 0],
                y: [0, -15, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <m.polygon
              points="750,400 800,370 850,400 850,460 800,490 750,460"
              fill="url(#exp-gradient2)"
              initial={{ rotate: 0, scale: 0.9 }}
              animate={{
                rotate: [0, -90, -180, -270, -360],
                scale: [0.9, 1.2, 0.9],
                x: [0, -25, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Career milestone indicators */}
            {[...Array(6)].map((_, i) => (
              <m.circle
                key={i}
                cx={100 + i * 150}
                cy={700}
                r="8"
                fill="rgba(59, 130, 246, 0.3)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.5, 1],
                  opacity: [0, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 4,
                }}
              />
            ))}
          </svg>
        </div>

        <div className="container relative z-10">
          <div className="mx-auto max-w-5xl">
            <div className="relative">
              {/* Main Timeline Line */}
              <div className="absolute bottom-6 left-8 top-6 hidden w-px bg-gradient-to-b from-primary/50 via-primary/30 to-primary/50 md:block"></div>

              {/* Experience Cards */}
              {experiences.map((experience, index) => (
                <m.div
                  key={experience._id}
                  initial={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative mb-16 last:mb-0"
                >
                  <div className="flex items-start gap-4 md:gap-8">
                    {/* Timeline Node - Desktop only with logo */}
                    <div className="relative z-10 hidden flex-shrink-0 md:block">
                      <m.div
                        className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-primary bg-background shadow-xl"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {experience.companyLogo ? (
                          <Image
                            src={urlFor(experience.companyLogo)
                              .width(40)
                              .height(40)
                              .url()}
                            className="rounded-full object-cover"
                            width={40}
                            height={40}
                            alt={`${experience.company} logo`}
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <span className="text-sm font-bold">
                              {experience.company.charAt(0)}
                            </span>
                          </div>
                        )}
                      </m.div>
                    </div>

                    {/* Experience Card */}
                    <m.div
                      className="flex-1 overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-xl"
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Card Header */}
                      <div className="p-6 pb-6 md:p-8">
                        <div className="mb-6 flex flex-col gap-4 sm:flex-row xl:items-start xl:justify-between">
                          <div className="flex flex-1 items-start gap-3">
                            {/* Company Logo - Mobile only */}
                            <div className="flex-shrink-0 md:hidden">
                              {experience.companyLogo ? (
                                <Image
                                  src={urlFor(experience.companyLogo)
                                    .width(40)
                                    .height(40)
                                    .url()}
                                  className="rounded-lg object-cover"
                                  width={40}
                                  height={40}
                                  alt={`${experience.company} logo`}
                                />
                              ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                  <span className="text-sm font-bold">
                                    {experience.company.charAt(0)}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="min-w-0 flex-1 space-y-2">
                              <h3 className="text-xl font-bold leading-tight text-foreground transition-colors hover:text-primary md:text-2xl">
                                {experience.jobTitle}
                              </h3>
                              <div className="flex items-center gap-2 text-base md:text-lg">
                                {experience.companyUrl ? (
                                  <a
                                    href={experience.companyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-primary transition-colors hover:text-primary/80"
                                  >
                                    {experience.company}
                                  </a>
                                ) : (
                                  <span className="font-medium text-primary">
                                    {experience.company}
                                  </span>
                                )}
                                {experience.employmentType && (
                                  <>
                                    <span className="text-muted-foreground">
                                      ·
                                    </span>
                                    <span className="text-sm text-muted-foreground md:text-base">
                                      {experience.employmentType}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex-shrink-0 space-y-1 xl:text-right">
                            <p className="text-base font-semibold text-foreground">
                              {formatDateRange(
                                experience.startDate,
                                experience.endDate,
                                experience.currentJob,
                              )}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {calculateDuration(
                                experience.startDate,
                                experience.endDate,
                                experience.currentJob,
                              )}
                            </p>
                            {(experience.location || experience.workType) && (
                              <p className="text-sm text-muted-foreground">
                                {experience.location}
                                {experience.workType &&
                                  experience.location &&
                                  " · "}
                                {experience.workType}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Job Description */}
                        {experience.description && (
                          <div className="mb-6 md:mb-8">
                            <h4 className="mb-3 text-base font-semibold text-foreground md:mb-4 md:text-lg">
                              Role & Responsibilities
                            </h4>
                            {experience.description.map((paragraph, idx) => (
                              <ListItem key={idx}>{paragraph}</ListItem>
                            ))}
                          </div>
                        )}

                        {/* Key Achievements */}
                        {experience.achievements &&
                          experience.achievements.length > 0 && (
                            <div className="mb-6 md:mb-8">
                              <h4 className="mb-3 text-base font-semibold text-foreground md:mb-4 md:text-lg">
                                Key Achievements
                              </h4>
                              <ul className="space-y-3">
                                {experience.achievements.map(
                                  (achievement, idx) => (
                                    <ListItem key={idx}>{achievement}</ListItem>
                                  ),
                                )}
                              </ul>
                            </div>
                          )}
                      </div>

                      {/* Technologies & Skills Section */}
                      {((experience.technologies &&
                        experience.technologies.length > 0) ||
                        (experience.skills &&
                          experience.skills.length > 0)) && (
                        <div className="px-6 pb-6 pt-0 md:px-8 md:pb-8">
                          <div className="space-y-6 border-t border-border pt-6">
                            {experience.technologies &&
                              experience.technologies.length > 0 && (
                                <div>
                                  <h5 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
                                    Technologies
                                  </h5>
                                  <div className="flex flex-wrap gap-2">
                                    {experience.technologies.map(
                                      (tech, idx) => (
                                        <m.span
                                          key={tech.name}
                                          className="inline-flex cursor-default items-center rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                                          initial={{ opacity: 0, scale: 0.8 }}
                                          whileInView={{ opacity: 1, scale: 1 }}
                                          transition={{ delay: idx * 0.05 }}
                                          viewport={{ once: true }}
                                          whileHover={{ scale: 1.05 }}
                                        >
                                          {tech.name}
                                        </m.span>
                                      ),
                                    )}
                                  </div>
                                </div>
                              )}

                            {experience.skills &&
                              experience.skills.length > 0 && (
                                <div>
                                  <h5 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
                                    Skills
                                  </h5>
                                  <div className="flex flex-wrap gap-2">
                                    {experience.skills.map((skill, idx) => (
                                      <m.span
                                        key={skill.name}
                                        className="inline-flex cursor-default items-center rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.05 }}
                                      >
                                        {skill.name}
                                      </m.span>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                      )}
                    </m.div>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default ExperienceClient;
