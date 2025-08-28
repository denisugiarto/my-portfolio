"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getRepoStars } from "@/services/home";
import { NavigationItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { MenuIcon, XIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import data from "../../constant/data.json";
import GitHubStarsWrapper from "../GitHubStarsWrapper";
const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: true });

const navigation = [
  {
    name: "Home",
    href: "/#home",
  },
  {
    name: "Projects",
    href: "/projects",
  },
  {
    name: "Experience",
    href: "/experience",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Contact",
    href: "/contact",
  },
] as const;
export type ActiveNavbarType = (typeof navigation)[number]["name"] | undefined;

export type HeaderProps = {
  activeNavbar?: ActiveNavbarType;
  isNavColorBlack?: boolean;
};
export default function Header({ activeNavbar }: HeaderProps) {
  const headerStyleOnScroll =
    "bg-background/80 backdrop-blur-md shadow-lg border-b border-border/50";
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const { data: repoStars, isLoading } = useQuery({
    queryKey: ["github-stars"],
    queryFn: getRepoStars,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const mobileMenuToggleHandler = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);

    // Handle smooth scrolling for hash links
    if (href.startsWith("/#")) {
      const targetId = href.substring(2);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  const isScrollLimit = scrollY > 20;
  return (
    <header
      className={cn(
        isScrollLimit
          ? headerStyleOnScroll
          : "border-b border-transparent bg-transparent",
        "fixed top-0 z-50 w-full transition-all duration-500 ease-out",
      )}
    >
      <div className="container py-2">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <Button
              variant="ghost"
              onClick={mobileMenuToggleHandler}
              className="inline-flex items-center justify-center rounded-xl p-2 text-muted-foreground transition-all duration-200 hover:bg-primary/20 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link
                href="/"
                className="rounded-xl border border-border/30 bg-card/80 p-2 px-3 font-title text-3xl font-bold text-foreground backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-primary-foreground hover:shadow-lg"
                title={data.profile.name}
              >
                DS
              </Link>
            </div>
            <div className="my-auto hidden font-body sm:ml-8 sm:block">
              <div className="flex space-x-2">
                {navigation.map((item: NavigationItem) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      activeNavbar?.toLowerCase() === item.name.toLowerCase()
                        ? "border border-primary/20 bg-primary/90 text-primary-foreground shadow-lg backdrop-blur-sm"
                        : "text-foreground/90 hover:border-border/30 hover:bg-card/60 hover:text-foreground hover:backdrop-blur-sm",
                      "rounded-xl border border-transparent px-4 py-2.5 text-sm font-medium backdrop-blur-sm transition-all duration-300 ease-out hover:shadow-md",
                    )}
                    aria-current={item.name ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <GitHubStarsWrapper stars={repoStars || 0} loading={isLoading} />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile menu, show/hide based on menu state. */}
      <div
        className={cn(
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0",
          "fixed left-0 top-0 z-40 h-screen w-80 border-r border-border/50 bg-background/90 shadow-2xl backdrop-blur-lg transition-all duration-300 ease-out",
        )}
      >
        <div className="flex h-full flex-col justify-center space-y-4 px-8">
          {navigation.map((item: NavigationItem) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                activeNavbar?.toLowerCase() === item.name.toLowerCase()
                  ? "border border-primary/20 bg-primary/90 text-primary-foreground shadow-lg backdrop-blur-sm"
                  : "border border-border/30 text-foreground backdrop-blur-sm hover:bg-card/60 hover:text-foreground",
                "block transform cursor-pointer rounded-xl px-6 py-4 text-center text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-md",
              )}
              aria-current={item.name ? "page" : undefined}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
