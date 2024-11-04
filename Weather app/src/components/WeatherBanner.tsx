import { useAppSelector } from "@/app/hooks";
import { selectWeatherState } from "@/features/weatherSlice";
import useWeather from "@/hooks/useWeather";
import { todaysDateFormat } from "@/helpers/date";

const WeatherBanner = () => {
  const { weather } = useWeather();
  const { isCelsius, status } = useAppSelector(selectWeatherState);

  return (
    <>
      {/* Date, Location, Temp */}
      <div className="flex items-end py-7">
        <div className="flex-1">
          <div className="text-[var(--gray-900-060)]">{todaysDateFormat()}</div>
          <div className="h-[calc(theme(spacing.14)-4px)] heading-lg">
            {!status.loading ? (
              weather.location
            ) : (
              <div className="h-full w-4/5 bg-gray-200 animate-pulse"></div>
            )}
          </div>
          <h1 className="heading-xl">
            {weather.temp || 0}&nbsp;{isCelsius ? "°C" : "°F"}
          </h1>
        </div>
        {!status.loading ? (
          <img
            src={weather.icon}
            draggable={false}
            alt="current weather illustration"
          />
        ) : (
          <div className="size-32 bg-gray-200 animate-pulse"></div>
        )}
      </div>
    </>
  );
};

export default WeatherBanner;
