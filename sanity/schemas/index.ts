import { blogPost } from "./blogPost";
import { blogCategory } from "./blogCategory";
import { project } from "./project";
import { contact } from "./contact";
import { seoSettings } from "./seoSettings";
import { experience } from "./experience";
import { technology } from "./technology";
import { socialLink } from "./socialLink";
import { heroSection } from "./heroSection";
import { aboutSection } from "./aboutSection";
import { skillsSection } from "./skillsSection";
import { siteSettings } from "./siteSettings";
import { tag } from "./tag";

export const schemaTypes = [
  // Site Configuration
  siteSettings,
  seoSettings,

  // Content Sections
  heroSection,
  aboutSection,
  skillsSection,

  // Content Types
  blogPost,
  blogCategory,
  project,
  experience,
  technology,
  socialLink,
  contact,
  tag,
];
