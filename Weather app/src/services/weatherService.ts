import config from "@/api/config";
import { WeatherQueryType } from "@/types/weather";

export const fetchWeatherData = async (
  query: string,
  queryType: WeatherQueryType,
  params = {}
) => {
  const searchParams = new URLSearchParams({
    key: config.API_KEY,
    q: query,
    aqi: "no",
    days: "7",
    ...params,
  });

  const weatherURL = `${config.API_BASE_URL}/${queryType}.json?${searchParams}`;

  try {
    const response = await fetch(weatherURL);
    return response;
  } catch (error) {
    console.error(error);
  }
};
