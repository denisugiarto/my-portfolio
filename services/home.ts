import axios from "axios";

export async function getRepoStars() {
  try {
    const repoStars = await axios({
      method: "get",
      url: "https://api.github.com/repos/denisugiarto/my-portfolio",
    });
    return repoStars.data.stargazers_count;
  } catch (error) {
    console.error(error);
  }
}
