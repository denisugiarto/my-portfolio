import { Project } from "@/lib/sanity";
import {
  getProjects,
  getFeaturedProjects,
  getProjectBySlug,
} from "@/lib/sanity-queries";

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    return await getProjects();
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    throw new Error(error.message || "Error fetching projects");
  }
};

export const fetchFeaturedProjects = async (): Promise<Project[]> => {
  try {
    return await getFeaturedProjects();
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Error fetching featured projects");
  }
};

export const fetchProjectBySlug = async (
  slug: string,
): Promise<Project | null> => {
  try {
    return await getProjectBySlug(slug);
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Error fetching project");
  }
};
