import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/app/store";
import {
  Weather,
  WeatherLocation,
  WeatherSearchStatus,
  WeatherState,
} from "@/types/weather";
import { fetchWeatherData } from "@/services/weatherService";
import { getRecentSearchesFromStorage } from "@/helpers";

const MAX_RECENT_ITEMS = 2;

interface WeatherParams {
  location?: string;
}

const initialState: WeatherState = {
  status: {
    loading: false,
    error: "",
  },
  isCelsius: true,
  forecast: [],
  currentLocation: "Ibadan",
  locations: [],
  recentSearches: getRecentSearchesFromStorage(),
  searchQuery: "",
  searchStatus: "no-recent",
  weatherData: null,
};

export const initWeather = createAsyncThunk<Weather, WeatherParams>(
  "weather/initWeather",
  async ({ location }, { getState }) => {
    const state = getState() as WeatherState;
    const response = await fetchWeatherData(
      location || state.currentLocation,
      "forecast"
    );
    return await response?.json();
  }
);

export const searchLocations = createAsyncThunk<WeatherLocation[], string>(
  "weather/searchPlaces",
  async (query: string) => {
    const response = await fetchWeatherData(query, "search");
    return await response?.json();
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchStatus: (state, action: PayloadAction<WeatherSearchStatus>) => {
      state.searchStatus = action.payload;
    },
    setIsCelsius: (state, action: PayloadAction<boolean>) => {
      state.isCelsius = action.payload;
    },
    removeRecentLocations: (state, _) => {
      state.recentSearches = [];
      state.searchStatus = "no-recent";
      localStorage.removeItem("recentSearches");
    },
    updateRecentSearches: (state, _) => {
      if (!state.weatherData) return;

      if (state.recentSearches.length >= MAX_RECENT_ITEMS) {
        state.recentSearches.shift();
      }

      state.recentSearches.unshift(state.weatherData);
      localStorage.setItem(
        "recentSearches",
        JSON.stringify(state.recentSearches)
      );
      state.searchStatus = "recent";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initWeather.pending, (state, _) => {
        state.status.loading = true;
      })
      .addCase(
        initWeather.fulfilled,
        (state, action: PayloadAction<Weather>) => {
          return {
            ...state,
            weatherData: action.payload,
            status: {
              ...state.status,
              loading: false,
            },
          };
        }
      )
      .addCase(
        searchLocations.fulfilled,
        (state, action: PayloadAction<WeatherLocation[]>) => {
          return {
            ...state,
            locations: action.payload,
            searchStatus: action.payload.length === 0 ? "not-found" : "found",
          };
        }
      );
  },
});

export const {
  removeRecentLocations,
  setIsCelsius,
  setSearchStatus,
  setSearchQuery,
  updateRecentSearches,
} = weatherSlice.actions;

export const selectWeatherState = (state: RootState) => state.weather;

export default weatherSlice.reducer;
