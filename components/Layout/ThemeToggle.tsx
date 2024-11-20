"use client";
import { Button } from "@/components/ui/button";
import { MoonIcon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import SimpleTooltip from "../ui/simple-tooltip";

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
        className={"rounded-md bg-primary p-1 text-slate-50"}
        aria-label="Toggle Theme"
        title="Toggle Theme"
      >
        {resolvedTheme === "dark" ? <MoonIcon /> : <Sun />}
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
