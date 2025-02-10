"use client";
import React, { useCallback, useEffect, useState } from "react";
import HourlyForecast from "./HourlyForecast/HourlyForecast";
import { HourlyWeatherDataT } from "@/lib/types";
import { getHourly } from "@/actions/getHourly";
import SecondaryDetails from "./SecondaryDetails/SecondaryDetails";
import useWeatherStore from "@/store/store";
import { getSearchCityHourly } from "@/actions/getSearchCityHourly";
import WeeklyForecast from "./WeeklyForecast/WeeklyForecast";
import { ClipLoader } from "react-spinners";
import { cities } from "@/lib/locationNames";
import { SrcInfo } from "../SrcInfo/SrcInfo";

const MainDetails = () => {
  const [hourlyWeatherData, setHourlyWeatherData] =
    useState<HourlyWeatherDataT | null>(null);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 40.4093,
    lon: 49.8671,
    source: "default",
  });
  const [loading, setLoading] = useState(true);

  const { showHourlyForecast, coordinates: searchCity } = useWeatherStore(
    (state) => ({
      showHourlyForecast: state.showHourlyForecast,
      coordinates: state.coordinates,
    })
  );

  const fetchWeatherData = useCallback(async () => {
    if (!currentLocation) return;

    try {
      setLoading(true);

      const data =
        currentLocation.source === "search"
          ? await getSearchCityHourly({
              lat: currentLocation.lat,
              lon: currentLocation.lon,
            })
          : await getHourly({
              lat: currentLocation.lat,
              lon: currentLocation.lon,
            });

      if (data) setHourlyWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data", error);
    } finally {
      setLoading(false);
    }
  }, [currentLocation]);

  const resolveCityName = () => {
    if (searchCity.lat === 39.8265 && searchCity.lon === 46.7656) {
      return "Xankəndi";
    }
    return hourlyWeatherData?.location?.name
      ? cities[hourlyWeatherData.location.name] ||
          hourlyWeatherData.location.name
      : "";
  };

  useEffect(() => {
    if (searchCity.lat && searchCity.lon) {
      setCurrentLocation({
        lat: searchCity.lat,
        lon: searchCity.lon,
        source: "search",
      });
    }
  }, [searchCity]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  const localCityName = resolveCityName();

  if (loading) {
    return (
      <div className="justify-center h-screen items-center flex flex-col w-full xl:justify-center xl:items-center">
        <ClipLoader size={50} color="#36d7b7" loading={loading} />
      </div>
    );
  }

  const renderHourlyForecastSection = () => (
    <section className="bg-[#e4f1ff] items-center justify-center xl:items-normal xl:justify-normal p-4 flex flex-col w-full xl:9/12">
      <div className="flex gap-2">
        <p className="text-2xl mt-4 self-center">{localCityName}</p>
        <h1 className="text-2xl mt-4 self-center">Hava Proqnozu</h1>
      </div>
      <HourlyForecast hourlyWeatherData={hourlyWeatherData} />
      <SecondaryDetails hourlyWeatherData={hourlyWeatherData} />
      <a className="font-bold text-decoration-line: underline" href="/about-us">
        Haqqımızda - Havam.az
      </a>
      <SrcInfo />
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

  return showHourlyForecast && hourlyWeatherData
    ? renderHourlyForecastSection()
    : renderWeeklyForecastSection();
};

export default MainDetails;
