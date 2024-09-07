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
            ? "bg-white hover:bg-[#EAEEF5] text-black"
            : "bg-[#EAEEF5] hover:bg-[#EAEEF5] text-black"
        }`}
      >
        Günlük
      </Button>
      <Button
        className={`${
          !showHourlyForecast
            ? "bg-white hover:bg-[#EAEEF5] text-black"
            : "bg-[#EAEEF5] hover:bg-[#EAEEF5] text-black"
        }`}
        onClick={() => handleClick(false)}
      >
        Həftəlik
      </Button>
    </div>
  );
};

export default ForecastToggle;
