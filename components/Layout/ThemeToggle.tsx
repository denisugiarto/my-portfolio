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
      <Button
        variant="icon"
        color="primary"
        size="iconLg"
        className={cn(
          "pointer-events-none hover:bg-background hover:text-foreground",
        )}
        aria-label="Toggle Theme"
        title="Toggle Theme"
        disabled
      >
        <div className="h-5 w-5" /> {/* Placeholder to maintain layout */}
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="icon"
      color="primary"
      size="iconLg"
      onClick={handleThemeToggle}
      aria-label="Toggle Theme"
      title="Toggle Theme"
      className="transition-transform duration-200 hover:rotate-12"
    >
      {resolvedTheme === "dark" ? (
        <MoonIcon className="h-5 w-5 stroke-[3] transition-transform duration-200" />
      ) : (
        <Sun className="h-5 w-5 stroke-[3] transition-transform duration-200" />
      )}
    </Button>
  );
};

export default ThemeToggle;
