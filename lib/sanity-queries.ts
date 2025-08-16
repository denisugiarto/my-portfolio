import {client, BlogPost, Project, SEOSettings, ContactMessage, Experience} from './sanity'

export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  try {
    const query = `*[_type == "blogPost"] | order(publishedAt desc) ${limit ? `[0...${limit}]` : ''} {
      _id,
      title,
      slug,
      excerpt,
      coverImage,
      tags,
      publishedAt,
      readTime,
      featured,
      seo
    }`
    
    const result = await client.fetch(query)
    return result || []
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "blogPost" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    tags,
    publishedAt,
    readTime,
    featured,
    seo
  }`
  
  return await client.fetch(query)
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const query = `*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      coverImage,
      content,
      tags,
      publishedAt,
      readTime,
      featured,
      seo
    }`
    
    const result = await client.fetch(query, {slug})
    return result || null
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function getProjects(limit?: number): Promise<Project[]> {
  const query = `*[_type == "project"] | order(order asc, completedAt desc) ${limit ? `[0...${limit}]` : ''} {
    _id,
    title,
    slug,
    description,
    shortDescription,
    coverImage,
    gallery,
    technologies,
    category,
    status,
    liveUrl,
    githubUrl,
    demoUrl,
    featured,
    order,
    completedAt,
    seo
  }`
  
  return await client.fetch(query)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const query = `*[_type == "project" && featured == true] | order(order asc, completedAt desc) {
    _id,
    title,
    slug,
    description,
    shortDescription,
    coverImage,
    gallery,
    technologies,
    category,
    status,
    liveUrl,
    githubUrl,
    demoUrl,
    featured,
    order,
    completedAt,
    seo
  }`
  
  return await client.fetch(query)
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    shortDescription,
    coverImage,
    gallery,
    technologies,
    category,
    status,
    liveUrl,
    githubUrl,
    demoUrl,
    featured,
    order,
    completedAt,
    content,
    seo
  }`
  
  return await client.fetch(query, {slug})
}

export async function getSEOSettings(pageId: string): Promise<SEOSettings | null> {
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
  }`
  
  return await client.fetch(query, {pageId})
}

export async function submitContactMessage(message: Omit<ContactMessage, '_id'>): Promise<ContactMessage> {
  return await client.create({
    _type: 'contact',
    ...message,
  })
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const query = `*[_type == "contact"] | order(submittedAt desc) {
    _id,
    name,
    email,
    subject,
    message,
    phone,
    company,
    projectType,
    budget,
    timeline,
    status,
    priority,
    notes,
    submittedAt,
    ipAddress,
    userAgent
  }`
  
  return await client.fetch(query)
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
      technologies,
      skills,
      companyLogo,
      featured,
      order,
      visible
    }`
    
    const result = await client.fetch(query)
    return result || []
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return []
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
      technologies,
      skills,
      companyLogo,
      featured,
      order,
      visible
    }`
    
    const result = await client.fetch(query)
    return result || []
  } catch (error) {
    console.error('Error fetching featured experiences:', error)
    return []
  }
}

export async function getExperienceById(id: string): Promise<Experience | null> {
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
    }`
    
    const result = await client.fetch(query, {id})
    return result || null
  } catch (error) {
    console.error('Error fetching experience:', error)
    return null
  }
}