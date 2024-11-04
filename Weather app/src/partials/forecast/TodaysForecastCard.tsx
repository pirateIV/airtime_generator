import { useAppSelector } from "@/app/hooks";
import { selectWeatherState } from "@/features/weatherSlice";
import { WeatherForecastHour } from "@/types/weather";
import { formatTime } from "@/helpers/date";

const TodaysForecastCard = ({ hour }: { hour: WeatherForecastHour }) => {
  const { isCelsius } = useAppSelector(selectWeatherState);
  return (
    <div className="flex flex-col items-center justify-between w-[95px] h-[108px] flex-shrink-0 bg-white py-2.5 rounded-2xl text-sm">
      <div className="font-medium text-gray-500">{formatTime(hour.time)}</div>
      <img
        width="40"
        height="40"
        draggable={false}
        src={hour.condition.icon}
        alt="hour condition icon"
      />
      <div className="font-extrabold text-gray-900">
        {isCelsius ? hour.temp_c : hour.temp_f}&nbsp;&deg;
        {isCelsius ? "C" : "F"}
      </div>
    </div>
  );
};

export default TodaysForecastCard;
