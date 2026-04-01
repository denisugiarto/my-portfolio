"use client";

import { Mail, MapPin, MessageCircle } from "lucide-react";
import {
  SiGithub,
  SiLinkedin,
  SiUpwork,
  SiWhatsapp,
} from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getSiteSettings, getFooterSocialLinks } from "@/lib/sanity-queries";
import data from "../../constant/data.json";
import { iconMap } from "@/lib/icon-mapping";
import CachedInlineSVG from "../cached-inline-svg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Fetch site settings from Sanity
  const { data: siteSettings } = useQuery({
    queryKey: ["siteSettings"],
    queryFn: getSiteSettings,
    refetchOnWindowFocus: false,
  });

  // Fetch footer social links from Sanity
  const { data: footerSocialLinks } = useQuery({
    queryKey: ["footerSocialLinks"],
    queryFn: getFooterSocialLinks,
    refetchOnWindowFocus: false,
  });

  // Fallback to JSON data if Sanity data is not available
  const contacts = {
    github: data.contact.find((contact) => contact.type === "github"),
    linkedin: data.contact.find((contact) => contact.type === "linkedin"),
    upwork: data.contact.find((contact) => contact.type === "upwork"),
    whatsapp: data.contact.find((contact) => contact.type === "whatsapp"),
  };

  // Use Sanity data with fallbacks
  const displayName =
    siteSettings?.personalInfo?.displayName ||
    siteSettings?.personalInfo?.fullName ||
    "Deni Sugiarto";
  const description =
    siteSettings?.siteInfo?.description ||
    "Frontend Web Developer specializing in React.js, Next.js, and React Native. Creating seamless digital experiences with modern web technologies.";
  const location = siteSettings?.personalInfo?.location || "Indonesia";
  const timezone = siteSettings?.personalInfo?.timezone || "GMT+7";
  const email = siteSettings?.personalInfo?.email;

  return (
    <footer className="mt-16 border-t-[3px] border-foreground bg-card text-foreground">
      <div className="container px-8 py-12 sm:px-12 md:px-16 md:py-16 lg:px-8">
        {/* Main Footer Content */}
        <div className="mb-12 grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-16">
          {/* Brand & Description */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-3xl font-black uppercase tracking-tight text-foreground md:text-5xl">
              {displayName}
            </h3>
            <p className="mb-6 max-w-md rounded border-[3px] border-primary bg-secondary p-4 pl-4 text-lg font-bold leading-relaxed text-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
              {description}
            </p>

            {/* Location */}
            <div className="mb-8 flex w-fit items-center gap-2 rounded border-[3px] border-foreground bg-background px-3 py-1 text-sm font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
              <MapPin size={18} className="stroke-[3]" />
              <span>
                BASED IN {location} ({timezone})
              </span>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4">
              {footerSocialLinks && footerSocialLinks.length > 0 ? (
                footerSocialLinks.map((link) => {
                  const IconPlatform =
                    iconMap[link.icon ?? link.platform] || SiGithub;

                  return (
                    <a
                      key={link._id}
                      href={link.url}
                      target={link.openInNewTab ? "_blank" : "_self"}
                      rel={
                        link.openInNewTab ? "noopener noreferrer" : undefined
                      }
                      className="flex h-12 w-12 items-center justify-center rounded border-[3px] border-foreground bg-background text-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-primary hover:text-primary-foreground hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                      aria-label={link.label || `${link.platform} Profile`}
                      title={link.label || `${link.platform} Profile`}
                    >
                      {link?.customIcon?.asset?.url ? (
                        <CachedInlineSVG
                          src={link.customIcon.asset.url}
                          alt={link.customPlatformName || link.platform}
                          className="block h-6 w-6"
                          color="currentColor"
                          enableContrastCheck={false}
                        />
                      ) : (
                        <IconPlatform size={24} />
                      )}
                    </a>
                  );
                })
              ) : (
                // Fallback to JSON data
                <>
                  {contacts.github && (
                    <a
                      href={contacts.github.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded border-[3px] border-foreground bg-background text-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-primary hover:text-primary-foreground hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                      aria-label="GitHub Profile"
                    >
                      <SiGithub size={24} />
                    </a>
                  )}
                  {contacts.linkedin && (
                    <a
                      href={contacts.linkedin.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded border-[3px] border-foreground bg-background text-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-primary hover:text-primary-foreground hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                      aria-label="LinkedIn Profile"
                    >
                      <SiLinkedin size={24} />
                    </a>
                  )}
                  {contacts.upwork && (
                    <a
                      href={contacts.upwork.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded border-[3px] border-foreground bg-background text-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-primary hover:text-primary-foreground hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                      aria-label="Upwork Profile"
                    >
                      <SiUpwork size={24} />
                    </a>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 inline-block rounded border-[3px] border-foreground bg-accent px-3 py-1 text-xs font-black uppercase tracking-widest text-accent-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
              NAVIGATION
            </h4>
            <nav className="flex flex-col space-y-3 text-lg font-black uppercase tracking-wider">
              <Link
                href="/experience"
                className="w-fit px-1 text-foreground decoration-4 underline-offset-4 transition-none hover:bg-foreground hover:text-background"
              >
                Experience
              </Link>
              <Link
                href="/projects"
                className="w-fit px-1 text-foreground decoration-4 underline-offset-4 transition-none hover:bg-foreground hover:text-background"
              >
                Projects
              </Link>
              <Link
                href="/blog"
                className="w-fit px-1 text-foreground decoration-4 underline-offset-4 transition-none hover:bg-foreground hover:text-background"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="w-fit px-1 text-foreground decoration-4 underline-offset-4 transition-none hover:bg-foreground hover:text-background"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="mb-6 inline-block rounded border-[3px] border-foreground bg-success px-3 py-1 text-xs font-black uppercase tracking-widest text-success-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
              GET IN TOUCH
            </h4>
            <div className="flex flex-col space-y-4 text-base font-bold">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="group flex w-fit items-center gap-3 px-2 py-1 text-foreground transition-none hover:bg-primary hover:text-primary-foreground"
                >
                  <Mail size={20} className="stroke-[3]" />
                  <span>{email}</span>
                </a>
              )}

              {contacts.whatsapp && (
                <a
                  href={contacts.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-fit items-center gap-3 px-2 py-1 text-foreground transition-none hover:bg-success hover:text-success-foreground"
                >
                  <SiWhatsapp size={20} />
                  <span>{contacts.whatsapp.value}</span>
                </a>
              )}

              <Link
                href="/contact"
                className="group flex w-fit items-center gap-3 px-2 py-1 text-foreground transition-none hover:bg-accent hover:text-accent-foreground"
              >
                <MessageCircle size={20} className="stroke-[3]" />
                <span className="font-black uppercase tracking-widest">
                  Send Message
                </span>
              </Link>

              {/* Services */}
              <div className="mt-8 border-t-[3px] border-foreground pt-6">
                <p className="mb-3 inline-block rounded border-[3px] border-foreground bg-muted px-2 py-1 text-xs font-black uppercase tracking-widest text-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
                  SERVICES
                </p>
                <div className="flex flex-col gap-2 text-sm font-black uppercase tracking-wide">
                  <p className="rounded border-[3px] border-foreground bg-background px-2 py-1">
                    WEB DEVELOPMENT • MOBILE APPS
                  </p>
                  <p className="rounded border-[3px] border-foreground bg-background px-2 py-1">
                    UI/UX • TECHNICAL CONSULTING
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t-[3px] border-foreground pt-8">
          <div className="flex flex-col items-center justify-between gap-6 text-xs font-black uppercase tracking-wider md:flex-row md:text-sm">
            <div className="rounded border-[3px] border-foreground bg-foreground px-3 py-1.5 text-background">
              <span>
                &copy; {currentYear} {displayName}. ALL RIGHTS RESERVED.
              </span>
            </div>

            <div className="flex items-center gap-2 rounded border-[3px] border-foreground bg-primary px-3 py-1.5 text-primary-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
              <span>MADE WITH NEXT.JS & TAILWIND CSS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
