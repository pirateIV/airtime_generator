import { useFetch } from "../hooks";

export const BASE_URL = "https://api.github.com/users";

export const getUser = async (user) => {
  return await useFetch(user);
};

export const getRepositories = async (user) => {
  return await useFetch(`${user}/repos`, {
    page: 1,
    per_page: 20,
    sort: "updated",
  });
};

export const getFollowers = async (user) => {
  return await useFetch(`${user}/followers`)
}

export const getFollowing = async (user) => {
  return await useFetch(`${user}/following`)
}