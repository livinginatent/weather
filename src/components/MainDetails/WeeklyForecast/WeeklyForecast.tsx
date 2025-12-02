"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Day from "./Day";
import { getWeekly } from "@/actions/getWeekly";
import { DailyForecastT } from "@/lib/types";
import { getSearchWeekly } from "@/actions/getSearchWeekly";

interface WeeklyForecastProps {
  lat?: number | null;
  lon?: number | null;
}

const WeeklyForecast = ({ lat, lon }: WeeklyForecastProps) => {
  const [weeklyWeatherData, setWeeklyWeatherData] =
    useState<DailyForecastT | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        let data;
        const urlLat = searchParams.get("lat");
        const urlLon = searchParams.get("lon");
        
        if (lat !== undefined && lon !== undefined) {
          data = await getSearchWeekly({
            lat: lat,
            lon: lon,
          });
        } else if (urlLat && urlLon) {
          data = await getSearchWeekly({
            lat: parseFloat(urlLat),
            lon: parseFloat(urlLon),
          });
        } else {
          data = await getWeekly({ lat: 40.394317, lon: 49.865584 });
        }

        if (data) {
          setWeeklyWeatherData(data);
        }
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };

    fetchWeatherData();
  }, [searchParams, lat, lon]);

  return (
    <div className="w-full  flex items-center justify-center mt-4">
      <div className="border border-[#F7F9F2] rounded-2xl bg-white">
        <div className="flex flex-col justify-center items-center w-full">
          {weeklyWeatherData?.forecast?.forecastday?.map((day, index) => (
            <Day key={index} day={day} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyForecast;
