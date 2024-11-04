import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  initWeather,
  removeRecentLocations,
  selectWeatherState,
  updateRecentSearches,
} from "@/features/weatherSlice";

const WeatherSearchResults = () => {
  const dispatch = useAppDispatch();
  const { locations, recentSearches, searchStatus } =
    useAppSelector(selectWeatherState);

  const handleWeatherChange = (query: string) => {
    dispatch(initWeather({ location: query }));
    dispatch(updateRecentSearches(undefined));
  };

  switch (searchStatus) {
    case "found":
      return (
        <ul>
          {locations.map((location) => (
            <li key={location.id}>
              <button
                onClick={() => handleWeatherChange(location.name)}
                className="block w-full py-1.5 ps-5 text-start outline-none hover:bg-indigo-400 hover:text-white focus:bg-indigo-400 focus:text-white"
              >
                {location.name}
              </button>
            </li>
          ))}
        </ul>
      );
    case "not-found":
      return <p className="ps-5">No results found</p>;
    case "recent":
      return (
        <div className="pt-1.5">
          <div className="flex items-center mx-5">
            <h1 className="flex-1 text-gray-900 mb-3 font-semibold">Recent</h1>
            <button
              onClick={() => dispatch(removeRecentLocations(undefined))}
              className="text-indigo-400 text-sm font-semibold hover:underline"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-2">
            {recentSearches?.map((recent, i) => (
              <button
                key={i}
                onClick={() => handleWeatherChange(recent.location.name)}
                className="group w-full flex items-center gap-x-2 ps-4 text-start hover:bg-indigo-400"
              >
                <div className="flex items-center gap-x-1">
                  <img
                    width="45"
                    src={recent?.current?.condition?.icon}
                    alt="weather condition icon"
                  />
                  <span className="w-16 font-extrabold text-sm group-hover:text-white group-focus:text-white">
                    {recent.current.temp_c}&nbsp;&deg;C
                  </span>
                </div>
                <div>
                  <div className="text-base font-semibold mt-1 group-hover:text-white group-focus:text-white">
                    {recent?.location.name}
                  </div>
                  <p className="text-sm text-gray-600  group-hover:text-indigo-50 group-focus:text-indigo-50">
                    {recent?.location.region}, {recent?.location.country}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    default:
      return (
        <div className="ps-5">
          <h1 className="text-gray-900 mb-3 pt-1.5 font-semibold">Recent</h1>
          <p className="text-sm">You have no recent search locations</p>
        </div>
      );
  }
};

export default WeatherSearchResults;
