import { useAppSelector } from "@/app/hooks";
import { selectWeatherState } from "@/features/weatherSlice";
import { WeatherForecastDay } from "@/types/weather";
import { dateAndMonthFormat, weekdayDateFormat } from "@/helpers/date";
import CardHeading from "@/components/typography/CardHeading";

const SevenDayForecast = ({
  forecast,
}: {
  forecast: WeatherForecastDay[] | undefined;
}) => {
  const { isCelsius } = useAppSelector(selectWeatherState);
  return (
    <div className="bg-indigo-50 p-5 h-full rounded-2xl w-full">
      <CardHeading>{forecast?.length} days forecast</CardHeading>
      
      <div className="mt-4 divide-y divide-gray-400">
        {forecast?.map((day) => (
          <div key={day.date} className="grid grid-cols-9 py-4 text-sm">
            <div className="col-span-3 space-y-1">
              <div className="text-gray-500">
                {dateAndMonthFormat(day.date)}
              </div>
              <div className="font-semibold">{weekdayDateFormat(day.date)}</div>
            </div>
            <div className="flex items-center col-span-4">
              <img width="40" height="40" src={day.day.condition.icon} alt="" />
              <span className="text-gray-500">{day.day.condition.text}</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-600 font-medium">
                {isCelsius
                  ? `${day.day.maxtemp_c}°/${day.day.mintemp_c}°`
                  : `${day.day.maxtemp_f}°/${day.day.mintemp_f}°`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SevenDayForecast;
