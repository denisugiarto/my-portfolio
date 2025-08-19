import {
  client,
  BlogPost,
  Project,
  SEOSettings,
  ContactMessage,
  Experience,
  HeroSection,
  Technology,
  SocialLink,
} from "./sanity";

export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  try {
    const query = `*[_type == "blogPost" && published == true] | order(publishedAt desc) ${
      limit ? `[0...${limit}]` : ""
    } {
      _id,
      title,
      slug,
      excerpt,
      coverImage,
      tags,
      publishedAt,
      readTime,
      published,
      featured,
      seo
    }`;

    const result = await client.fetch(query);
    return result || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "blogPost" && featured == true && published == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    tags,
    publishedAt,
    readTime,
    published,
    featured,
    seo
  }`;

  return await client.fetch(query);
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  try {
    const query = `*[_type == "blogPost" && slug.current == $slug && published == true][0] {
      _id,
      title,
      slug,
      excerpt,
      coverImage,
      content,
      tags,
      publishedAt,
      readTime,
      published,
      featured,
      seo
    }`;

    const result = await client.fetch(query, { slug });
    return result || null;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function getProjects(limit?: number): Promise<Project[]> {
  const query = `*[_type == "project" && published == true] | order(order asc, completedAt desc) ${
    limit ? `[0...${limit}]` : ""
  } {
    _id,
    title,
    slug,
    description,
    shortDescription,
    coverImage,
    gallery,
    technologies[]->{
      _id,
      name,
      slug,
      category,
      description,
      icon,
      color,
      website,
      proficiencyLevel,
      yearsOfExperience,
      featured,
      isActive,
      order
    },
    category,
    status,
    liveUrl,
    githubUrl,
    demoUrl,
    published,
    featured,
    order,
    completedAt,
    seo
  }`;

  return await client.fetch(query);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const query = `*[_type == "project" && featured == true && published == true] | order(order asc, completedAt desc) {
    _id,
    title,
    slug,
    description,
    shortDescription,
    coverImage,
    gallery,
    technologies[]->{
      _id,
      name,
      slug,
      category,
      description,
      icon,
      color,
      website,
      proficiencyLevel,
      yearsOfExperience,
      featured,
      isActive,
      order
    },
    category,
    status,
    liveUrl,
    githubUrl,
    demoUrl,
    published,
    featured,
    order,
    completedAt,
    seo
  }`;

  return await client.fetch(query);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const query = `*[_type == "project" && slug.current == $slug && published == true][0] {
    _id,
    title,
    slug,
    description,
    shortDescription,
    coverImage,
    gallery,
    technologies[]->{
      _id,
      name,
      slug,
      category,
      description,
      icon,
      color,
      website,
      proficiencyLevel,
      yearsOfExperience,
      featured,
      isActive,
      order
    },
    category,
    status,
    liveUrl,
    githubUrl,
    demoUrl,
    published,
    featured,
    order,
    completedAt,
    content,
    seo
  }`;

  return await client.fetch(query, { slug });
}

export async function getSEOSettings(
  pageId: string,
): Promise<SEOSettings | null> {
  const query = `*[_type == "seoSettings" && pageId == $pageId][0] {
    _id,
    pageId,
    title,
    metaTitle,
    metaDescription,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage,
    canonicalUrl,
    noIndex,
    noFollow,
    structuredData
  }`;

  return await client.fetch(query, { pageId });
}

export async function submitContactMessage(
  message: Omit<ContactMessage, "_id">,
): Promise<ContactMessage> {
  return await client.create({
    _type: "contact",
    ...message,
  });
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const query = `*[_type == "contact"] | order(_createdAt desc) {
    _id,
    name,
    email,
    message
  }`;

  return await client.fetch(query);
}

export async function getExperiences(): Promise<Experience[]> {
  try {
    const query = `*[_type == "experience" && visible == true] | order(order asc, startDate desc) {
      _id,
      jobTitle,
      company,
      companyUrl,
      location,
      employmentType,
      workType,
      startDate,
      endDate,
      currentJob,
      description,
      achievements,
      technologies[]->{
        name
      },
      skills[]->{
        name
      },
      companyLogo,
      featured,
      order,
      visible
    }`;

    const result = await client.fetch(query);
    return result || [];
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
}

export async function getFeaturedExperiences(): Promise<Experience[]> {
  try {
    const query = `*[_type == "experience" && featured == true && visible == true] | order(order asc, startDate desc) {
      _id,
      jobTitle,
      company,
      companyUrl,
      location,
      employmentType,
      workType,
      startDate,
      endDate,
      currentJob,
      description,
      achievements,
      technologies[]->{
        name
      },
      skills[]->{
        name
      },
      companyLogo,
      featured,
      order,
      visible
    }`;

    const result = await client.fetch(query);
    return result || [];
  } catch (error) {
    console.error("Error fetching featured experiences:", error);
    return [];
  }
}

export async function getExperienceById(
  id: string,
): Promise<Experience | null> {
  try {
    const query = `*[_type == "experience" && _id == $id][0] {
      _id,
      jobTitle,
      company,
      companyUrl,
      location,
      employmentType,
      workType,
      startDate,
      endDate,
      currentJob,
      description,
      achievements,
      technologies,
      skills,
      companyLogo,
      featured,
      order,
      visible
    }`;

    const result = await client.fetch(query, { id });
    return result || null;
  } catch (error) {
    console.error("Error fetching experience:", error);
    return null;
  }
}

export async function getHeroSection(): Promise<HeroSection | null> {
  try {
    const query = `*[_type == "heroSection"][0] {
      _id,
      headline,
      subheadline,
      bio,
      primaryCTA,
      secondaryCTA,
      backgroundImage,
      availabilityStatus,
      technologies[]->{
        _id,
        name,
        icon,
        color
      }
    }`;

    const result = await client.fetch(query);
    return result || null;
  } catch (error) {
    console.error("Error fetching hero section:", error);
    return null;
  }
}

export async function getTechnologies(): Promise<Technology[]> {
  try {
    const query = `*[_type == "technology"] | order(order asc, name asc) {
      _id,
      name,
      slug,
      category,
      description,
      icon,
      color,
      website,
      proficiencyLevel,
      yearsOfExperience,
      featured,
      isActive,
      order
    }`;

    const result = await client.fetch(query);
    return result || [];
  } catch (error) {
    console.error("Error fetching technologies:", error);
    return [];
  }
}

export async function getFeaturedTechnologies(): Promise<Technology[]> {
  try {
    const query = `*[_type == "technology" && featured == true && isActive == true] | order(order asc, name asc) {
      _id,
      name,
      slug,
      category,
      description,
      icon,
      color,
      website,
      proficiencyLevel,
      yearsOfExperience,
      featured,
      isActive,
      order
    }`;

    const result = await client.fetch(query);
    return result || [];
  } catch (error) {
    console.error("Error fetching featured technologies:", error);
    return [];
  }
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  try {
    const query = `*[_type == "socialLink" && isPublic == true] | order(order asc, platform asc) {
      _id,
      platform,
      customPlatformName,
      url,
      username,
      label,
      icon,
      color,
      isPublic,
      isPrimary,
      openInNewTab,
      showInHeader,
      showInFooter,
      showInHero,
      showInContact,
      order,
      description
    }`;

    const result = await client.fetch(query);
    return result || [];
  } catch (error) {
    console.error("Error fetching social links:", error);
    return [];
  }
}

export async function getHeaderSocialLinks(): Promise<SocialLink[]> {
  try {
    const query = `*[_type == "socialLink" && isPublic == true && showInHeader == true] | order(order asc, platform asc) {
      _id,
      platform,
      customPlatformName,
      url,
      username,
      label,
      icon,
      color,
      isPublic,
      isPrimary,
      openInNewTab,
      showInHeader,
      showInFooter,
      showInHero,
      showInContact,
      order,
      description
    }`;

    const result = await client.fetch(query);
    return result || [];
  } catch (error) {
    console.error("Error fetching header social links:", error);
    return [];
  }
}

export async function getFooterSocialLinks(): Promise<SocialLink[]> {
  try {
    const query = `*[_type == "socialLink" && isPublic == true && showInFooter == true] | order(order asc, platform asc) {
      _id,
      platform,
      customPlatformName,
      url,
      username,
      label,
      icon,
      color,
      isPublic,
      isPrimary,
      openInNewTab,
      showInHeader,
      showInFooter,
      showInHero,
      showInContact,
      order,
      description
    }`;

    const result = await client.fetch(query);
    return result || [];
  } catch (error) {
    console.error("Error fetching footer social links:", error);
    return [];
  }
}

export async function getPrimaryContactLinks(): Promise<SocialLink[]> {
  try {
    const query = `*[_type == "socialLink" && isPublic == true && isPrimary == true] | order(order asc, platform asc) {
      _id,
      platform,
      customPlatformName,
      url,
      username,
      label,
      icon,
      color,
      isPublic,
      isPrimary,
      openInNewTab,
      showInHeader,
      showInFooter,
      showInHero,
      showInContact,
      order,
      description
    }`;

    const result = await client.fetch(query);
    return result || [];
  } catch (error) {
    console.error("Error fetching primary contact links:", error);
    return [];
  }
}
