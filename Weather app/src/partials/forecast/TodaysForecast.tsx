import { useAppSelector } from "@/app/hooks";
import { WeatherForecastHour } from "@/types/weather";
import { selectWeatherState } from "@/features/weatherSlice";

import CardHeading from "@/components/typography/CardHeading";
import TodaysForecastCard from "./TodaysForecastCard";
import ForecastFallback from "./ForecastFallback";

const TodaysForecast = ({
  hourlyForecast,
}: {
  hourlyForecast: WeatherForecastHour[] | undefined;
}) => {
  const { status } = useAppSelector(selectWeatherState);
  return (
    <div className="flex flex-col w-full h-[190px] px-5 py-4 bg-indigo-50 rounded-2xl">
      <CardHeading>Today's Forecast</CardHeading>
      <div className="flex-1 mt-3">
        <div
          className="flex items-center h-full gap-x-3 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {!status.loading ? (
            hourlyForecast?.map((hour) => (
              <TodaysForecastCard key={hour.time} hour={hour} />
            ))
          ) : (
            <ForecastFallback />
          )}
        </div>
      </div>
    </div>
  );
};
export default TodaysForecast;
