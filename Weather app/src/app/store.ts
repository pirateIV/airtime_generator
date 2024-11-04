import { configureStore } from "@reduxjs/toolkit";

import WeatherReducer from "@/features/weatherSlice";

const store = configureStore({
  reducer: {
    weather: WeatherReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export default store;
