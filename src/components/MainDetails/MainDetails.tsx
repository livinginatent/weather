"use client";
import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import DailyForecast from "./DailyForecast/DailyForecast";
import { HourlyWeatherDataT } from "@/lib/types";
import { DEFAULT_LOCATION } from "@/lib/config";
import { getHourly } from "@/actions/getHourly";
import SecondaryDetails from "./SecondaryDetails/SecondaryDetails";
type Props = {};

const MainDetails = (props: Props) => {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [hourlyWeatherData, setHourlyWeatherData] = useState<
    HourlyWeatherDataT
  >();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
      },
      (error) => {
        console.error("Error getting location", error);
      }
    );
  }, []);

  // Fetch weather data when location is updated
  useEffect(() => {
    if (location !== DEFAULT_LOCATION) {
      getHourly(location)
        .then((data) => {
          setHourlyWeatherData(data);
          setLoading(false);
        })
        .catch((error) => console.error("Error fetching weather data", error));
    }
  }, [location, loading]);

  return (
    <section className="bg-[#e4f1ff] flex flex-col items-start justify-start w-full h-screen rounded-l-[30px] px-8">
      <h1 className="font-normal mt-10 text-xl self-start">
        Həftəlik və günlük hava proqnozu
      </h1>
      <DailyForecast loading={loading} hourlyWeatherData={hourlyWeatherData} />
      <SecondaryDetails loading={loading} hourlyWeatherData = {hourlyWeatherData} />
    </section>
  );
};

export default MainDetails;
