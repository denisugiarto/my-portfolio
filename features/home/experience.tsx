"use client";

import React from "react";
import Image from "next/image";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  fetchExperiences,
  formatDateRange,
  calculateDuration,
} from "@/services/experience";
import { urlFor } from "@/lib/sanity";
import { ListItem } from "@/components/ui/list";

const Experience = () => {
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
      <div className="container overflow-hidden">
        <h2 className="title-section text-center">Experience</h2>
        <div className="mx-auto flex flex-col gap-4 lg:max-w-lg">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex animate-pulse gap-4 rounded-none bg-gray-200 p-4 dark:bg-gray-800"
            >
              <div className="h-12 w-12 basis-12 rounded-none bg-gray-300 dark:bg-gray-700"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded-none bg-gray-300 dark:bg-gray-700"></div>
                <div className="h-3 w-1/2 rounded-none bg-gray-300 dark:bg-gray-700"></div>
                <div className="h-3 w-2/3 rounded-none bg-gray-300 dark:bg-gray-700"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container overflow-hidden">
        <h2 className="title-section text-center">Experience</h2>
        <div className="mx-auto flex flex-col gap-4 lg:max-w-lg">
          <p className="text-center text-red-600 dark:text-red-400">
            Error loading experiences. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!experiences || experiences.length === 0) {
    return (
      <div className="container overflow-hidden">
        <h2 className="title-section text-center">Experience</h2>
        <div className="mx-auto flex flex-col gap-4 lg:max-w-lg">
          <div className="py-12 text-center">
            <div className="mx-auto w-auto rounded-none bg-slate-100 px-6 py-4 text-center dark:bg-slate-800">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                No work experience found
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container relative z-10">
          <h2 className="title-section mb-16 text-center">Experience</h2>
          <div className="mx-auto max-w-5xl">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute bottom-6 left-10 top-6 hidden w-px bg-gradient-to-b from-primary/50 via-primary/30 to-primary/50 md:block"></div>

              {experiences.map((experience, index) => (
                <m.div
                  key={experience._id}
                  initial={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative mb-16 last:mb-0"
                >
                  <div className="flex items-start gap-8 md:gap-12">
                    {/* Timeline Dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="flex h-20 w-20 items-center justify-center rounded-none border-4 border-primary bg-background shadow-xl">
                        {experience.companyLogo ? (
                          <Image
                            src={urlFor(experience.companyLogo)
                              .width(56)
                              .height(56)
                              .url()}
                            className="rounded-none object-cover"
                            width={56}
                            height={56}
                            alt={`${experience.company} logo`}
                          />
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-none bg-primary text-primary-foreground">
                            <span className="text-xl font-bold">
                              {experience.company.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Timeline Content */}
                    <div className="flex-1 overflow-hidden rounded-none border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg">
                      {/* Header */}
                      <div className="p-8 pb-6">
                        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                          <div className="flex-1 space-y-2">
                            <h3 className="text-2xl font-bold leading-tight text-foreground">
                              {experience.jobTitle}
                            </h3>
                            <div className="flex items-center gap-2 text-lg">
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
                                  <span className="text-base text-muted-foreground">
                                    {experience.employmentType}
                                  </span>
                                </>
                              )}
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

                        {/* Achievements */}
                        {experience.achievements &&
                          experience.achievements.length > 0 && (
                            <div className="mb-8">
                              <h4 className="mb-4 text-lg font-semibold text-foreground">
                                Key Achievements
                              </h4>
                              <ul className="space-y-3">
                                {experience.achievements
                                  .slice(0, 3)
                                  .map((achievement, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-start gap-3 leading-relaxed text-muted-foreground"
                                    >
                                      <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-none bg-primary"></div>
                                      <span className="text-base">
                                        {achievement}
                                      </span>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          )}
                      </div>

                      {/* Technologies & Skills */}
                      {((experience.technologies &&
                        experience.technologies.length > 0) ||
                        (experience.skills &&
                          experience.skills.length > 0)) && (
                        <div className="px-8 pb-8 pt-0">
                          <div className="space-y-6 border-t border-border pt-6">
                            {experience.technologies &&
                              experience.technologies.length > 0 && (
                                <div>
                                  <h5 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
                                    Technologies
                                  </h5>
                                  <div className="flex flex-wrap gap-2">
                                    {experience.technologies.map((tech) => (
                                      <span
                                        key={tech.name}
                                        className="inline-flex items-center rounded-none bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
                                      >
                                        {tech.name}
                                      </span>
                                    ))}
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
                                    {experience.skills.map((skill) => (
                                      <span
                                        key={skill.name}
                                        className="inline-flex items-center rounded-none bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground"
                                      >
                                        {skill.name}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                      )}
                    </div>
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

export default Experience;
