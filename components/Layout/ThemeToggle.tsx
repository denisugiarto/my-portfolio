"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoonIcon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before showing theme-dependent content
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = () => {
    const isDark = resolvedTheme === "dark";
    setTheme(isDark ? "light" : "dark");
  };

  // Show loading state until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className="inline-flex h-12 w-12 items-center justify-center rounded-none border-[3px] border-foreground bg-background p-1 text-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-none pointer-events-none"
        aria-label="Toggle Theme"
        title="Toggle Theme"
        disabled
      >
        <div className="h-5 w-5" /> {/* Placeholder to maintain layout */}
      </button>
    );
  }

  return (
    <button
      onClick={handleThemeToggle}
      className={cn(
        "inline-flex h-12 w-12 items-center justify-center rounded-none border-[3px] border-foreground bg-background text-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-none hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-primary hover:text-primary-foreground hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      )}
      aria-label="Toggle Theme"
      title="Toggle Theme"
    >
      {resolvedTheme === "dark" ? <MoonIcon className="h-5 w-5 stroke-[3]" /> : <Sun className="h-5 w-5 stroke-[3]" />}
    </button>
  );
};

export default ThemeToggle;
