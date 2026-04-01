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
      <section className="relative px-4 pb-16 sm:px-6 lg:px-8">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="space-y-8">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-none border-4 border-foreground bg-card p-6 shadow-[8px_8px_0px_0px_hsl(var(--foreground))] md:p-8"
                >
                  <div className="flex items-start gap-4 md:gap-8">
                    <div className="hidden h-16 w-16 flex-shrink-0 animate-pulse border-4 border-foreground bg-secondary md:block"></div>
                    <div className="flex-1 animate-pulse border-4 border-foreground bg-secondary p-6 md:p-8">
                      <div className="space-y-4">
                        <div className="h-8 w-3/4 bg-muted"></div>
                        <div className="h-6 w-1/2 bg-muted"></div>
                        <div className="h-6 w-2/3 bg-muted"></div>
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
      <section className="relative px-4 pb-16 sm:px-6 lg:px-8">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="py-12 text-center">
              <div className="mx-auto w-auto rounded-none border-4 border-foreground bg-destructive px-6 py-5 shadow-[8px_8px_0px_0px_hsl(var(--foreground))]">
                <h3 className="mb-2 text-xl font-bold uppercase tracking-tight text-white">
                  Error Loading Experience
                </h3>
                <p className="text-sm font-bold text-white">
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
      <section className="relative px-4 pb-16 sm:px-6 lg:px-8">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="py-12 text-center">
              <div className="mx-auto w-auto rounded-none border-4 border-foreground bg-card px-6 py-5 shadow-[8px_8px_0px_0px_hsl(var(--foreground))]">
                <h3 className="mb-2 text-xl font-bold uppercase tracking-tight text-foreground">
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
      <section className="relative px-4 pb-16 sm:px-6 lg:px-8">
        <div className="container relative z-10">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 rounded-none border-[3px] border-foreground bg-secondary px-5 py-6 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] sm:px-10 sm:py-10 md:mb-10 md:border-4 md:shadow-[8px_8px_0px_0px_hsl(var(--foreground))]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="inline-block border-2 border-foreground bg-primary px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-primary-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))] md:text-xs">
                    TIMELINE
                  </p>
                  <h2 className="mt-3 font-title text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl md:mt-4 md:text-4xl">
                    ROLES, OUTCOMES AND TOOLS
                  </h2>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Main Timeline Line */}
              <div className="absolute bottom-10 left-8 top-10 hidden w-1.5 border-r border-background bg-foreground md:block"></div>

              {/* Experience Cards */}
              {experiences.map((experience, index) => (
                <m.div
                  key={experience._id}
                  initial={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative mb-8 last:mb-0 md:mb-12"
                >
                  <div className="flex items-start gap-4 md:gap-8">
                    {/* Timeline Node - Desktop only with logo */}
                    <div className="relative z-10 hidden flex-shrink-0 md:block">
                      <m.div
                        className="flex h-16 w-16 items-center justify-center rounded-none border-[3px] border-foreground bg-card shadow-[4px_4px_0px_0px_hsl(var(--foreground))] md:border-4"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.15 }}
                      >
                        {experience.companyLogo ? (
                          <Image
                            src={urlFor(experience.companyLogo)
                              .width(58)
                              .height(58)
                              .url()}
                            className="object-cover"
                            width={58}
                            height={58}
                            alt={`${experience.company} logo`}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
                            <span className="text-xl font-black">
                              {experience.company.charAt(0)}
                            </span>
                          </div>
                        )}
                      </m.div>
                    </div>

                    {/* Experience Card */}
                    <m.div className="flex-1 overflow-hidden rounded-none border-[3px] border-foreground bg-card shadow-[4px_4px_0px_0px_hsl(var(--foreground))] md:border-4 md:shadow-[8px_8px_0px_0px_hsl(var(--foreground))]">
                      {/* Card Header */}
                      <div className="border-b-[3px] border-foreground bg-background p-4 sm:p-6 md:border-b-4 md:p-8">
                        <div className="flex flex-col gap-4 sm:flex-row xl:items-start xl:justify-between">
                          <div className="flex flex-1 items-start gap-3 md:gap-4">
                            {/* Company Logo - Mobile only */}
                            <div className="flex-shrink-0 border-[3px] border-foreground bg-card shadow-[3px_3px_0px_0px_hsl(var(--foreground))] md:hidden md:border-4">
                              {experience.companyLogo ? (
                                <Image
                                  src={urlFor(experience.companyLogo)
                                    .width(48)
                                    .height(48)
                                    .url()}
                                  className="rounded-none object-cover"
                                  width={48}
                                  height={48}
                                  alt={`${experience.company} logo`}
                                />
                              ) : (
                                <div className="flex h-12 w-12 items-center justify-center bg-primary text-primary-foreground">
                                  <span className="text-lg font-black">
                                    {experience.company.charAt(0)}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="min-w-0 flex-1 space-y-2 md:space-y-3">
                              {experience.currentJob && (
                                <span className="inline-flex rounded-none border-2 border-foreground bg-success px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-success-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))] md:px-2.5 md:py-1 md:text-xs">
                                  CURRENT ROLE
                                </span>
                              )}
                              <h3 className="inline-block border-[3px] border-foreground bg-primary px-2 py-1 text-xl font-black uppercase leading-tight tracking-tight text-primary-foreground shadow-[3px_3px_0px_0px_hsl(var(--foreground))] sm:text-2xl md:border-4 md:text-3xl md:shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
                                {experience.jobTitle}
                              </h3>
                              <div className="flex flex-wrap items-center gap-2 pt-1 text-base font-black uppercase md:pt-2 md:text-xl">
                                {experience.companyUrl ? (
                                  <a
                                    href={experience.companyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-black text-foreground underline decoration-primary decoration-[3px] underline-offset-4 hover:bg-primary hover:text-primary-foreground md:decoration-4"
                                  >
                                    {experience.company}
                                  </a>
                                ) : (
                                  <span className="font-black text-foreground underline decoration-foreground decoration-[3px] underline-offset-4 md:decoration-4">
                                    {experience.company}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 flex-shrink-0 xl:mt-0 xl:text-right">
                            <p className="inline-block border-[3px] border-foreground bg-secondary px-3 py-1.5 text-xs font-black uppercase tracking-wider text-foreground shadow-[3px_3px_0px_0px_hsl(var(--foreground))] md:px-4 md:py-2 md:text-sm md:shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
                              {formatDateRange(
                                experience.startDate,
                                experience.endDate,
                                experience.currentJob,
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2 text-xs font-black uppercase text-foreground md:mt-6 md:text-sm">
                          <span className="border-2 border-foreground bg-muted px-2 py-1 shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
                            {calculateDuration(
                              experience.startDate,
                              experience.endDate,
                              experience.currentJob,
                            )}
                          </span>
                          {experience.employmentType && (
                            <span className="border-2 border-foreground bg-muted px-2 py-1 shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
                              {experience.employmentType}
                            </span>
                          )}
                          {experience.location && (
                            <span className="border-2 border-foreground bg-muted px-2 py-1 shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
                              {experience.location}
                            </span>
                          )}
                          {experience.workType && (
                            <span className="border-2 border-foreground bg-muted px-2 py-1 shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
                              {experience.workType}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Technologies & Skills Section */}
                      {((experience.description &&
                        experience.description.length > 0) ||
                        (experience.achievements &&
                          experience.achievements.length > 0) ||
                        (experience.technologies &&
                          experience.technologies.length > 0) ||
                        (experience.skills &&
                          experience.skills.length > 0)) && (
                        <div className="bg-card p-4 sm:p-6 md:p-8">
                          <div className="space-y-6 md:space-y-8">
                            {((experience.description &&
                              experience.description.length > 0) ||
                              (experience.achievements &&
                                experience.achievements.length > 0)) && (
                              <div>
                                <p className="mb-3 inline-block border-b-[3px] border-foreground pb-1 text-xs font-black uppercase tracking-widest text-foreground md:mb-4 md:border-b-4 md:text-sm">
                                  DETAILS
                                </p>
                                <div className="mt-2 grid gap-4 md:gap-6 lg:grid-cols-2">
                                  {experience.description &&
                                    experience.description.length > 0 && (
                                      <div className="rounded-none border-[3px] border-foreground bg-background p-4 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] md:border-4 md:p-6 md:shadow-[6px_6px_0px_0px_hsl(var(--foreground))]">
                                        <h4 className="mb-3 inline-block border-2 border-foreground bg-primary px-2 py-1 text-xs font-black uppercase tracking-wider text-primary-foreground md:mb-4 md:text-sm">
                                          RESPONSIBILITIES
                                        </h4>
                                        {experience.description.map(
                                          (paragraph, idx) => (
                                            <ListItem
                                              key={idx}
                                              className="text-sm font-bold leading-relaxed text-foreground md:text-base"
                                            >
                                              {typeof paragraph === "string"
                                                ? paragraph
                                                : JSON.stringify(paragraph)}
                                            </ListItem>
                                          ),
                                        )}
                                      </div>
                                    )}

                                  {experience.achievements &&
                                    experience.achievements.length > 0 && (
                                      <div className="rounded-none border-[3px] border-foreground bg-background p-4 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] md:border-4 md:p-6 md:shadow-[6px_6px_0px_0px_hsl(var(--foreground))]">
                                        <h4 className="mb-3 inline-block border-2 border-foreground bg-accent px-2 py-1 text-xs font-black uppercase tracking-wider text-accent-foreground md:mb-4 md:text-sm">
                                          ACHIEVEMENTS
                                        </h4>
                                        <ul className="mt-2 space-y-3 font-bold leading-relaxed text-foreground md:space-y-4">
                                          {experience.achievements.map(
                                            (achievement, idx) => (
                                              <ListItem
                                                key={idx}
                                                className="text-sm font-bold leading-relaxed text-foreground md:text-base"
                                              >
                                                {typeof achievement === "string"
                                                  ? achievement
                                                  : JSON.stringify(achievement)}
                                              </ListItem>
                                            ),
                                          )}
                                        </ul>
                                      </div>
                                    )}
                                </div>
                              </div>
                            )}

                            {((experience.technologies &&
                              experience.technologies.length > 0) ||
                              (experience.skills &&
                                experience.skills.length > 0)) && (
                              <div>
                                <p className="mb-3 inline-block border-b-[3px] border-foreground pb-1 text-xs font-black uppercase tracking-widest text-foreground md:mb-4 md:border-b-4 md:text-sm">
                                  TOOLBOX
                                </p>

                                {experience.technologies &&
                                  experience.technologies.length > 0 && (
                                    <div className="mb-6">
                                      <div className="flex flex-wrap gap-2">
                                        {experience.technologies.map(
                                          (tech, idx) => (
                                            <m.span
                                              key={tech.name}
                                              className="inline-flex cursor-default items-center rounded-none border-2 border-foreground bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-[3px_3px_0px_0px_hsl(var(--foreground))]"
                                              initial={{
                                                opacity: 0,
                                              }}
                                              whileInView={{
                                                opacity: 1,
                                              }}
                                              transition={{
                                                delay: Math.min(
                                                  idx * 0.03,
                                                  0.3,
                                                ),
                                              }}
                                              viewport={{ once: true }}
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
                                      <div className="flex flex-wrap gap-2">
                                        {experience.skills.map((skill, idx) => (
                                          <m.span
                                            key={skill.name}
                                            className="inline-flex cursor-default items-center rounded-none border-2 border-foreground bg-secondary px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground shadow-[3px_3px_0px_0px_hsl(var(--foreground))]"
                                            initial={{ opacity: 0 }}
                                            whileInView={{
                                              opacity: 1,
                                            }}
                                            transition={{
                                              delay: Math.min(idx * 0.03, 0.3),
                                            }}
                                            viewport={{ once: true }}
                                          >
                                            {skill.name}
                                          </m.span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
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
