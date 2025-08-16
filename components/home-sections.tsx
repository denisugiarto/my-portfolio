"use client";

import { Layout } from "@/components/Layout/Layout";
import Hero, { linkHireMe } from "@/features/home/hero";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import WhatsappIcon from "@/public/WhatsApp-icon.svg";
import { ArrowBigUp, ArrowBigUpIcon, PhoneCallIcon } from "lucide-react";

const Contact = dynamic(() => import("@/features/home/contact"), {
  loading: () => <p>Loading...</p>,
  ssr: true,
});
const Experience = dynamic(() => import("@/features/home/experience"), {
  loading: () => <p>Loading...</p>,
  ssr: true,
});
const Projects = dynamic(() => import("@/features/home/projects"), {
  loading: () => <p>Loading...</p>,
  ssr: true,
});
const Blog = dynamic(() => import("@/features/home/blog"), {
  loading: () => <p>Loading...</p>,
  ssr: true,
});

export default function HomeSections() {
  const [isHomeVisible, setIsHomeVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Simple scroll-based section detection
      if (scrollY < windowHeight * 0.5) {
        setIsHomeVisible(true);
      } else {
        setIsHomeVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout activeNavbar="Home">
      <Hero />
      <Projects />
      <Blog />
      <Contact />
      <a
        href="#"
        className={cn(
          !isHomeVisible ? "opacity-100" : "opacity-0",
          "fixed bottom-8 right-8 flex items-center justify-center h-10 w-10 rounded-full  transition-opacity",
        )}
        aria-label="Back to Top"
      >
        <ArrowBigUpIcon className="h-6 w-6 bg-re" />
      </a>
    </Layout>
  );
}
