import axios from "axios";

const CACHE_KEY = 'github_stars_cache';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

interface CacheData {
  stars: number;
  timestamp: number;
}

interface GitHubStarsResponse {
  stars: number;
  cached?: boolean;
  stale?: boolean;
  error?: string;
}

export async function getRepoStars(): Promise<number> {
  try {
    // Check localStorage cache first (client-side only)
    if (typeof window !== 'undefined') {
      const cachedData = localStorage.getItem(CACHE_KEY);
      
      if (cachedData) {
        const parsed: CacheData = JSON.parse(cachedData);
        const now = Date.now();
        
        // Return cached data if it's still fresh
        if (now - parsed.timestamp < CACHE_DURATION) {
          return parsed.stars;
        }
      }
    }

    // Fetch from our API route (which has server-side caching)
    const response = await axios.get<GitHubStarsResponse>('/api/github-stars', {
      timeout: 8000,
    });

    const starCount = response.data.stars;

    // Update localStorage cache
    if (typeof window !== 'undefined') {
      const cacheData: CacheData = {
        stars: starCount,
        timestamp: Date.now(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    }

    return starCount;
  } catch (error) {
    console.error('Failed to fetch GitHub stars:', error);
    
    // Fallback to localStorage cache if available, even if stale
    if (typeof window !== 'undefined') {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const parsed: CacheData = JSON.parse(cachedData);
        return parsed.stars;
      }
    }
    
    // Ultimate fallback - return a reasonable default
    return 0;
  }
}
