import { useAppSelector } from "@/app/hooks";
import useWeather from "@/hooks/useWeather";
import { selectWeatherState } from "@/features/weatherSlice";
import WeatherCardDetail from "@/components/WeatherCardDetail";
import CardHeading from "@/components/typography/CardHeading";

const WeatherDetails = () => {
  const { weatherCardDetails } = useWeather();
  const { status } = useAppSelector(selectWeatherState);
  return (
    <div className="flex flex-col w-full h-auto lg:h-[308px] px-5 py-4 bg-indigo-50 rounded-2xl">
      <CardHeading>Weather Details</CardHeading>
      <div className="grid grid-cols-2 lg:grid-cols-3 flex-1 grid-rows-2 mt-5 gap-5">
        {!status.loading
          ? weatherCardDetails.map((card) => (
              <WeatherCardDetail key={card.label} card={card} />
            ))
          : Array(6)
              .fill(null)
              .map(() => (
                <div className="bg-white px-4 py-5 rounded-2xl animate-pulse">
                  <div className="flex items-center justify-between h-full">
                    <div className="flex flex-col gap-4 w-28">
                      <div className="h-5 bg-gray-200"></div>
                      <div className="h-8 bg-gray-200"></div>
                    </div>
                    <div className="size-10 bg-gray-200"></div>
                  </div>
                </div>
              ))}
      </div>
    </div>
  );
};

export default WeatherDetails;
