import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { initWeather, selectWeatherState } from "@/features/weatherSlice";

import Header from "@/partials/Header";
import TodaysForecast from "@/partials/forecast/TodaysForecast";
import WeatherDetails from "@/partials/WeatherDetails";
import SevenDayForecast from "@/partials/forecast/SevenDayForecast";
import WeatherBanner from "@/components/WeatherBanner";

const App = () => {
  const dispatch = useAppDispatch();
  const { weatherData } = useAppSelector(selectWeatherState);

  useEffect(() => {
    dispatch(initWeather({ location: "Ibadan" }));
  }, []);

  return (
    <div className="max-w-screen mx-auto px-8 md:px-24 lg:px-[calc(theme(spacing.28)-8px)]">
      <Header />

      <main className="grid grid-cols-12 w-full items-start gap-x-7">
        <div className="col-span-8">
          <WeatherBanner />

          <section className="space-y-6">
            <TodaysForecast
              hourlyForecast={weatherData?.forecast.forecastday[0].hour}
            />
            <WeatherDetails />
          </section>
        </div>
        <div className="col-span-4 mt-5 ">
          <SevenDayForecast forecast={weatherData?.forecast.forecastday} />
        </div>
      </main>
    </div>
  );
};

export default App;
