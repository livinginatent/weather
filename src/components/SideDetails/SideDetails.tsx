"use client";
import React, { useEffect, useState } from "react";
import SideDetailsMainInfo from "./SideDetailsMainInfo/SideDetailsMainInfo";
import { DEFAULT_LOCATION } from "@/lib/config";
import { getCurrent } from "@/actions/getCurrent";
import { CurrentWeatherDataT } from "@/lib/types";
import { cities } from "@/lib/locationNames";
import { conditionTranslations } from "@/lib/conditionTranslations";
import { getIcon } from "@/utils/getIcon";
import Search from "../Search/Search";
import { formatDate } from "@/utils/formatDate";
import useWeatherStore from "@/store/store";
import { getSearchCity } from "@/actions/getSearchCity";

import { ClipLoader } from "react-spinners";

export const SideDetails = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [weatherData, setWeatherData] = useState<
    CurrentWeatherDataT | undefined
  >();
  const [loading, setLoading] = useState<boolean>(true);
  const [logoUrl, setLogoUrl] = useState<string>("");
  const searchCity = useWeatherStore((state) => state.coordinates);

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error getting location", error);
          setLocation(DEFAULT_LOCATION); // Use default location on error
        },
        { timeout: 10000 }
      );
    };

    getLocation();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        let data;
        if (searchCity.lat != null && searchCity.lon !== null) {
          data = await getSearchCity({
            lat: searchCity.lat,
            lon: searchCity.lon,
          });
        } else if (location) {
          data = await getCurrent(location);
        }

        setWeatherData(data);
        if (data && data.current && data.current.condition.icon) {
          const localIconPath = getIcon(data.current.condition.icon);
          setLogoUrl(localIconPath);
        }
      } catch (error) {
        console.error("Error fetching weather data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location, searchCity]);

  const formattedDate = weatherData
    ? formatDate(weatherData.location.localtime)
    : "";

  const localCityName =
    (weatherData && cities[weatherData.location?.name]) ||
    weatherData?.location?.name;
  const localCountryName =
    (weatherData && cities[weatherData.location?.country]) ||
    weatherData?.location?.country;

  const conditionText = weatherData?.current?.condition.text;
  const condition = conditionText
    ? conditionTranslations[conditionText]
    : "Not available";
if (loading) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-75">
      <ClipLoader color="#36d7b7" size={50} />
    </div>
  );
};
  return (
    <>
      <aside className="md:w-1/4 lg:w-1/4 xl:w-1/4 flex flex-col items-center bg-[#5c9ce5]">
        <SideDetailsMainInfo
          date={formattedDate}
          condition={condition}
          country={localCountryName}
          city={localCityName}
          temp={`${weatherData?.current?.temp_c || "N/A"}°C`}
          logo={logoUrl}
          
        />
        <div className="flex w-4/5 mt-4 max-w-sm items-center justify-center space-x-2">
          <Search />
        </div>
      </aside>
    </>
  );
};

export default SideDetails;
