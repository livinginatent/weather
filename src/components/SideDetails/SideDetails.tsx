"use client";
import React, { useEffect, useState } from "react";
import SideDetailsMainInfo from "./SideDetailsMainInfo/SideDetailsMainInfo";
import { CurrentWeatherDataT } from "@/lib/types";
import { cities } from "@/lib/locationNames";
import { conditionTranslations } from "@/lib/conditionTranslations";
import { getIcon } from "@/utils/getIcon";
import Search from "../Search/Search";
import { formatDate } from "@/utils/formatDate";
import useWeatherStore from "@/store/store";
import { getHourly } from "@/actions/getHourly";
import { getSearchCityHourly } from "@/actions/getSearchCityHourly";
import ForecastToggle from "@/utils/ForecastToggle";
import FeaturedCities from "../FeaturedCities/FeaturedCities";

const SideDetails = () => {
  const [weatherData, setWeatherData] = useState<CurrentWeatherDataT | null>(
    null
  );
    const [currentLocation, setCurrentLocation] = useState<{
      lat: number;
      lon: number;
      source: string;
    } | null>({ lat: 40.4093, lon: 49.8671, source: "default" });
  const [logoUrl, setLogoUrl] = useState<string>("");
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
            setWeatherData(data);
            if (data.current && data.current.condition.icon) {
              const localIconPath = getIcon(data.current.condition.icon);
              setLogoUrl(localIconPath);
            }
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

  // Removed the spinner rendering condition
  // if (!weatherData) {
  //   return (
  //     <div className="fixed inset-0 flex justify-center items-center">
  //       <ClipLoader color="#36d7b7" size={50} />
  //     </div>
  //   );
  // }

  // Handle undefined data by providing default values or using optional chaining
  const formattedDate = weatherData?.location?.localtime
    ? formatDate(weatherData.location.localtime)
    : "";
  let localCityName: string | undefined = "";
  if (searchCity.lat === 39.8265 && searchCity.lon === 46.7656) {
    localCityName = "Xankəndi";
  } else {
    localCityName =
      (weatherData && cities[weatherData.location?.name]) ||
      weatherData?.location?.name;
  }
  const conditionText = weatherData?.current?.condition?.text?.trim() || "";
  const condition = conditionTranslations[conditionText] || conditionText || "";
  const temp =
    weatherData?.current?.temp_c != null
      ? `${Math.round(weatherData.current.temp_c)}°C`
      : "";

  return (
    <aside className="md:w-1/4 lg:w-1/4 xl:w-1/4 flex flex-col bg-gradient-to-tr from-sky-500 to-indigo-600 ">
      <SideDetailsMainInfo
        date={formattedDate}
        condition={condition}
        city={localCityName}
        temp={temp}
        logo={logoUrl}
      />
      <div className="flex flex-col w-4/5 mt-4 self-center mb-2 items-center justify-center">
        <div className="flex w-full">
          <Search />
          <ForecastToggle />
        </div>
        <div className="w-full mt-6">
          <FeaturedCities />
        </div>
      </div>
    </aside>
  );
};

export default SideDetails;
