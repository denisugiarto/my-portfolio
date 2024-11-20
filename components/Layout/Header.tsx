import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getRepoStars } from "@/services/home";
import { NavigationItem } from "@/types";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { useQuery } from "@tanstack/react-query";
import { MenuIcon, StarIcon, XIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import data from "../../constant/data.json";
import SimpleTooltip from "../ui/simple-tooltip";
const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });

const navigation = [
  {
    name: "Home",
    href: "/#home",
  },
  {
    name: "Projects",
    href: "/#projects",
  },
  {
    name: "Contact Me",
    href: "/#contactMe",
  },
  {
    name: "Experience",
    href: "/#experience",
  },
  {
    name: "Blog",
    href: "/blog",
  },
] as const;
export type ActiveNavbarType = (typeof navigation)[number]["name"] | undefined;

export type HeaderProps = {
  activeNavbar?: ActiveNavbarType;
  isNavColorBlack?: boolean;
};
export default function Header({
  activeNavbar,
  isNavColorBlack = false,
}: HeaderProps) {
  const headerStyleOnScroll = "bg-gray-700/80 shadow-xl border-primary";
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { data: repoStars } = useQuery({
    queryKey: ["header"],
    queryFn: getRepoStars,
    refetchOnWindowFocus: false,
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

  const isScrollLimit = scrollY > 80;
  return (
    <header
      className={cn(
        isScrollLimit ? headerStyleOnScroll : "",
        "fixed top-0 z-10 w-full rounded-b-lg border-b-2 border-transparent transition-all duration-300",
      )}
    >
      <div className="container py-2">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <Button
              variant="ghost"
              onClick={mobileMenuToggleHandler}
              className="inline-flex items-center justify-center rounded-xl p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
                className="rounded border border-transparent bg-slate-100 p-1 font-title text-4xl transition duration-300 dark:bg-slate-900"
                title={data.profile.name}
              >
                DS
              </Link>
            </div>
            <div className="my-auto hidden font-body sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item: NavigationItem) => (
                  <SimpleTooltip key={item.name} title={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        isScrollLimit
                          ? "text-gray-200 dark:text-gray-300"
                          : `${
                              isNavColorBlack
                                ? "text-gray-900"
                                : "text-gray-200"
                            } dark:text-gray-200`,
                        activeNavbar?.toLowerCase() === item.name.toLowerCase()
                          ? "bg-primary font-bold !text-primary-foreground shadow-2xl"
                          : "hover:bg-primary hover:text-primary-foreground",
                        "rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-500 ease-in-out",
                      )}
                      aria-current={item.name ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  </SimpleTooltip>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <SimpleTooltip title="Star on Github">
              <a
                href="https://github.com/denisugiarto/my-portfolio"
                target="_blank"
                rel="noreferrer"
                title="Star on Github"
                className="group flex items-center rounded-xl border border-transparent bg-slate-50 p-1 px-1 font-title text-sm font-bold text-gray-900 transition duration-300 hover:text-yellow-500 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-200 dark:hover:bg-primary dark:hover:text-primary-foreground"
              >
                <SiGithub
                  title="Star on Github"
                  className="h-5 text-black dark:text-slate-50 "
                />
                <span>
                  <StarIcon fill="currentColor" className="h-4 text-inherit" />
                </span>
                <span className="hidden font-bold lg:inline">
                  {repoStars ?? 1000}
                </span>
              </a>
            </SimpleTooltip>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* // Mobile menu, show/hide based on menu state. */}
      <div
        className={cn(
          isOpen ? "w-screen opacity-100" : "w-0 opacity-0",
          "absolute left-0 h-screen space-y-1 bg-background px-2 pb-3 pt-2 transition-all duration-500 ease-in-out",
        )}
      >
        {navigation.map((item: NavigationItem) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              activeNavbar?.toLowerCase() === item.name.toLowerCase()
                ? "bg-primary text-primary-foreground"
                : "text-slate-900 hover:bg-gray-700 hover:text-primary-foreground dark:text-slate-200",
              "block cursor-pointer rounded-xl px-3 py-2 text-center text-base font-medium focus:bg-primary",
            )}
            aria-current={item.name ? "page" : undefined}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </header>
  );
}
