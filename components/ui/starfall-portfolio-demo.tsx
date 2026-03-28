"use client";

import { BrainCircuit, Mail, PanelsTopLeft } from "lucide-react";
import {
  PortfolioPage,
  PortfolioPageProps,
} from "@/components/ui/starfall-portfolio-landing";

const customPortfolioData: PortfolioPageProps = {
  logo: {
    initials: "AT",
    name: "Alex Thompson",
  },
  navLinks: [
    { label: "Bio", href: "#about" },
    { label: "Work", href: "#projects" },
    { label: "Expertise", href: "#skills" },
  ],
  resume: {
    label: "Download CV",
    onClick: () => alert("Downloading CV..."),
  },
  hero: {
    titleLine1: "Full-Stack Engineer &",
    titleLine2Gradient: "UX Architect",
    subtitle:
      "I build robust and scalable web applications with a strong focus on user-centric design and performance.",
  },
  ctaButtons: {
    primary: {
      label: "Explore My Work",
      onClick: () => {
        document
          .getElementById("projects")
          ?.scrollIntoView({ behavior: "smooth" });
      },
    },
    secondary: {
      label: "Contact Me",
      onClick: () => {
        window.location.href = "mailto:alex.thompson@example.com";
      },
    },
  },
  projects: [
    {
      title: "E-commerce Platform",
      description:
        "A scalable online store built with Next.js, TypeScript, and Stripe.",
      tags: ["Next.js", "Stripe", "Vercel"],
      imageContent: (
        <div
          className="project-image relative h-32 overflow-hidden rounded-none"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(15, 23, 42, 0.08), rgba(15, 23, 42, 0.7)), url(https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-slate-950/45 absolute bottom-3 left-3 rounded-none border border-white/20 p-2 text-white backdrop-blur-md">
            <PanelsTopLeft className="h-4 w-4" />
          </div>
        </div>
      ),
    },
    {
      title: "SaaS Dashboard",
      description:
        "A real-time analytics dashboard for a B2B software-as-a-service product.",
      tags: ["React", "Chart.js", "Firebase"],
      imageContent: (
        <div
          className="project-image relative h-32 overflow-hidden rounded-none"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(15, 23, 42, 0.08), rgba(15, 23, 42, 0.7)), url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-slate-950/45 absolute bottom-3 left-3 rounded-none border border-white/20 p-2 text-white backdrop-blur-md">
            <BrainCircuit className="h-4 w-4" />
          </div>
        </div>
      ),
    },
    {
      title: "AI Content Generator",
      description:
        "Leveraging OpenAI to generate marketing copy for businesses.",
      tags: ["Next.js", "OpenAI", "Tailwind CSS"],
      imageContent: (
        <div
          className="project-image relative h-32 overflow-hidden rounded-none"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(15, 23, 42, 0.08), rgba(15, 23, 42, 0.7)), url(https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-slate-950/45 absolute bottom-3 left-3 rounded-none border border-white/20 p-2 text-white backdrop-blur-md">
            <Mail className="h-4 w-4" />
          </div>
        </div>
      ),
    },
  ],
  stats: [
    { value: "7+", label: "Years of Experience" },
    { value: "30+", label: "Client Projects" },
    { value: "99%", label: "Client Satisfaction" },
  ],
  showAnimatedBackground: true,
};

const StarfallPortfolioDemo = () => {
  return <PortfolioPage {...customPortfolioData} />;
};

export { StarfallPortfolioDemo };
