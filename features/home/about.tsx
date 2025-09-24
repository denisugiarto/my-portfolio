"use client";

import { AboutSection } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { getIconComponent } from "@/lib/icon-mapping";
import { 
  MapPin, 
  Clock, 
  Globe, 
  Award, 
  TrendingUp, 
  Zap, 
  Target 
} from "lucide-react";

interface AboutProps {
  aboutData: AboutSection | null;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const skillsContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export default function About({ aboutData }: AboutProps) {
  if (!aboutData) {
    return (
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="mx-auto mb-12 h-8 w-48 rounded bg-gray-700"></div>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="h-6 w-full rounded bg-gray-700"></div>
                <div className="h-6 w-5/6 rounded bg-gray-700"></div>
                <div className="h-6 w-4/6 rounded bg-gray-700"></div>
              </div>
              <div className="h-64 rounded bg-gray-700"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const getProficiencyWidth = (level: number) => {
    return `${(level / 5) * 100}%`;
  };

  const getProficiencyColor = (level: number) => {
    if (level >= 4.5) return "bg-emerald-400";
    if (level >= 3.5) return "bg-blue-400";
    if (level >= 2.5) return "bg-yellow-400";
    return "bg-gray-400";
  };

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto max-w-6xl"
        >
          {/* Section Title */}
          <motion.div variants={item} className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              {aboutData.title}
            </h2>
            <div className="mx-auto h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-400"></div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left Column - Text Content */}
            <motion.div variants={item} className="space-y-8">
              {/* Introduction */}
              <div>
                <h3 className="mb-4 text-xl font-semibold text-blue-400">
                  Who I Am
                </h3>
                <p className="text-lg leading-relaxed text-gray-300">
                  {aboutData.introduction}
                </p>
              </div>

              {/* USP */}
              <div>
                <h3 className="mb-4 text-xl font-semibold text-purple-400">
                  What Sets Me Apart
                </h3>
                <p className="text-lg leading-relaxed text-gray-300">
                  {aboutData.uniqueSellingProposition}
                </p>
              </div>

              {/* Personal Info */}
              {aboutData.personalInfo && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {aboutData.personalInfo.location && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <MapPin className="h-5 w-5 text-blue-400" />
                      <span>{aboutData.personalInfo.location}</span>
                    </div>
                  )}
                  {aboutData.personalInfo.timezone && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <Clock className="h-5 w-5 text-purple-400" />
                      <span>{aboutData.personalInfo.timezone}</span>
                    </div>
                  )}
                  {aboutData.personalInfo.yearsOfExperience && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <Award className="h-5 w-5 text-emerald-400" />
                      <span>{aboutData.personalInfo.yearsOfExperience}+ Years Experience</span>
                    </div>
                  )}
                  {aboutData.personalInfo.languages?.length > 0 && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <Globe className="h-5 w-5 text-orange-400" />
                      <span>
                        {aboutData.personalInfo.languages
                          .map((lang) => lang.language)
                          .join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Right Column - Profile Image */}
            <motion.div variants={item} className="flex justify-center">
              {aboutData.profileImage ? (
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src={urlFor(aboutData.profileImage).width(400).height(500).url()}
                    alt="Profile"
                    width={400}
                    height={500}
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
                </div>
              ) : (
                <div className="flex h-96 w-80 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 shadow-2xl">
                  <div className="text-center">
                    <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
                    <p className="text-gray-400">Profile Image</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Skills Section */}
          {aboutData.skillCategories && aboutData.skillCategories.length > 0 && (
            <motion.div variants={item} className="mt-20">
              <h3 className="mb-8 text-center text-2xl font-bold text-white">
                Technical Skills
              </h3>
              <motion.div
                variants={skillsContainer}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {aboutData.skillCategories.map((category) => (
                  <motion.div key={category.category} variants={item}>
                    <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-6 backdrop-blur">
                      <h4 className="mb-4 text-lg font-semibold capitalize text-white">
                        {category.category}
                      </h4>
                      <div className="space-y-3">
                        {category.skills.map((skill) => {
                          const IconComponent = skill.icon
                            ? getIconComponent(skill.icon)
                            : null;
                          
                          return (
                            <div key={skill.name} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {IconComponent && (
                                    <IconComponent 
                                      className="h-4 w-4" 
                                      style={{ color: skill.color || "#9ca3af" }}
                                    />
                                  )}
                                  <span className="text-sm text-gray-300">
                                    {skill.name}
                                  </span>
                                </div>
                                <Badge 
                                  variant="secondary" 
                                  className="text-xs"
                                >
                                  {skill.proficiency}/5
                                </Badge>
                              </div>
                              <div className="h-2 overflow-hidden rounded-full bg-gray-700">
                                <motion.div
                                  className={`h-full ${getProficiencyColor(skill.proficiency)}`}
                                  initial={{ width: 0 }}
                                  whileInView={{ 
                                    width: getProficiencyWidth(skill.proficiency) 
                                  }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Achievements Section */}
          {aboutData.achievements && aboutData.achievements.length > 0 && (
            <motion.div variants={item} className="mt-20">
              <h3 className="mb-8 text-center text-2xl font-bold text-white">
                Key Achievements
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                {aboutData.achievements.map((achievement, index) => {
                  const IconComponent = achievement.icon
                    ? getIconComponent(achievement.icon)
                    : [Target, Zap, TrendingUp, Award][index % 4];
                  
                  return (
                    <motion.div
                      key={achievement.title}
                      variants={item}
                      className="group"
                    >
                      <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-6 backdrop-blur transition-all duration-300 hover:border-blue-500/50 hover:bg-gray-800/70">
                        <div className="flex items-start gap-4">
                          <div className="rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-3">
                            {IconComponent ? React.createElement(IconComponent, { className: "h-6 w-6 text-blue-400" }) : null}
                          </div>
                          <div className="flex-1">
                            <h4 className="mb-2 font-semibold text-white">
                              {achievement.title}
                            </h4>
                            {achievement.metric && (
                              <div className="mb-2 text-2xl font-bold text-blue-400">
                                {achievement.metric}
                              </div>
                            )}
                            {achievement.description && (
                              <p className="text-sm text-gray-400">
                                {achievement.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}