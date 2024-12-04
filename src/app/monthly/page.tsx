"use client";
import { getMonthly } from "@/actions/getMonthly";
import CitySelector from "@/components/CitySelector/CitySelector";
import MonthlyForecast from "@/components/MonthlyForecast/MonthlyForecast";
import Search from "@/components/Search/Search";
import { locationNames } from "@/lib/locationNames";
import { MonthlyDataT } from "@/lib/types";
import { weatherCodes } from "@/lib/weatherCodes";
import useWeatherStore from "@/store/store";
import React, { useEffect, useState } from "react";

type Props = {};

const Monthly = (props: Props) => {
  const [monthlyData, setMonthlyData] = useState<MonthlyDataT | null>(null);
  const searchCity = useWeatherStore((state) => state.coordinates);

  useEffect(() => {
    if (searchCity.lat && searchCity.lon) {
      const fetchData = async () => {
        try {
          const res = await getMonthly({
            lat: searchCity.lat,
            lon: searchCity.lon,
          });
          setMonthlyData(res);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    } else {
      const fetchData = async () => {
        try {
          const res = await getMonthly({ lat: 40.4093, lon: 49.8671 });
          setMonthlyData(res);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [searchCity]); // Re-fetch when the searchCity changes
  const getLocationName = (
    lat: number | null | undefined,
    lon: number | null | undefined,
    locations: { [key: string]: { lat: number | null; lon: number | null } }
  ): string | null => {
    for (const [name, coords] of Object.entries(locations)) {
      if (coords.lat === lat && coords.lon === lon) {
        return name;
      }
    }
    return "Bakı";
  };
  const city = getLocationName(searchCity.lat, searchCity.lon, locationNames);
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <h1 className="text-center text-3xl">Aylıq Hava Proqnozu</h1>
      <h2 className="text-3xl">{city}</h2>
      <Search />
      <div className="w-auto">
        <CitySelector />
      </div>
      {monthlyData ? (
        <MonthlyForecast
          daily={monthlyData.daily}
          weatherCodeTexts={weatherCodes}
        />
      ) : null}
    </div>
  );
};

export default Monthly;
