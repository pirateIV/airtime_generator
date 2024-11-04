import { Weather } from "@/types/weather";

export const nth = (d: number) => {
  if (d > 3 && d < 21) return d + "th";
  switch (d % 10) {
    case 1:
      return d + "st";
    case 2:
      return d + "nd";
    case 3:
      return d + "rd";
    default:
      return d + "th";
  }
};

export const getRecentSearchesFromStorage = (): Weather[] => {
  const recentData = localStorage.getItem("recentSearches");
  return recentData ? JSON.parse(recentData) : [];
};
