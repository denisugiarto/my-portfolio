import { Button } from "@/components/ui/button";
import { getIconComponent } from "@/lib/icon-mapping";
import { HeroSection, Technology } from "@/lib/sanity";
import { sendGAEvent } from "@next/third-parties/google";
import Link from "next/link";
import {
  AnimatedContent,
  AnimatedTechStack,
  AnimatedText,
  HeroAnimations,
} from "./hero-animations";

interface HeroProps {
  heroData: HeroSection | null;
}

const Hero = ({ heroData }: HeroProps) => {
  // Show minimal loading skeleton if no data (shouldn't happen with SSR but good fallback)
  if (!heroData) {
    return (
      <section className="relative flex flex-col justify-center pt-20 text-center lg:pt-32">
        <div className="container mx-auto">
          <div className="animate-pulse">
            <div className="mx-auto mb-4 h-8 w-3/4 rounded bg-gray-700 lg:h-12"></div>
            <div className="mx-auto mb-8 h-16 rounded bg-gray-700 lg:h-20"></div>
            <div className="mx-auto mb-10 h-6 w-2/3 rounded bg-gray-700"></div>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <div className="h-12 w-40 rounded bg-gray-700"></div>
              <div className="h-12 w-32 rounded bg-gray-700"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Tech stack data from Sanity (with fallback)
  const techStack = heroData.technologies?.length
    ? heroData.technologies
        .map((tech: Technology) => ({
          icon: getIconComponent(tech.icon),
          name: tech.name,
          color: tech.color || "#9ca3af", // Default to gray-400 hex
        }))
        .filter((tech) => tech.icon) // Only include technologies with valid icons
    : [
        // Fallback hardcoded tech stack
        { icon: getIconComponent("SiReact"), name: "React", color: "#60a5fa" },
        {
          icon: getIconComponent("SiNextdotjs"),
          name: "Next.js",
          color: "#ffffff",
        },
        {
          icon: getIconComponent("SiNodedotjs"),
          name: "Node.js",
          color: "#34d399",
        },
        {
          icon: getIconComponent("SiTypescript"),
          name: "TypeScript",
          color: "#60a5fa",
        },
        {
          icon: getIconComponent("SiTailwindcss"),
          name: "TailwindCSS",
          color: "#22d3ee",
        },
      ].filter((tech) => tech.icon);

  return (
    <HeroAnimations>
      {/* Main heading with staggered animation */}
      <AnimatedText>
        <h1 className="mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-lg font-bold text-transparent lg:text-2xl">
          {heroData.headline || "Full-Stack Developer"}
        </h1>
        <h2 className="mx-auto block max-w-4xl text-2xl font-semibold leading-tight dark:text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          {heroData.subheadline || "Building Modern Web Applications"}
        </h2>
      </AnimatedText>

      {/* About text with animation */}
      <AnimatedContent delay={0.2}>
        <p className="mx-auto mb-10 mt-6 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
          {heroData.bio ||
            "I create fast, scalable, and user-friendly web applications using modern technologies. Specializing in React, Next.js, and Node.js with a focus on clean code and great user experiences."}
        </p>
      </AnimatedContent>

      {/* CTA Buttons with animation */}
      <AnimatedContent delay={0.4}>
        <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={heroData.primaryCTA?.link || "#projects"}
            onClick={() =>
              sendGAEvent("event", "hire_me_click", {
                event_category: "engagement",
                event_label: "hire_me_button",
                value: 1,
              })
            }
            className="w-3/4 md:w-auto"
          >
            <Button
              variant="gradient"
              color="bluePurple"
              size="lg"
              className="group w-full gap-2 shadow-lg transition-shadow hover:shadow-xl"
            >
              <span>{heroData.primaryCTA?.text || "Hire me"}</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
              >
                <path
                  clipRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  fillRule="evenodd"
                />
              </svg>
            </Button>
          </Link>

          {heroData.secondaryCTA?.link && (
            <Link
              href={heroData.secondaryCTA.link}
              onClick={() =>
                sendGAEvent("event", "my_projects_click", {
                  event_category: "engagement",
                  event_label: "my_projects_button",
                  value: 1,
                })
              }
              target={
                heroData.secondaryCTA.link.startsWith("http")
                  ? "_blank"
                  : "_self"
              }
              rel={
                heroData.secondaryCTA.link.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="w-3/4 md:w-auto"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full transition-shadow hover:shadow-lg"
              >
                <span>{heroData.secondaryCTA.text}</span>
              </Button>
            </Link>
          )}
        </div>
      </AnimatedContent>

      {/* Tech stack indicator */}
      <AnimatedTechStack techs={techStack} />
    </HeroAnimations>
  );
};

export default Hero;
