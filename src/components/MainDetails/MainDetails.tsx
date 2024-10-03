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
import { cities } from "@/lib/locationNames";
import { getMeteo } from "@/actions/getMeteo";

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
  const localCityName =
    (hourlyWeatherData && cities[hourlyWeatherData.location?.name]) ||
    hourlyWeatherData?.location?.name;
  return (
    <>
      {loading ? (
        <div className="justify-center items-center flex flex-col w-full xl:justify-center xl:items-center">
          <ClipLoader size={50} color="#36d7b7" loading={loading} />
        </div>
      ) : showHourlyForecast && hourlyWeatherData ? (
        <section className="bg-[#e4f1ff] justify-center items-center p-4 flex flex-col w-full xl:9/12 xl:justify-center xl:items-center">
          <h1 className="text-2xl mt-4 self-center">
            {`${localCityName} Hava Proqnozu`}
          </h1>
          <HourlyForecast hourlyWeatherData={hourlyWeatherData} />
          <SecondaryDetails hourlyWeatherData={hourlyWeatherData} />
        </section>
      ) : (
        <section className="bg-[#e4f1ff] flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-2xl mt-4 self-center">
            {`${localCityName} Həftəlik Hava Proqnozu`}
          </h1>
          <div className="h-screen flex flex-col items-center justify-start w-full">
            <WeeklyForecast />
          </div>
        </section>
      )}
    </>
  );
};

export default MainDetails;
