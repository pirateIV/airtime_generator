const baseURL = "http://api.github.com/users"

export const getUser = async (user) => {
  const res = await fetch(`${baseURL}/${user}`);
  return await res.json();
};

export const getUserFollowers = async (user) => {
  const res = await fetch(`${baseURL}/${user}/followers`);
  return await res.json();
};

export const getRepositories = async (user) => {
  const res = await fetch(`${baseURL}/${user}/repos`);
  return await res.json();
};