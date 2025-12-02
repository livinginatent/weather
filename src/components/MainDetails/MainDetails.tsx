"use client";
import React, { useEffect } from "react";
import HourlyForecast from "./HourlyForecast/HourlyForecast";
import { HourlyWeatherDataT } from "@/lib/types";
import SecondaryDetails from "./SecondaryDetails/SecondaryDetails";
import useWeatherStore from "@/store/store";
import WeeklyForecast from "./WeeklyForecast/WeeklyForecast";
import { cities } from "@/lib/locationNames";
import WeatherContent from "../WeatherContent/WeatherContent";
import { useSearchParams } from "next/navigation";

type MainDetailsProps = {
  hourlyWeatherData: HourlyWeatherDataT | null;
};

const MainDetails = ({ hourlyWeatherData }: MainDetailsProps) => {
  const { showHourlyForecast, setShowHourlyForecast } = useWeatherStore((state) => ({
    showHourlyForecast: state.showHourlyForecast,
    setShowHourlyForecast: state.setShowHourlyForecast,
  }));
  const searchParams = useSearchParams();

  // Sync Zustand state with URL parameter
  useEffect(() => {
    const viewParam = searchParams.get("view");
    if (viewParam === "weekly") {
      setShowHourlyForecast(false);
    } else if (viewParam === "hourly") {
      setShowHourlyForecast(true);
    }
    // If no view param, keep current Zustand state (defaults to hourly)
  }, [searchParams, setShowHourlyForecast]);

  const resolveCityName = () => {
    // Check if it's Xankəndi by coordinates
    if (
      hourlyWeatherData?.location?.lat === 39.8265 &&
      hourlyWeatherData?.location?.lon === 46.7656
    ) {
      return "Xankəndi";
    }
    return hourlyWeatherData?.location?.name
      ? cities[hourlyWeatherData.location.name] ||
          hourlyWeatherData.location.name
      : "";
  };

  const localCityName = resolveCityName();

  const renderHourlyForecastSection = () => (
    <section className="bg-[#e4f1ff] items-center justify-center xl:items-normal xl:justify-normal p-4 flex flex-col w-full xl:9/12">
      <div className="flex gap-2">
        <p className="text-2xl mt-4 self-center">{localCityName}</p>
        <h1 className="text-2xl mt-4 self-center">Hava Proqnozu</h1>
      </div>
      <p className="italic text-sm text-gray-600">
        Bu səhifədə cari saatlıq hava proqnozu təqdim olunur.
      </p>
      <HourlyForecast hourlyWeatherData={hourlyWeatherData} />
      <SecondaryDetails hourlyWeatherData={hourlyWeatherData} />
      <WeatherContent />
     
      <a className="font-bold text-decoration-line: underline" href="/about-us">
        Haqqımızda - Havam.az
      </a>
    </section>
  );

  const renderWeeklyForecastSection = () => (
    <section className="bg-[#e4f1ff] flex flex-col items-center justify-center w-full h-full">
      <div>
        <div className="flex gap-2">
          <p className="text-2xl mt-4 self-center">{localCityName}</p>
          <h1 className="text-2xl mt-4 self-center">Hava Proqnozu</h1>
        </div>
        <p>Həftəlik hava proqnozu</p>
      </div>
      <div className="h-screen flex flex-col items-center justify-start w-full">
        <WeeklyForecast />
      </div>
    </section>
  );

  if (!hourlyWeatherData) {
    return null;
  }

  return showHourlyForecast && hourlyWeatherData
    ? renderHourlyForecastSection()
    : renderWeeklyForecastSection();
};

export default MainDetails;
