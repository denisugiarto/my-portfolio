"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoonIcon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const ThemeToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  function setThemeMode(theme: string) {
    setTheme(theme);
    setIsOpen(false);
  }

  const themeVariant = [
    {
      name: "light",
      caption: "Light",
    },
    {
      name: "dark",
      caption: "Dark",
    },
    {
      name: "system",
      caption: "System",
    },
  ];

  return (
    <Popover open={isOpen}>
      <PopoverTrigger
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          resolvedTheme === "dark"
            ? "bg-primary text-yellow-400"
            : "bg-primary text-slate-100",
          "rounded-md p-1",
        )}
      >
        {resolvedTheme === "dark" ? <Sun /> : <MoonIcon />}
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col !p-0">
        {themeVariant.map((item) => (
          <Button
            key={item.name}
            variant={theme === item.name ? "default" : "ghost"}
            onClick={() => setThemeMode(item.name)}
          >
            {item.caption}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default ThemeToggle;
