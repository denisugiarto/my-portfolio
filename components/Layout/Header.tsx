"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getRepoStars } from "@/services/home";
import { NavigationItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { MenuIcon, XIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import data from "../../constant/data.json";
import GitHubStarsWrapper from "../GitHubStarsWrapper";
const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: true });

const navigation = [
  { name: "Home", href: "/#home" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
] as const;
export type ActiveNavbarType = (typeof navigation)[number]["name"] | undefined;

export type HeaderProps = {
  activeNavbar?: ActiveNavbarType;
  isNavColorBlack?: boolean;
};
export default function Header({ activeNavbar }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(0);

  const trapFocus = useCallback(
    (e: KeyboardEvent) => {
      if (!mobileMenuRef.current || !isOpen) return;
      const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [isOpen],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", trapFocus);
      document.body.style.overflow = "hidden";
      mobileMenuRef.current?.querySelector<HTMLElement>("button")?.focus();
    } else {
      document.removeEventListener("keydown", trapFocus);
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", trapFocus);
      document.body.style.overflow = "";
    };
  }, [isOpen, trapFocus]);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      lastScrollRef.current = current;

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(current / docHeight, 1));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const mobileMenuToggleHandler = () => setIsOpen(!isOpen);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("/#")) {
      const targetId = href.substring(2);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-accent transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      <header
        className={cn(
          "z-50 w-full transition-all duration-500 ease-out bg-background shadow-[0_4px_0px_0px_hsl(var(--foreground))]"
        )}
      >
        <div className="container py-2">
          <div className="relative flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex flex-shrink-0 items-center">
              <Link
                href="/"
                className="group relative rounded-none border-4 border-foreground bg-accent px-3 py-1 font-title text-3xl font-black uppercase text-accent-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))]"
                title={data.profile.name}
              >
                <span className="relative z-10">DS</span>
                <span className="absolute inset-0 -z-0 translate-x-1 translate-y-1 rounded-none bg-foreground/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav
              className="my-auto hidden sm:ml-10 lg:block"
              aria-label="Main navigation"
            >
              <div className="flex items-center space-x-1">
                {navigation.map((item: NavigationItem) => {
                  const isActive =
                    activeNavbar?.toLowerCase() === item.name.toLowerCase();
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        "group relative rounded-none px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300",
                        isActive
                          ? "border-4 border-foreground bg-foreground text-background shadow-[4px_4px_0px_0px_hsl(var(--foreground))]"
                          : "border-4 border-transparent text-foreground/80 hover:border-foreground hover:bg-secondary hover:text-foreground hover:shadow-[4px_4px_0px_0px_hsl(var(--foreground))]",
                        "hover:-translate-x-1 hover:-translate-y-1",
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.name}
                      {!isActive && (
                        <span className="absolute -bottom-1 left-1/2 h-[3px] w-0 -translate-x-1/2 bg-accent transition-all duration-300 group-hover:w-3/4" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Right side: GitHub Stars + Theme Toggle + Mobile Menu */}
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-3 lg:flex">
                <GitHubStarsWrapper
                  stars={repoStars || 0}
                  loading={isLoading}
                />
                <ThemeToggle />
              </div>

              {/* Mobile menu button */}
              <Button
                type="button"
                onClick={mobileMenuToggleHandler}
                className="inline-flex items-center justify-center border-4 border-foreground bg-primary px-3 py-2 text-primary-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))] lg:hidden"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <XIcon className="h-6 w-6 stroke-[3]" aria-hidden="true" />
                ) : (
                  <MenuIcon className="h-6 w-6 stroke-[3]" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu backdrop */}
        <div
          className={cn(
            "fixed inset-0 z-30 bg-foreground/60 backdrop-blur-sm transition-opacity duration-300",
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0",
          )}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />

        {/* Mobile menu panel */}
        <div
          ref={mobileMenuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
          className={cn(
            "fixed left-0 top-0 z-40 h-screen w-full bg-background shadow-[2px_0_0_0_hsl(var(--foreground))] transition-transform duration-500 ease-out lg:hidden",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="absolute right-4 top-4 flex items-center">
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center border-4 border-foreground bg-primary p-3 text-primary-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))]"
              aria-label="Close menu"
            >
              <XIcon className="h-6 w-6 stroke-[3]" aria-hidden="true" />
            </Button>
          </div>

          <div className="flex h-full flex-col justify-center px-8">
            <nav className="space-y-3">
              {navigation.map((item: NavigationItem, index) => {
                const isActive =
                  activeNavbar?.toLowerCase() === item.name.toLowerCase();
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      "block cursor-pointer rounded-none border-4 px-6 py-4 text-center text-xl font-bold uppercase tracking-wider transition-all duration-300",
                      isActive
                        ? "border-foreground bg-primary text-primary-foreground shadow-[6px_6px_0px_0px_hsl(var(--foreground))]"
                        : "border-foreground bg-card text-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:-translate-x-1 hover:-translate-y-1 hover:bg-secondary hover:shadow-[8px_8px_0px_0px_hsl(var(--foreground))]",
                    )}
                    style={{
                      transitionDelay: isOpen ? `${index * 75}ms` : "0ms",
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? "translateX(0)" : "translateX(-20px)",
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div
              className="mt-8 flex items-center justify-center gap-6 border-t-4 border-foreground pt-6 transition-all duration-500"
              style={{
                transitionDelay: isOpen ? "400ms" : "0ms",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <GitHubStarsWrapper stars={repoStars || 0} loading={isLoading} />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
