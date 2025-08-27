import axios from 'axios';
import { unstable_cache } from 'next/cache';

async function fetchGitHubStars(): Promise<number> {
  try {
    const response = await axios({
      method: 'get',
      url: 'https://api.github.com/repos/denisugiarto/my-portfolio',
      timeout: 8000,
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'my-portfolio-website',
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        }),
      },
    });

    return response.data.stargazers_count || 0;
  } catch (error) {
    console.error('Failed to fetch GitHub stars:', error);
    return 0;
  }
}

// Cache the GitHub stars for 10 minutes
export const getGitHubStars = unstable_cache(
  fetchGitHubStars,
  ['github-stars'],
  {
    revalidate: 600, // 10 minutes
    tags: ['github-stars'],
  }
);