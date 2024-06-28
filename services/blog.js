const fetchArticles = async (username) => {
  const response = await fetch(
    `https://dev.to/api/articles?username=${username}`,
  );
  const data = await response.json();
  return data;
};

const useDevToArticles = (username) => {
  const { data, error } = useSWR(username, fetchArticles);

  return {
    articles: data,
    isLoading: !error && !data,
    isError: error,
  };
};
