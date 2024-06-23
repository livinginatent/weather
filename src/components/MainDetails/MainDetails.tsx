"use client";
import React, { useEffect, useState } from "react";
import HourlyForecast from "./HourlyForecast/HourlyForecast";
import { HourlyWeatherDataT } from "@/lib/types";
import { getHourly } from "@/actions/getHourly";
import SecondaryDetails from "./SecondaryDetails/SecondaryDetails";
import { ClipLoader } from "react-spinners";
import useWeatherStore from "@/store/store";
import { getSearchCity } from "@/actions/getSearchCity";
import { getSearchCityHourly } from "@/actions/getSearchCityHourly";
import { Button } from "../ui/button";
import WeeklyForecast from "./WeeklyForecast/WeeklyForecast";

const MainDetails = () => {
  const [hourlyWeatherData, setHourlyWeatherData] =
    useState<HourlyWeatherDataT | null>(null);
  const [loading, setLoading] = useState(true);
  const searchCity = useWeatherStore((state) => state.coordinates);
  const { showHourlyForecast, setShowHourlyForecast } = useWeatherStore();

  const handleClick = (showHourly: boolean) => {
    setShowHourlyForecast(showHourly);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        let data;
        if (searchCity.lat != null && searchCity.lon != null) {
          data = await getSearchCityHourly({
            lat: searchCity.lat,
            lon: searchCity.lon,
          });
        } else {
          data = await getHourly();
        }

        if (data) {
          setHourlyWeatherData(data);
        }
      } catch (error) {
        console.error("Error fetching weather data", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchWeatherData();
  }, [searchCity]);

  if (loading || !hourlyWeatherData) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  return (
    <section className="bg-[#e4f1ff] justify-center items-center flex flex-col w-full xl:h-screen xl:justify-center xl:items-center rounded-l-[30px]">
      {showHourlyForecast && (
        <HourlyForecast hourlyWeatherData={hourlyWeatherData} />
      )}
      <div className="flex gap-2 ml-2 self-start">
        <Button
          onClick={() => handleClick(true)}
          className={`${
            showHourlyForecast
              ? "bg-zinc-800 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          Saatlıq
        </Button>
        <Button
          className={`${
            !showHourlyForecast
              ? "bg-zinc-800 text-white"
              : "bg-gray-300 text-black"
          }`}
          onClick={() => handleClick(false)}
        >
          Həftəlik
        </Button>
      </div>
      {showHourlyForecast && (
        <SecondaryDetails hourlyWeatherData={hourlyWeatherData} />
      )}
      {!showHourlyForecast && <WeeklyForecast/>}
    </section>
  );
};

export default MainDetails;
