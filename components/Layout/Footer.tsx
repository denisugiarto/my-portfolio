"use client";

import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react";
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

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex w-fit items-center gap-2 px-1 py-1.5 text-lg font-bold uppercase tracking-wider text-foreground/80 transition-all duration-300 hover:text-foreground md:text-xl"
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
      </span>
      <ArrowUpRight
        size={16}
        className="stroke-[3] text-accent opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
        aria-hidden="true"
      />
    </Link>
  );
}

function ContactLink({
  href,
  icon,
  label,
  hoverColor = "hover:bg-primary hover:text-primary-foreground",
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  hoverColor?: string;
}) {
  return (
    <a
      href={href}
      className={`group flex w-fit items-center gap-3 rounded px-2 py-1.5 text-sm font-medium text-foreground/80 transition-all duration-300 hover:text-foreground md:text-base ${hoverColor}`}
    >
      <span className="transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
      <span className="break-all">{label}</span>
    </a>
  );
}

function SocialButton({
  href,
  icon,
  label,
  target,
  rel,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  target?: string;
  rel?: string;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className="group flex h-12 w-12 items-center justify-center rounded-none border-[3px] border-foreground bg-background text-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))]"
      aria-label={label}
      title={label}
    >
      <span className="transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
    </a>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const { data: siteSettings, isLoading: isLoadingSettings } = useQuery({
    queryKey: ["siteSettings"],
    queryFn: getSiteSettings,
    refetchOnWindowFocus: false,
  });

  const { data: footerSocialLinks, isLoading: isLoadingSocial } = useQuery({
    queryKey: ["footerSocialLinks"],
    queryFn: getFooterSocialLinks,
    refetchOnWindowFocus: false,
  });

  const contacts = {
    github: data.contact.find((contact) => contact.type === "github"),
    linkedin: data.contact.find((contact) => contact.type === "linkedin"),
    upwork: data.contact.find((contact) => contact.type === "upwork"),
    whatsapp: data.contact.find((contact) => contact.type === "whatsapp"),
  };

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

  if (isLoadingSettings || isLoadingSocial) {
    return (
      <footer className="mt-16 border-t-[3px] border-foreground bg-card text-foreground">
        <div className="container px-8 py-12 sm:px-12 md:px-16 md:py-16 lg:px-8">
          <div className="mb-12 grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="h-8 w-3/4 bg-muted" />
                <div className="h-4 w-full bg-muted" />
                <div className="h-4 w-2/3 bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </footer>
    );
  }

  const navLinks = [
    { href: "/experience", label: "Experience" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const services = [
    "Web Development",
    "Mobile Apps",
    "UI/UX Design",
    "Technical Consulting",
  ];

  return (
    <footer className="relative mt-16 border-t-[3px] border-foreground bg-card text-foreground">
      {/* CTA Banner */}
      <div className="border-b-[3px] border-foreground bg-background">
        <div className="container px-8 py-12 sm:px-12 md:px-16 md:py-16 lg:px-8">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-foreground md:text-4xl lg:text-5xl">
                Have a project in mind?
              </h2>
              <p className="mt-2 max-w-lg text-base font-medium text-foreground/70 md:text-lg">
                Let&apos;s build something amazing together.
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-none border-[3px] border-foreground bg-accent px-6 py-3 text-sm font-black uppercase tracking-widest text-accent-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))]"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight
                size={18}
                className="stroke-[3] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container px-8 py-12 sm:px-12 md:px-16 md:py-16 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-4">
          {/* Brand & Description (spans 2 columns) */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-3xl font-black uppercase tracking-tight text-foreground md:text-5xl">
              {displayName}
            </h3>
            <p className="mb-6 max-w-md rounded-none border-[3px] border-primary bg-secondary p-4 pl-4 text-base font-medium leading-relaxed text-foreground/80 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] md:text-lg">
              {description}
            </p>

            {/* Location badge */}
            <div className="mb-8 flex w-fit items-center gap-2 rounded-none border-[3px] border-foreground bg-background px-3 py-1.5 text-xs font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
              <MapPin size={16} className="stroke-[3] text-accent" />
              <span>
                Based in {location} &middot; {timezone}
              </span>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {footerSocialLinks && footerSocialLinks.length > 0 ? (
                footerSocialLinks.map((link) => {
                  const IconPlatform =
                    iconMap[link.icon ?? link.platform] || SiGithub;
                  return (
                    <SocialButton
                      key={link._id}
                      href={link.url}
                      icon={
                        link?.customIcon?.asset?.url ? (
                          <CachedInlineSVG
                            src={link.customIcon.asset.url}
                            alt={link.customPlatformName || link.platform}
                            className="block h-5 w-5"
                            color="currentColor"
                            enableContrastCheck={false}
                          />
                        ) : (
                          <IconPlatform size={20} />
                        )
                      }
                      label={link.label || `${link.platform} Profile`}
                      target={link.openInNewTab ? "_blank" : undefined}
                      rel={
                        link.openInNewTab ? "noopener noreferrer" : undefined
                      }
                    />
                  );
                })
              ) : (
                <>
                  {contacts.github && (
                    <SocialButton
                      href={contacts.github.link}
                      icon={<SiGithub size={20} />}
                      label="GitHub Profile"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  )}
                  {contacts.linkedin && (
                    <SocialButton
                      href={contacts.linkedin.link}
                      icon={<SiLinkedin size={20} />}
                      label="LinkedIn Profile"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  )}
                  {contacts.upwork && (
                    <SocialButton
                      href={contacts.upwork.link}
                      icon={<SiUpwork size={20} />}
                      label="Upwork Profile"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  )}
                </>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 inline-block rounded-none border-[3px] border-foreground bg-accent px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-accent-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
              Navigation
            </h4>
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="mb-6 inline-block rounded-none border-[3px] border-foreground bg-success px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-success-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
              Get in Touch
            </h4>
            <div className="flex flex-col space-y-1">
              {email && (
                <ContactLink
                  href={`mailto:${email}`}
                  icon={<Mail size={18} className="stroke-[2.5]" />}
                  label={email}
                />
              )}
              {contacts.whatsapp && (
                <ContactLink
                  href={contacts.whatsapp.link}
                  icon={<SiWhatsapp size={18} />}
                  label={contacts.whatsapp.value}
                  hoverColor="hover:bg-success hover:text-success-foreground"
                />
              )}
              <Link
                href="/contact"
                className="group mt-2 flex w-fit items-center gap-2 rounded border-2 border-foreground px-3 py-2 text-xs font-bold uppercase tracking-wider text-foreground transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground hover:shadow-[3px_3px_0px_0px_hsl(var(--foreground))]"
              >
                <MessageCircle size={16} className="stroke-[3]" />
                <span>Send Message</span>
                <ArrowUpRight
                  size={14}
                  className="stroke-[3] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-6 inline-block rounded-none border-[3px] border-foreground bg-muted px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
              Services
            </h4>
            <div className="flex flex-wrap gap-2">
              {services.map((service) => (
                <span
                  key={service}
                  className="rounded-none border-[3px] border-foreground bg-background px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-foreground/80 transition-colors duration-300 hover:text-foreground"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t-[3px] border-foreground pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-xs font-bold uppercase tracking-wider md:flex-row md:text-sm">
            <div className="rounded-none border-[3px] border-foreground bg-foreground px-4 py-2 text-background">
              &copy; {currentYear} {displayName}. All rights reserved.
            </div>

            <div className="flex flex-wrap items-center gap-2 rounded-none border-[3px] border-foreground bg-background px-4 py-2 text-sm font-bold text-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
              <span className="text-xs uppercase tracking-wider text-foreground/60">
                Built with
              </span>
              <span className="font-black text-primary">Next.js</span>
              <span className="text-accent">&middot;</span>
              <span className="font-black text-primary">Tailwind</span>
              <span className="text-accent">&middot;</span>
              <span className="font-black text-primary">Sanity</span>
              <span className="text-accent">&middot;</span>
              <span className="font-black text-primary">TypeScript</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
