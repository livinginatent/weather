"use client";
import React, { useEffect, useState } from "react";
import HourlyForecast from "./HourlyForecast/HourlyForecast";
import { HourlyWeatherDataT } from "@/lib/types";
import { getHourly } from "@/actions/getHourly";
import SecondaryDetails from "./SecondaryDetails/SecondaryDetails";
import useWeatherStore from "@/store/store";
import { getSearchCityHourly } from "@/actions/getSearchCityHourly";
import WeeklyForecast from "./WeeklyForecast/WeeklyForecast";
import { ClipLoader } from "react-spinners";

const MainDetails = () => {
  const [hourlyWeatherData, setHourlyWeatherData] =
    useState<HourlyWeatherDataT | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const searchCity = useWeatherStore((state) => state.coordinates);
  const { showHourlyForecast, setShowHourlyForecast } = useWeatherStore();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        let data;
        console.log(data)
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

  return (
    <>
      {loading ? (
        <div className=" justify-center items-center flex flex-col w-full xl:justify-center xl:items-center">
          <ClipLoader size={50} color="#36d7b7" loading={loading} />
        </div>
      ) : showHourlyForecast && hourlyWeatherData ? (
        <section className="bg-[#e4f1ff] justify-center items-center flex flex-col w-full xl:justify-center xl:items-center">
          <HourlyForecast hourlyWeatherData={hourlyWeatherData} />
          <SecondaryDetails hourlyWeatherData={hourlyWeatherData} />
        </section>
      ) : (
        <section className="bg-[#e4f1ff] justify-center items-center flex flex-col w-full">
          <h2 className="text-2xl self-center">Həftəlik Hava Proqnozu</h2>
          <WeeklyForecast />
        </section>
      )}
    </>
  );
};

export default MainDetails;
