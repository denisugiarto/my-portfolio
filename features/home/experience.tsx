'use client'

import React from "react";
import Image from "next/image";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchExperiences, formatDateRange, calculateDuration } from "@/services/experience";
import { urlFor } from "@/lib/sanity";

const Experience = () => {
  const { data: experiences, isLoading, error } = useQuery({
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
            <div key={index} className="flex gap-4 rounded-lg bg-gray-200 dark:bg-gray-800 p-4 animate-pulse">
              <div className="basis-12 h-12 w-12 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
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
          <div className="text-center py-12">
            <div className="mx-auto w-auto rounded-md bg-slate-100 dark:bg-slate-800 px-6 py-4 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No work experience found
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Work experiences will appear here once they're added to the CMS.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Visit Sanity Studio to add your work experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* SVG Background for Experience */}
        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="exp-gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(34, 197, 94, 0.08)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.08)" />
              </linearGradient>
              <linearGradient id="exp-gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(168, 85, 247, 0.05)" />
                <stop offset="100%" stopColor="rgba(34, 197, 94, 0.05)" />
              </linearGradient>
            </defs>
            
            {/* Timeline-inspired shapes */}
            <m.line
              x1="50"
              y1="100"
              x2="50"
              y2="900"
              stroke="rgba(59, 130, 246, 0.1)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
            
            {/* Floating hexagons */}
            <m.polygon
              points="150,200 200,170 250,200 250,260 200,290 150,260"
              fill="url(#exp-gradient1)"
              initial={{ rotate: 0, scale: 0.8 }}
              animate={{ 
                rotate: [0, 120, 240, 360],
                scale: [0.8, 1.1, 0.8],
                x: [0, 20, 0],
                y: [0, -15, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
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
                y: [0, 20, 0]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Career milestones */}
            {[...Array(6)].map((_, i) => (
              <m.circle
                key={i}
                cx={100 + (i * 150)}
                cy={700}
                r="8"
                fill="rgba(59, 130, 246, 0.3)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.5, 1],
                  opacity: [0, 1, 0.6]
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 4
                }}
              />
            ))}
          </svg>
        </div>

        <div className="container relative z-10">
          <h2 className="title-section text-center mb-16">Experience</h2>
          <div className="mx-auto max-w-5xl">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-10 top-6 bottom-6 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-primary/50 hidden md:block"></div>
              
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
                      <div className="w-20 h-20 bg-background border-4 border-primary rounded-full flex items-center justify-center shadow-xl">
                        {experience.companyLogo ? (
                          <Image
                            src={urlFor(experience.companyLogo).width(56).height(56).url()}
                            className="rounded-full object-cover"
                            width={56}
                            height={56}
                            alt={`${experience.company} logo`}
                          />
                        ) : (
                          <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                            <span className="text-xl font-bold">
                              {experience.company.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Timeline Content */}
                    <div className="flex-1 bg-card border border-border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                      {/* Header */}
                      <div className="p-8 pb-6">
                        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4 mb-6">
                          <div className="flex-1 space-y-2">
                            <h3 className="text-2xl font-bold text-foreground leading-tight">
                              {experience.jobTitle}
                            </h3>
                            <div className="flex items-center gap-2 text-lg">
                              {experience.companyUrl ? (
                                <a 
                                  href={experience.companyUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                                >
                                  {experience.company}
                                </a>
                              ) : (
                                <span className="text-primary font-medium">{experience.company}</span>
                              )}
                              {experience.employmentType && (
                                <>
                                  <span className="text-muted-foreground">·</span>
                                  <span className="text-muted-foreground text-base">
                                    {experience.employmentType}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          
                          <div className="xl:text-right space-y-1 flex-shrink-0">
                            <p className="text-base font-semibold text-foreground">
                              {formatDateRange(experience.startDate, experience.endDate, experience.currentJob)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {calculateDuration(experience.startDate, experience.endDate, experience.currentJob)}
                            </p>
                            {(experience.location || experience.workType) && (
                              <p className="text-sm text-muted-foreground">
                                {experience.location}
                                {experience.workType && experience.location && ' · '}
                                {experience.workType}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Achievements */}
                        {experience.achievements && experience.achievements.length > 0 && (
                          <div className="mb-8">
                            <h4 className="text-lg font-semibold text-foreground mb-4">Key Achievements</h4>
                            <ul className="space-y-3">
                              {experience.achievements.slice(0, 3).map((achievement, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                                  <span className="text-base">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Technologies & Skills */}
                      {((experience.technologies && experience.technologies.length > 0) || 
                        (experience.skills && experience.skills.length > 0)) && (
                        <div className="px-8 pb-8 pt-0">
                          <div className="border-t border-border pt-6 space-y-6">
                            {experience.technologies && experience.technologies.length > 0 && (
                              <div>
                                <h5 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                                  Technologies
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                  {experience.technologies.map((tech) => (
                                    <span 
                                      key={tech}
                                      className="inline-flex items-center bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {experience.skills && experience.skills.length > 0 && (
                              <div>
                                <h5 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                                  Skills
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                  {experience.skills.map((skill) => (
                                    <span 
                                      key={skill}
                                      className="inline-flex items-center bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-sm font-medium"
                                    >
                                      {skill}
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