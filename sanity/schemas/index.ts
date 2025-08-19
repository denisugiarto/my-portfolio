import {blogPost} from './blogPost'
import {project} from './project'
import {contact} from './contact'
import {seoSettings} from './seoSettings'
import {experience} from './experience'
import {technology} from './technology'
import {socialLink} from './socialLink'
import {blockContent} from './blockContent'
import {heroSection} from './heroSection'
import {aboutSection} from './aboutSection'
import {skillsSection} from './skillsSection'
import {resumeSection} from './resumeSection'
import {siteSettings} from './siteSettings'

export const schemaTypes = [
  // Site Configuration
  siteSettings,
  seoSettings,
  
  // Content Sections
  heroSection,
  aboutSection,
  skillsSection,
  resumeSection,
  
  // Content Types
  blogPost,
  project,
  experience,
  technology,
  socialLink,
  contact,
  
  // Utility Types
  blockContent,
]