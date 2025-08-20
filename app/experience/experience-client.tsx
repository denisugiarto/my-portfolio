'use client';

import React from "react";
import Image from "next/image";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchExperiences, formatDateRange, calculateDuration } from "@/services/experience";
import { urlFor } from "@/lib/sanity";

const ExperienceClient = () => {
  const { data: experiences, isLoading, error } = useQuery({
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
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse flex-shrink-0 hidden md:block"></div>
                    <div className="flex-1 bg-card border border-border rounded-xl p-6 md:p-8 animate-pulse">
                      <div className="space-y-4">
                        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-4/5"></div>
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
            <div className="text-center py-12">
              <div className="mx-auto w-auto rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-6 py-4">
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
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
            <div className="text-center py-12">
              <div className="mx-auto w-auto rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No Experience Found
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Experience entries will appear here once they&apos;re added to the CMS.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Visit Sanity Studio to add your work experience.
                </p>
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
            
            {/* Career milestone indicators */}
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
          <div className="mx-auto max-w-5xl">
            <div className="relative">
              {/* Main Timeline Line */}
              <div className="absolute left-8 top-6 bottom-6 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-primary/50 hidden md:block"></div>
              
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
                    <div className="relative z-10 flex-shrink-0 hidden md:block">
                      <m.div 
                        className="w-16 h-16 bg-background border-4 border-primary rounded-full flex items-center justify-center shadow-xl"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {experience.companyLogo ? (
                          <Image
                            src={urlFor(experience.companyLogo).width(40).height(40).url()}
                            className="rounded-full object-cover"
                            width={40}
                            height={40}
                            alt={`${experience.company} logo`}
                          />
                        ) : (
                          <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold">
                              {experience.company.charAt(0)}
                            </span>
                          </div>
                        )}
                      </m.div>
                    </div>

                    {/* Experience Card */}
                    <m.div 
                      className="flex-1 bg-card border border-border rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Card Header */}
                      <div className="p-6 md:p-8 pb-6">
                        <div className="flex flex-col xl:items-start xl:justify-between gap-4 mb-6">
                          <div className="flex items-start gap-3 flex-1">
                            {/* Company Logo - Mobile only */}
                            <div className="flex-shrink-0 md:hidden">
                              {experience.companyLogo ? (
                                <Image
                                  src={urlFor(experience.companyLogo).width(40).height(40).url()}
                                  className="rounded-lg object-cover"
                                  width={40}
                                  height={40}
                                  alt={`${experience.company} logo`}
                                />
                              ) : (
                                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
                                  <span className="text-sm font-bold">
                                    {experience.company.charAt(0)}
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1 space-y-2 min-w-0">
                              <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight hover:text-primary transition-colors">
                                {experience.jobTitle}
                              </h3>
                              <div className="flex items-center gap-2 text-base md:text-lg">
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
                                    <span className="text-muted-foreground text-sm md:text-base">
                                      {experience.employmentType}
                                    </span>
                                  </>
                                )}
                              </div>
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

                        {/* Job Description */}
                        {experience.description && (
                          <div className="mb-6 md:mb-8">
                            <h4 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">Role & Responsibilities</h4>
                            <div className="text-muted-foreground">
                              <ul className="space-y-2">
                                {Array.isArray(experience.description) ? (
                                  experience.description.map((block: any, idx: number) => {
                                    if (block._type === 'block') {
                                      const text = block.children?.map((child: any) => child.text).join('') || '';
                                      return text ? (
                                        <li key={idx} className="flex items-start gap-3 text-base leading-relaxed mb-2">
                                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                                          <span>{text}</span>
                                        </li>
                                      ) : null;
                                    }
                                    return null;
                                  })
                                ) : (
                                  <li className="flex items-start gap-3 text-base leading-relaxed">
                                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                                    <span>{String(experience.description)}</span>
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                        )}

                        {/* Key Achievements */}
                        {experience.achievements && experience.achievements.length > 0 && (
                          <div className="mb-6 md:mb-8">
                            <h4 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">Key Achievements</h4>
                            <ul className="space-y-3">
                              {experience.achievements.map((achievement, idx) => (
                                <m.li 
                                  key={idx} 
                                  className="flex items-start gap-3 text-muted-foreground leading-relaxed"
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  viewport={{ once: true }}
                                >
                                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                                  <span className="text-base">{achievement}</span>
                                </m.li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Technologies & Skills Section */}
                      {((experience.technologies && experience.technologies.length > 0) || 
                        (experience.skills && experience.skills.length > 0)) && (
                        <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                          <div className="border-t border-border pt-6 space-y-6">
                            {experience.technologies && experience.technologies.length > 0 && (
                              <div>
                                <h5 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                                  Technologies
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                  {experience.technologies.map((tech, idx) => (
                                    <m.span 
                                      key={tech.name}
                                      className="inline-flex items-center bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors cursor-default"
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      whileInView={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: idx * 0.05 }}
                                      viewport={{ once: true }}
                                      whileHover={{ scale: 1.05 }}
                                    >
                                      {tech.name}
                                    </m.span>
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
                                  {experience.skills.map((skill, idx) => (
                                    <m.span 
                                      key={skill.name}
                                      className="inline-flex items-center bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-sm font-medium hover:bg-secondary/80 transition-colors cursor-default"
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