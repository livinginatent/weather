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

const MainDetails = () => {
  const [hourlyWeatherData, setHourlyWeatherData] =
    useState<HourlyWeatherDataT | null>(null);
  const { showHourlyForecast } = useWeatherStore();

  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lon: number;
    source: string;
  } | null>({ lat: 40.4093, lon: 49.8671, source: "default" });

  const { coordinates: searchCity } = useWeatherStore((state) => ({
    coordinates: state.coordinates,
  }));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchCity.lat != null && searchCity.lon != null) {
      setCurrentLocation({
        lat: searchCity.lat,
        lon: searchCity.lon,
        source: "search",
      });
    }
  }, [searchCity]);

  useEffect(() => {
    if (currentLocation) {
      const fetchWeatherData = async () => {
        try {
          setLoading(true);
          let data;

          if (currentLocation.source === "search") {
            data = await getSearchCityHourly({
              lat: currentLocation.lat,
              lon: currentLocation.lon,
            });
          } else {
            data = await getHourly({
              lat: currentLocation.lat,
              lon: currentLocation.lon,
            });
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
    }
  }, [currentLocation]);

  let localCityName: string | undefined = "";
  if (searchCity.lat === 39.8265 && searchCity.lon === 46.7656) {
    localCityName = "Xankəndi";
  } else {
    localCityName =
      (hourlyWeatherData && cities[hourlyWeatherData.location?.name]) ||
      hourlyWeatherData?.location?.name;
  }

  return (
    <>
      {loading ? (
        <div className="justify-center h-screen items-center flex flex-col w-full xl:justify-center xl:items-center">
          <ClipLoader size={50} color="#36d7b7" loading={loading} />
        </div>
      ) : showHourlyForecast && hourlyWeatherData ? (
        <section className="bg-[#e4f1ff] items-center justify-center xl:items-normal xl:justify-normal p-4 flex flex-col w-full xl:9/12 ">
          <div className="flex gap-2">
            <p className="text-2xl mt-4 self-center">{`${localCityName}`}</p>
            <h1 className="text-2xl mt-4 self-center">{`Hava Proqnozu`}</h1>
          </div>
          <HourlyForecast hourlyWeatherData={hourlyWeatherData} />
          <SecondaryDetails hourlyWeatherData={hourlyWeatherData} />
          <a className="font-bold text-decoration-line: underline" href="/about-us">
            Haqqımızda - Havam.az
          </a>
        </section>
      ) : (
        <section className="bg-[#e4f1ff] flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-2xl mt-4 self-center">
            {" "}
            {`${localCityName ? localCityName : "Bakı"} Həftəlik Hava Proqnozu`}
          </h1>{" "}
          <div className="h-screen flex flex-col items-center justify-start w-full">
            <WeeklyForecast />
          </div>
        </section>
      )}
    </>
  );
};

export default MainDetails;
