import { PortableTextBlock } from "@portabletext/react";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import {
  SanityImageSource
} from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dmdxpdxy",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: process.env.NODE_ENV === "production",
  apiVersion: "2024-01-01",
  perspective: "published",
  token: process.env.SANITY_API_TOKEN, // Optional: only if dataset is private
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export interface Tags {
  _id: string;
  name: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: SanityImageSource;
  content: (PortableTextBlock | SanityImageSource)[];
  tags?: Tags[];
  publishedAt: string;
  readTime?: number;
  published: boolean;
  featured: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImageSource;
  };
}

export interface Technology {
  _id: string;
  name: string;
  slug: { current: string };
  category: string;
  description?: string;
  icon?: string;
  color?: string;
  website?: string;
  proficiencyLevel?: string;
  yearsOfExperience?: number;
  featured: boolean;
  isActive: boolean;
  order?: number;
}

export interface SocialLink {
  _id: string;
  platform: string;
  customPlatformName?: string;
  url: string;
  username?: string;
  label?: string;
  icon?: string;
  customIcon?: {
    asset: {
      _id: string;
      url: string;
    };
  };
  color?: string;
  isPublic: boolean;
  isPrimary: boolean;
  openInNewTab: boolean;
  showInHeader: boolean;
  showInFooter: boolean;
  showInHero: boolean;
  showInContact: boolean;
  order?: number;
  description?: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  shortDescription?: string;
  coverImage?: SanityImageSource;
  gallery?: SanityImageSource[];
  technologies?: Technology[];
  category?: string;
  status: string;
  liveUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  published: boolean;
  featured: boolean;
  order?: number;
  completedAt?: string;
  content?: (PortableTextBlock | SanityImageSource)[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImageSource;
  };
}

export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  message: string;
}

export interface SEOSettings {
  _id: string;
  pageId: string;
  title: string;
  metaTitle?: string;
  metaDescription: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: SanityImageSource;
  twitterCard: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: SanityImageSource;
  canonicalUrl?: string;
  noIndex: boolean;
  noFollow: boolean;
  structuredData?: string;
}

export interface Experience {
  _id: string;
  jobTitle: string;
  company: string;
  companyUrl?: string;
  location?: string;
  employmentType: string;
  workType?: string;
  startDate: string;
  endDate?: string;
  currentJob: boolean;
  description?: (PortableTextBlock | SanityImageSource)[];
  achievements?: string[];
  technologies?: Technology[];
  skills?: { name: string }[];
  companyLogo?: SanityImageSource;
  featured: boolean;
  order: number;
  visible: boolean;
}

export interface HeroSection {
  _id: string;
  headline: string;
  subheadline: string;
  bio: string;
  primaryCTA: {
    text: string;
    link?: string;
  };
  secondaryCTA: {
    text: string;
    link?: string;
  };
  backgroundImage?: SanityImageSource;
  availabilityStatus: {
    isAvailable: boolean;
    statusText: string;
  };
  technologies?: Technology[];
  socialLinks?: SocialLink[];
}

export interface SiteSettings {
  _id: string;
  siteInfo: {
    siteName: string;
    tagline?: string;
    description?: string;
    siteUrl: string;
    author: string;
    favicon?: SanityImageSource;
  };
  personalInfo: {
    fullName: string;
    displayName?: string;
    jobTitle: string;
    email: string;
    phone?: string;
    location?: string;
    timezone?: string;
    profileImage?: SanityImageSource;
  };
  socialLinks: {
    platform: string;
    url: string;
    username?: string;
    isMainContact: boolean;
    showInNavigation: boolean;
    showInFooter: boolean;
  }[];
  contactSettings: {
    responseTime?: string;
    availabilityStatus?: string;
    calendlyUrl?: string;
    bookingCTA?: string;
  };
}
