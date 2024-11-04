import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectWeatherState, setIsCelsius } from "@/features/weatherSlice";
import TempButtonSwitcher from "./TempButtonSwitcher";

const TempSwitcher = () => {
  const dispatch = useAppDispatch();
  const { isCelsius } = useAppSelector(selectWeatherState);

  return (
    <div className="relative w-16 h-8 bg-gray-100 shadow-sm shadow-black/30 rounded-full ">
      <input
        type="checkbox"
        name="switcher"
        checked={isCelsius}
        onChange={() => dispatch(setIsCelsius(!isCelsius))}
        className="group absolute inset-0 z-30 opacity-0"
      />
      <label
        htmlFor="switcher"
        className="relative flex items-center justify-around h-full isolate font-semibold"
      >
        <TempButtonSwitcher />
      </label>
    </div>
  );
};

export default TempSwitcher;
