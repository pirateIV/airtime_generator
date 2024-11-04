import { nth } from "@/helpers";
import { Weather } from "@/types/weather";

export const formatTime = (hour: string) => {
  return new Date(hour).toLocaleTimeString("en-US", { timeStyle: "short" });
};

export const dateAndMonthFormat = (d: string) => {
  const date = nth(new Date(d).getDate());
  const month = new Date(d).toLocaleDateString("en-US", {
    month: "long",
  });

  return `${date} ${month}`;
};

export const weekdayDateFormat = (d: string) => {
  return new Date(d).toLocaleDateString("en-US", { weekday: "long" });
};

export const todaysDateFormat = () => {
  return new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getTodayForecastByDate = (weather: Weather | null) => {
  const today = new Date();

  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const localDate = `${year}-${month}-${day}`;

  return weather?.forecast.forecastday.find((day) => day.date === localDate);
};
