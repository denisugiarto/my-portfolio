"use client";

import { cn } from "@/lib/utils";
import { ArrowBigUpIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Show button when user scrolls beyond the viewport height
      setIsVisible(scrollY > windowHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        isVisible ? "opacity-100" : "opacity-0",
        "fixed bottom-8 right-8 flex h-10 w-10 items-center justify-center rounded-full border bg-background transition-opacity hover:bg-accent z-50",
      )}
      aria-label="Back to Top"
    >
      <ArrowBigUpIcon className="h-6 w-6" />
    </button>
  );
}