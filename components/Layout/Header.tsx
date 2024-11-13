import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavigationItem } from "@/types";
import { MenuIcon, XIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import data from "../../constant/data.json";
import { SiGithub } from "@icons-pack/react-simple-icons";
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

type HeaderProps = {
  activeNavbar: ActiveNavbarType;
}
export default function Header({ activeNavbar }: HeaderProps) {
  const headerStyleOnScroll = "bg-white/20 backdrop-blur shadow-xl";
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

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
        "fixed top-0 z-10 w-full transition-all duration-300",
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
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      isScrollLimit
                        ? "text-gray-900 dark:text-gray-300"
                        : "text-gray-600 dark:text-gray-200",
                      activeNavbar?.toLowerCase() === item.name.toLowerCase()
                        ? "bg-primary font-semibold !text-primary-foreground shadow-2xl"
                        : " hover:bg-primary hover:text-primary-foreground",
                      "rounded-xl px-3 py-2 text-sm font-medium",
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
            <a
              href="https://github.com/denisugiarto/my-portfolio"
              target="_blank"
              rel="noreferrer"
              title="source code"
              className="group flex items-center overflow-hidden rounded-xl border border-transparent bg-slate-50 p-1 px-1.5 font-title text-sm font-medium text-gray-400 transition duration-300 hover:text-primary-foreground dark:bg-slate-900 dark:text-gray-200 dark:hover:bg-primary dark:hover:text-primary-foreground"
            >
              <SiGithub className="text-black dark:text-slate-50" />
              <span className="w-0 overflow-hidden whitespace-nowrap text-black opacity-0 transition-all delay-300 duration-1000 ease-in-out group-hover:ml-2 group-hover:w-24 group-hover:opacity-100 group-hover:delay-75 group-hover:duration-500 dark:text-white">
                Source Code
              </span>
            </a>
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
                : "text-secondary hover:bg-gray-700 hover:text-primary-foreground",
              "block cursor-pointer rounded-xl px-3 py-2 text-center text-base font-medium",
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
