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
import { getAccessibleColorForContext } from "@/lib/contrast-checker";

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
    <footer className="border-t border-border bg-card">
      <div className="container py-8">
        {/* Main Footer Content */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand & Description */}
          <div className="md:col-span-2">
            <h3 className="mb-3 text-lg font-semibold text-card-foreground">
              {displayName}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>

            {/* Location */}
            <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={16} />
              <span>
                Based in {location} ({timezone})
              </span>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {footerSocialLinks && footerSocialLinks.length > 0 ? (
                footerSocialLinks.map((link) => {
                  const IconPlatform =
                    iconMap[link.icon ?? link.platform] || SiGithub;
                  const accessibleColor = link.color
                    ? getAccessibleColorForContext(link.color, "card")
                    : "currentColor";

                  return (
                    <a
                      key={link._id}
                      href={link.url}
                      target={link.openInNewTab ? "_blank" : "_self"}
                      rel={
                        link.openInNewTab ? "noopener noreferrer" : undefined
                      }
                      className="text-muted-foreground transition-colors hover:text-primary"
                      aria-label={link.label || `${link.platform} Profile`}
                      title={link.label || `${link.platform} Profile`}
                    >
                      {link?.customIcon?.asset?.url ? (
                        <CachedInlineSVG
                          src={link.customIcon.asset.url}
                          alt={link.customPlatformName || link.platform}
                          className="block h-5 w-5"
                          color={link.color || "currentColor"}
                          enableContrastCheck={true}
                          themeContext="card"
                        />
                      ) : (
                        <IconPlatform
                          size={20}
                          style={{ color: accessibleColor }}
                        />
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
                      className="text-muted-foreground transition-colors hover:text-primary"
                      aria-label="GitHub Profile"
                    >
                      <SiGithub size={20} />
                    </a>
                  )}
                  {contacts.linkedin && (
                    <a
                      href={contacts.linkedin.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-primary"
                      aria-label="LinkedIn Profile"
                    >
                      <SiLinkedin size={20} />
                    </a>
                  )}
                  {contacts.upwork && (
                    <a
                      href={contacts.upwork.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-primary"
                      aria-label="Upwork Profile"
                    >
                      <SiUpwork size={20} />
                    </a>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-card-foreground">
              Navigation
            </h4>
            <nav className="space-y-2">              
              <Link
                href="/experience"
                className="block text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Experience
              </Link>
              <Link
                href="/projects"
                className="block text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Projects
              </Link>
              <Link
                href="/blog"
                className="block text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-card-foreground">
              Get in Touch
            </h4>
            <div className="space-y-3">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail size={16} className="group-hover:text-primary" />
                  <span>{email}</span>
                </a>
              )}

              {contacts.whatsapp && (
                <a
                  href={contacts.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <SiWhatsapp size={16} className="group-hover:text-primary" />
                  <span>{contacts.whatsapp.value}</span>
                </a>
              )}

              <Link
                href="/contact"
                className="group flex items-center gap-2 text-sm text-primary transition-colors hover:text-primary/80"
              >
                <MessageCircle
                  size={16}
                  className="group-hover:text-primary/80"
                />
                <span>Send Message</span>
              </Link>

              {/* Services */}
              <div className="border-t border-border/50 pt-2">
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  Services:
                </p>
                <p className="text-xs text-muted-foreground">
                  Web Development • Mobile Apps
                </p>
                <p className="text-xs text-muted-foreground">
                  UI/UX • Technical Consulting
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-border pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-sm text-muted-foreground">
              <span>
                &copy; {currentYear} {displayName}. All rights reserved.
              </span>
            </div>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>Made with Next.js & Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
