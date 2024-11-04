import { useAppSelector } from "@/app/hooks";
import { selectWeatherState } from "@/features/weatherSlice";

import {
  DropIcon,
  SunIcon,
  SunriseIcon,
  SunsetIcon,
  TempIcon,
  WindIcon,
} from "@/components/icons";
import { getTodayForecastByDate } from "@/helpers/date";

export default function useWeather() {
  const { isCelsius, weatherData } = useAppSelector(selectWeatherState);

  const weather = {
    location: weatherData?.location.name,
    icon: weatherData?.current.condition.icon.replace("64x64", "128x128"),
    temp: isCelsius ? weatherData?.current.temp_c : weatherData?.current.temp_f,
  };
  console.log(getTodayForecastByDate(weatherData))
  console.log(weatherData)

  const weatherCardDetails: {
    label: string;
    value: string | number | undefined;
    icon: React.ReactElement;
  }[] = [
    {
    label: "Sunrise",
      value: getTodayForecastByDate(weatherData)?.astro.sunrise,
      icon: <SunriseIcon />,
    },
    {
      label: "Sunset",
      value: getTodayForecastByDate(weatherData)?.astro.sunset,
      icon: <SunsetIcon />,
    },
    {
      label: "Chance of rain",
      value: getTodayForecastByDate(weatherData)?.day.daily_chance_of_rain + "%",
      icon: <DropIcon />,
    },
    {
      label: "Wind",
      value: (weatherData?.current.wind_kph || 0) + " km/h",
      icon: <WindIcon />,
    },
    {
      label: "UV index",
      value: (weatherData?.current.uv || 0) + " of 10",
      icon: <SunIcon />,
    },
    {
      label: "Feels like",
      value: isCelsius
        ? (weatherData?.current.feelslike_c || 0) + " °C"
        : (weatherData?.current.feelslike_f || 0) + " °F",
      icon: <TempIcon />,
    },
  ];
  return { weather, weatherCardDetails };
}
