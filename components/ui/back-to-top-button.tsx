"use client";

import { cn } from "@/lib/utils";
import { ArrowBigUpIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./button";

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
    <Button      
      onClick={scrollToTop}
      className={cn(
        isVisible ? "opacity-100" : "opacity-0",
        "fixed bottom-28 right-8 z-50 flex w-10  p-0 items-center justify-center rounded-none bg-background text-foreground transition-opacity hover:bg-accent",
      )}
      aria-label="Back to Top"
    >
      <ArrowBigUpIcon className="h-6 w-6" />
    </Button>
  );
}
