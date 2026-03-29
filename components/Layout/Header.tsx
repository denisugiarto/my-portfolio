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
import { useIsMobile } from "@/hooks/useIsMobile";
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
    "bg-background border-b-4 border-foreground shadow-[0_8px_0px_0px_hsl(var(--foreground))] py-1";
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile(640);

  const { data: repoStars, isLoading } = useQuery({
    queryKey: ["github-stars"],
    queryFn: getRepoStars,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
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
          : "border-b-4 border-transparent bg-background/0 py-2",
        "fixed top-0 z-50 w-full transition-all duration-300 ease-none",
      )}
    >
      <div className="container py-2">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start sm:items-stretch">
            <div className="flex flex-shrink-0 items-center">
              <Link
                href="/"
                className="rounded-none border-4 border-foreground bg-accent px-3 py-1 font-title text-3xl font-black uppercase text-accent-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-none hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))]"
                title={data.profile.name}
              >
                DS
              </Link>
            </div>
            <div className="my-auto hidden font-body sm:ml-10 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item: NavigationItem) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      activeNavbar?.toLowerCase() === item.name.toLowerCase()
                        ? "border-4 border-foreground bg-foreground text-background shadow-[4px_4px_0px_0px_hsl(var(--foreground))]"
                        : "border-4 border-transparent text-foreground hover:border-foreground hover:bg-secondary hover:shadow-[4px_4px_0px_0px_hsl(var(--foreground))]",
                      "rounded-none px-4 py-2 font-black uppercase tracking-widest text-sm transition-none hover:-translate-y-1 hover:-translate-x-1",
                    )}
                    aria-current={item.name ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button
              onClick={mobileMenuToggleHandler}
              className="inline-flex items-center justify-center rounded-none border-4 border-foreground bg-primary px-3 py-2 text-primary-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-none hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))] focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XIcon className="block h-6 w-6 stroke-[3]" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6 stroke-[3]" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <GitHubStarsWrapper stars={repoStars || 0} loading={isLoading} />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/90 backdrop-blur-none"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile menu, show/hide based on menu state. */}

      {isMobile && (
        <div
          className={cn(
            isOpen ? "translate-x-0" : "-translate-x-full",
            "fixed left-0 top-0 z-40 h-screen w-full bg-background shadow-[2px_0_0_0_hsl(var(--foreground))] transition-transform duration-300 ease-out",
          )}
        >
          <div className="absolute right-4 top-4 flex items-center sm:hidden pt-2 pl-2">
            <button
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center rounded-none border-4 border-foreground bg-primary px-3 py-2 text-primary-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-none hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))] focus:outline-none"
            >
              <span className="sr-only">Close main menu</span>
              <XIcon className="block h-6 w-6 stroke-[3]" aria-hidden="true" />
            </button>
          </div>
          <div className="flex h-full flex-col justify-center space-y-6 px-8">
            {navigation.map((item: NavigationItem) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  activeNavbar?.toLowerCase() === item.name.toLowerCase()
                    ? "border-4 border-foreground bg-primary text-primary-foreground shadow-[6px_6px_0px_0px_hsl(var(--foreground))]"
                    : "border-4 border-foreground bg-card text-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:bg-secondary hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_hsl(var(--foreground))]",
                  "block cursor-pointer rounded-none px-6 py-4 text-center text-xl font-black uppercase tracking-widest transition-none",
                )}
                aria-current={item.name ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-6 mt-2 border-t-4 border-foreground flex flex-row items-center justify-center gap-6">
              <GitHubStarsWrapper stars={repoStars || 0} loading={isLoading} />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
