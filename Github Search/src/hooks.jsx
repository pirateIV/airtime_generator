import { BASE_URL } from "./services/ghService";

export const TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN;

export const useFetch = async (path, params = {}) => {
  const searchParams = new URLSearchParams(params);

  const res = await fetch(`${BASE_URL}/${path}?` + searchParams, {
    headers: {
      Authorization: `token ${TOKEN}`,
    },
  });
  return await res.json();
};
