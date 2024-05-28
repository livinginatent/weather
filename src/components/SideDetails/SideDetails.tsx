"use client";
import React, { useEffect, useState } from "react";
import MainInfo from "./SideDetailsMainInfo/SideDetailsMainInfo";
import { DEFAULT_LOCATION } from "@/lib/config";
import { getCurrent } from "@/actions/getCurrent";
import { CurrentWeatherDataT } from "@/lib/types";
import { locationNames } from "@/lib/locationNames";
import { days, months } from "@/lib/dateTranslations";
import { conditionTranslations } from "@/lib/conditionTranslations";
import { getIcon } from "@/utils/getIcon";
import Search from "../Search/Search";
import { formatDate } from "@/utils/formatDate";

export const SideDetails = () => {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [weatherData, setWeatherData] = useState<
    CurrentWeatherDataT | undefined
  >();
  const [loading, setLoading] = useState<boolean>(true);
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [permission, setPermission] = useState<boolean>(false);
  
  // Fetch location from navigator or use default
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
        { timeout: 10000 } // Set a timeout to handle the case where geolocation takes too long
      );
    };

    getLocation();
  }, []);

  // Fetch weather data when location is updated
  useEffect(() => {
    if (location !== DEFAULT_LOCATION || loading) {
      getCurrent(location)
        .then((data) => {
          setWeatherData(data);
          setLoading(false);
          if (data && data.current && data.current.condition.icon) {
            const localIconPath = getIcon(data.current.condition.icon);
            setLogoUrl(localIconPath);
            console.log(localIconPath);
          }
        })
        .catch((error) => console.error("Error fetching weather data", error));
    }
  }, [location]);

  const formattedDate = weatherData
    ? formatDate(weatherData.location.localtime)
    : "";

  const localCityName =
    (weatherData && locationNames[weatherData.location?.region]) ||
    weatherData?.location?.region;
  const localCountryName =
    (weatherData && locationNames[weatherData.location?.country]) ||
    weatherData?.location?.country;

  const conditionText = weatherData?.current?.condition.text;
  const condition = conditionText
    ? conditionTranslations[conditionText]
    : "Not available";

  return (
    <aside className="md:w-1/4 lg:w-1/4 xl:w-1/4 flex flex-col items-center bg-[#5c9ce5]">
      <MainInfo
        loading={loading}
        date={formattedDate}
        condition={condition}
        country={localCountryName}
        city={localCityName}
        temp={`${weatherData?.current?.temp_c || "N/A"}°C`}
        logo={logoUrl}
      />
      <div className="flex w-4/5 max-w-sm items-center self-center space-x-2">
        <Search />
      </div>
    </aside>
  );
};

export default SideDetails;
