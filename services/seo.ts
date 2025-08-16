import { SEOSettings } from "@/lib/sanity";
import { getSEOSettings } from "@/lib/sanity-queries";

export const fetchSEOSettings = async (pageId: string): Promise<SEOSettings | null> => {
  try {
    return await getSEOSettings(pageId);
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Error fetching SEO settings");
  }
};

export const generateStructuredData = (
  type: 'Person' | 'Organization' | 'WebSite' | 'BlogPosting' | 'CreativeWork',
  data: any
): string => {
  const baseStructure = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };

  return JSON.stringify(baseStructure);
};

export const generatePersonStructuredData = (name: string, url: string, jobTitle: string, description: string) => {
  return generateStructuredData('Person', {
    name,
    url,
    jobTitle,
    description,
    sameAs: [
      // Add social media URLs here
    ]
  });
};

export const generateWebSiteStructuredData = (name: string, url: string, description: string) => {
  return generateStructuredData('WebSite', {
    name,
    url,
    description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  });
};

export const generateBlogPostStructuredData = (
  title: string,
  description: string,
  url: string,
  publishedDate: string,
  modifiedDate: string,
  authorName: string,
  imageUrl?: string
) => {
  return generateStructuredData('BlogPosting', {
    headline: title,
    description,
    url,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: {
      "@type": "Person",
      name: authorName
    },
    ...(imageUrl && {
      image: {
        "@type": "ImageObject",
        url: imageUrl
      }
    })
  });
};