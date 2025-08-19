"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoonIcon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const handleThemeToggle = () => {
    const isDark = resolvedTheme === "dark";
    setTheme(isDark ? "light" : "dark");
  };

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
