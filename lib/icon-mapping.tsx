import React from "react";
import {
  // Frontend Frameworks
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiNuxtdotjs,

  // Programming Languages
  SiJavascript,
  SiTypescript,
  SiPython,
  SiOpenjdk,
  SiCsharp,
  SiGo,
  SiRust,
  SiPhp,
  SiRuby,
  SiDart,

  // Backend & Runtime
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiDjango,
  SiFlask,
  SiSpring,
  SiLaravel,
  SiRubyonrails,

  // Databases
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiSqlite,
  SiFirebase,
  SiSupabase,

  // CSS & Styling
  SiTailwindcss,
  SiCss3,
  SiSass,
  SiBootstrap,
  SiMui,
  SiShadcnui,
  SiChakraui,
  SiStyledcomponents,

  // Mobile Development
  SiFlutter,
  SiIonic,

  // Cloud & DevOps
  SiAmazon,
  SiGooglecloud,
  SiMicrosoftazure,
  SiVercel,
  SiNetlify,
  SiDocker,
  SiKubernetes,

  // Tools & Others
  SiGit,
  SiGithub,
  SiGitlabHex,
  SiVisualstudiocode,
  SiWebpack,
  SiVite,
  SiJest,
  SiFigma,

  // API & Data
  SiGraphql,
  SiPrisma,
  SiSanity,
  SiStrapi,

  // Social Platforms
  SiLinkedin,
  SiX,
  SiInstagram,
  SiFacebook,
  SiYoutube,
  SiTiktok,
  SiDiscord,
  SiTelegram,
  SiWhatsapp,

  // Developer Platforms
  SiDevdotto,
  SiMedium,
  SiHashnode,
  SiStackoverflow,
  SiCodepen,
  SiGitlab,
  SiBitbucket,

  // Design Platforms
  SiDribbble,
  SiBehance,

  // Contact & Other
  SiGmail,
  SiGooglechrome,
  SiAboutdotme,
  SiAdobeacrobatreader,
  SiRss,
  SiC,
} from "@icons-pack/react-simple-icons";

// Icon mapping object
export const iconMap: Record<string, React.ComponentType<any>> = {
  // Frontend Frameworks
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiNuxtdotjs,

  // Programming Languages
  SiJavascript,
  SiTypescript,
  SiPython,
  SiOpenjdk,
  SiCsharp,
  SiGo,
  SiRust,
  SiPhp,
  SiRuby,
  SiDart,

  // Backend & Runtime
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiDjango,
  SiFlask,
  SiSpring,
  SiLaravel,
  SiRubyonrails,

  // Databases
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiSqlite,
  SiFirebase,
  SiSupabase,

  // CSS & Styling
  SiTailwindcss,
  SiCss3,
  SiSass,
  SiBootstrap,
  SiMui,
  SiShadcnui,
  SiStyledcomponents,
  SiChakraui,

  // Mobile Development
  SiFlutter,
  SiIonic,

  // Cloud & DevOps
  SiAmazon,
  SiGooglecloud,
  SiMicrosoftazure,
  SiVercel,
  SiNetlify,
  SiDocker,
  SiKubernetes,

  // Tools & Others
  SiGit,
  SiGithub,
  SiVisualstudiocode,
  SiWebpack,
  SiVite,
  SiJest,
  SiFigma,

  // API & Data
  SiGraphql,
  SiPrisma,
  SiSanity,
  SiStrapi,

  // Social Platforms
  SiLinkedin,
  SiX,
  SiInstagram,
  SiFacebook,
  SiYoutube,
  SiTiktok,
  SiDiscord,
  SiTelegram,
  SiWhatsapp,

  // Developer Platforms
  SiDevdotto,
  SiMedium,
  SiHashnode,
  SiStackoverflow,
  SiCodepen,
  SiGitlab,
  SiBitbucket,

  // Design Platforms
  SiDribbble,
  SiBehance,

  // Contact & Other
  SiGmail,
  SiGooglechrome,
  SiAboutdotme,
  SiAdobeacrobatreader,
  SiRss,
};

// Platform-based icon fallbacks for social links
export const platformIconMap: Record<string, string> = {
  github: "SiGithub",
  gitlab: "SiGitlabHex",
  linkedin: "SiLinkedin",
  twitter: "SiX",
  instagram: "SiInstagram",
  facebook: "SiFacebook",
  youtube: "SiYoutube",
  tiktok: "SiTiktok",
  discord: "SiDiscord",
  telegram: "SiTelegram",
  whatsapp: "SiWhatsapp",
  email: "SiGmail",
  website: "SiGooglechrome",
  portfolio: "SiAboutdotme",
  resume: "SiAdobeacrobatreader",
  blog: "SiRss",
  devto: "SiDevdotto",
  medium: "SiMedium",
  hashnode: "SiHashnode",
  stackoverflow: "SiStackoverflow",
  codepen: "SiCodepen",
  dribbble: "SiDribbble",
  behance: "SiBehance",
  figma: "SiFigma",
};

// Component for rendering icons
interface IconProps {
  iconName?: string;
  platform?: string;
  className?: string;
  size?: number;
  color?: string;
}

export const DynamicIcon: React.FC<IconProps> = ({
  iconName,
  platform,
  className = "",
  size = 24,
  color,
}) => {
  // Try to get icon by name first, then by platform fallback
  const iconKey = iconName || (platform ? platformIconMap[platform] : null);
  const IconComponent = iconKey ? iconMap[iconKey] : null;

  if (!IconComponent) {
    // Fallback to a generic icon or return null
    return (
      <div
        className={`inline-flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <span style={{ fontSize: size * 0.8 }}>⚡</span>
      </div>
    );
  }

  return <IconComponent className={className} size={size} color={color} />;
};

// Utility function to get icon component
export const getIconComponent = (iconName?: string, platform?: string) => {
  const iconKey = iconName || (platform ? platformIconMap[platform] : null);
  return iconKey ? iconMap[iconKey] : null;
};

// Utility function to check if icon exists
export const hasIcon = (iconName?: string, platform?: string): boolean => {
  const iconKey = iconName || (platform ? platformIconMap[platform] : null);
  return iconKey ? !!iconMap[iconKey] : false;
};
