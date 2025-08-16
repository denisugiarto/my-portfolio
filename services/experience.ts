import { Experience } from "@/lib/sanity";
import { getExperiences, getFeaturedExperiences, getExperienceById } from "@/lib/sanity-queries";

export const fetchExperiences = async (): Promise<Experience[]> => {
  try {
    return await getExperiences();
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Error fetching experiences");
  }
};

export const fetchFeaturedExperiences = async (): Promise<Experience[]> => {
  try {
    return await getFeaturedExperiences();
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Error fetching featured experiences");
  }
};

export const fetchExperienceById = async (id: string): Promise<Experience | null> => {
  try {
    return await getExperienceById(id);
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Error fetching experience");
  }
};

// Utility function to format date ranges
export const formatDateRange = (startDate: string, endDate?: string, currentJob?: boolean): string => {
  const start = new Date(startDate);
  const startFormatted = start.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short' 
  });

  if (currentJob) {
    return `${startFormatted} - Present`;
  }

  if (endDate) {
    const end = new Date(endDate);
    const endFormatted = end.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
    return `${startFormatted} - ${endFormatted}`;
  }

  return startFormatted;
};

// Utility function to calculate duration
export const calculateDuration = (startDate: string, endDate?: string, currentJob?: boolean): string => {
  const start = new Date(startDate);
  const end = currentJob || !endDate ? new Date() : new Date(endDate);
  
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44)); // Average days per month
  
  if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths !== 1 ? 's' : ''}`;
  }
  
  const years = Math.floor(diffMonths / 12);
  const months = diffMonths % 12;
  
  if (months === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  }
  
  return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
};