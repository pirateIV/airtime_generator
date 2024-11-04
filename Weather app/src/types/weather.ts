import { ReactElement } from "react";

export type WeatherSearchStatus =
  | "found"
  | "not-found"
  | "recent"
  | "no-recent";

export type WeatherQueryType = "current" | "forecast" | "search";

export type WeatherSearchParams = {
  q: string; // City name, state and country divided by comma, use ISO 3166 country codes
  aqi: "yes" | "no"; // Enable/Disable Air Quality data in forecast API output
  days?: number; // Number of days of weather forecast. Ranges from 1 - 14
};

export interface WeatherCard {
  card: {
    label: string;
    value: string | number | undefined;
    icon: ReactElement<any>;
  };
}

export interface WeatherLocation {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface WeatherState {
  status: {
    loading: boolean;
    error: string;
  };
  currentLocation: string;
  forecast: [];
  isCelsius: boolean;
  locations: WeatherLocation[];
  recentSearches: Weather[];
  searchQuery: string;
  searchStatus: WeatherSearchStatus;
  weatherData: Weather | null;
}

export interface WeatherForecastHour {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: "SSW";
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  snow_cm: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
}

export interface WeatherForecastDay {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    totalsnow_cm: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    condition: WeatherCondition;
    uv: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: number;
    is_moon_up: number;
    is_sun_up: number;
  };
  hour: WeatherForecastHour[];
}

export interface Weather {
  current: {
    temp_c: number;
    temp_f: number;
    condition: WeatherCondition;
    wind_kph: number;
    wind_mph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  forecast: {
    forecastday: WeatherForecastDay[];
  };
}
