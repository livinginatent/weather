import { Button } from "@/components/ui/button";
import useWeatherStore from "@/store/store";
import React from "react";

type Props = {};

const ForecastToggle = (props: Props) => {
  const { showHourlyForecast, setShowHourlyForecast } = useWeatherStore();

  const handleClick = (showHourly: boolean) => {
    setShowHourlyForecast(showHourly);
  };
  return (
    <div className="flex gap-2 ml-2 self-start">
      <Button
        onClick={() => handleClick(true)}
        className={`${
          showHourlyForecast
            ? "bg-zinc-800 hover:bg-zinc-400 text-white"
            : "bg-gray-300 hover:bg-zinc-400  text-black"
        }`}
      >
        Günlük
      </Button>
      <Button
        className={`${
          !showHourlyForecast
            ? "bg-zinc-800 hover:bg-zinc-400 text-white"
            : "bg-gray-300 hover:bg-zinc-400 text-black"
        }`}
        onClick={() => handleClick(false)}
      >
        Həftəlik
      </Button>
    </div>
  );
};

export default ForecastToggle;
