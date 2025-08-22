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
        variant="ghost"
        size="icon"
        color="primary"
        className="rounded-md p-1"
        aria-label="Toggle Theme"
        title="Toggle Theme"
        disabled
      >
        <div className="h-4 w-4" /> {/* Placeholder to maintain layout */}
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      color="primary"
      onClick={handleThemeToggle}
      className={cn(
        resolvedTheme === "dark" ? "text-slate-50" : "text-slate-950",
        "rounded-md p-1",
      )}
      aria-label="Toggle Theme"
      title="Toggle Theme"
    >
      {resolvedTheme === "dark" ? <MoonIcon /> : <Sun />}
    </Button>
  );
};

export default ThemeToggle;
