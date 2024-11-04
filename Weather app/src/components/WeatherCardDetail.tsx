import { WeatherCard } from "@/types/weather";

const WeatherCardDetail = ({ card }: WeatherCard) => {
  return (
    <div className="bg-gray-100 px-4 py-5 rounded-2xl">
      <div className="flex items-center justify-between h-full">
        <div className="flex flex-col justify-between h-full">
          <h1 className="text-sm font-medium text-gray-600">{card.label}</h1>
          <p className="text-lg xl:text-2xl font-medium">{card.value}</p>
        </div>
        <span>{card.icon}</span>
      </div>
    </div>
  );
};

export default WeatherCardDetail;
