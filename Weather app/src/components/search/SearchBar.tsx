import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  searchLocations,
  selectWeatherState,
  setSearchQuery,
  setSearchStatus,
} from "@/features/weatherSlice";
import WeatherSearchResults from "./WeatherSearchResults";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const { recentSearches, searchQuery } = useAppSelector(selectWeatherState);

  const handleSearchPlaces = async (query: string) => {
    if (!searchQuery) {
      recentSearches.length === 0
        ? dispatch(setSearchStatus("no-recent"))
        : dispatch(setSearchStatus("recent"));
      return;
    } else {
      dispatch(setSearchStatus("not-found"));
    }

    try {
      dispatch(searchLocations(query));
    } catch (error) {
      dispatch(setSearchStatus("not-found"));
      console.error(error);
    }
  };

  useEffect(() => {
    handleSearchPlaces(searchQuery);
  }, [searchQuery]);

  return (
    <div className="flex-1">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          placeholder="Search for places"
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="peer w-full py-1.5 ps-5 bg-indigo-50 outline-none rounded-lg focus:ring-2 focus:ring-indigo-400"
        />

        <div className="peer-focus:block focus:block hover:block hidden absolute w-full bg-indigo-50 top-12 rounded-lg shadow shadow-black/20">
          <div className="py-2">
            <WeatherSearchResults />
          </div>
        </div>
      </div>
    </div>
  );
}
