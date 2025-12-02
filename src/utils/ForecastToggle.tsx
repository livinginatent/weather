"use client";
import { Button } from "@/components/ui/button";
import useWeatherStore from "@/store/store";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {};

const ForecastToggle = (props: Props) => {
  const { showHourlyForecast, setShowHourlyForecast } = useWeatherStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (showHourly: boolean) => {
    setShowHourlyForecast(showHourly);
    // Update URL to preserve view state
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const view = showHourly ? "hourly" : "weekly";
    
    if (lat && lon) {
      router.push(`/?lat=${lat}&lon=${lon}&view=${view}`);
    } else {
      router.push(`/?view=${view}`);
    }
  };
  return (
    <div className="flex w-full gap-2 ml-2 self-start">
      <Button
        onClick={() => handleClick(true)}
        className={`w-full ${
          showHourlyForecast
            ? "bg-white hover:bg-[#EAEEF5] text-black"
            : "bg-[#EAEEF5] hover:bg-[#EAEEF5] text-black"
        }`}
      >
        Günlük
      </Button>
      <Button
        className={` w-full ${
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
