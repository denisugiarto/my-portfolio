"use client";
import { Button } from "@/components/ui/button";
import { getIconComponent } from "@/lib/icon-mapping";
import { HeroSection, Technology } from "@/lib/sanity";
import { sendGAEvent } from "@next/third-parties/google";
import { ArrowRight } from "lucide-react";
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
  if (!heroData) {
    return (
      <section className="relative flex flex-col justify-center pt-20 text-center lg:pt-32">
        <div className="container mx-auto">
          <div className="animate-pulse">
            <div className="mx-auto mb-4 h-12 w-3/4 border-4 border-foreground bg-muted lg:h-16"></div>
            <div className="mx-auto mb-8 h-24 border-4 border-foreground bg-muted lg:h-32"></div>
            <div className="mx-auto mb-10 h-8 w-2/3 border-4 border-foreground bg-muted"></div>
          </div>
        </div>
      </section>
    );
  }

  const techStack = heroData.technologies?.length
    ? heroData.technologies
        .map((tech: Technology) => ({
          icon: getIconComponent(tech.icon),
          name: tech.name,
          color: tech.color || "#09090b",
        }))
        .filter((tech) => tech.icon)
    : [
        { icon: getIconComponent("SiReact"), name: "React", color: "#60a5fa" },
        {
          icon: getIconComponent("SiNextdotjs"),
          name: "Next.js",
          color: "#09090b",
        },
        {
          icon: getIconComponent("SiNodedotjs"),
          name: "Node.js",
          color: "#059669",
        },
        {
          icon: getIconComponent("SiTypescript"),
          name: "TypeScript",
          color: "#2563eb",
        },
        {
          icon: getIconComponent("SiTailwindcss"),
          name: "TailwindCSS",
          color: "#0891b2",
        },
      ].filter((tech) => tech.icon);

  return (
    <HeroAnimations>
      <AnimatedText>
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 inline-flex items-center gap-2 border-4 border-foreground bg-warning px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-warning-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
            <span className="h-3 w-3 border-2 border-foreground bg-success" />
            {heroData.headline || "Full-Stack Developer"}
          </div>

          <h1 className="mx-auto block max-w-5xl text-3xl font-black uppercase leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            {heroData.subheadline || "Building Modern Web Applications"}
          </h1>

          <div className="mx-auto mt-8 h-2 w-32 border-2 border-foreground bg-primary shadow-[2px_2px_0px_0px_hsl(var(--foreground))]" />
        </div>
      </AnimatedText>

      <AnimatedContent delay={0.2}>
        <p className="mx-auto mb-12 mt-8 max-w-3xl border-4 border-foreground bg-background p-6 text-lg font-bold leading-relaxed text-foreground shadow-[8px_8px_0px_0px_hsl(var(--foreground))] md:text-xl">
          {heroData.bio ||
            "I create fast, scalable, and user-friendly web applications using modern technologies. Specializing in React, Next.js, and Node.js with a focus on clean code and great user experiences."}
        </p>
      </AnimatedContent>

      <AnimatedContent delay={0.4}>
        <div className="mb-8 flex flex-col items-center justify-center gap-4 font-black sm:flex-row sm:gap-6">
          <Link
            href={heroData.primaryCTA?.link || "#projects"}
            onClick={() =>
              sendGAEvent("event", "hire_me_click", {
                event_category: "engagement",
                event_label: "hire_me_button",
                value: 1,
              })
            }
            className="w-full md:w-auto"
          >
            <Button size="2xl" className="w-full">
              <span>{heroData.primaryCTA?.text || "Hire me"}</span>
              <ArrowRight className="h-5 w-5 stroke-[3] transition-none group-hover:translate-x-2 md:h-6 md:w-6" />
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
              className="w-full sm:w-auto"
            >
              <Button size="2xl" color="secondary" className="w-full">
                <span>{heroData.secondaryCTA.text}</span>
              </Button>
            </Link>
          )}
        </div>
      </AnimatedContent>

      <AnimatedTechStack techs={techStack} />
    </HeroAnimations>
  );
};

export default Hero;
