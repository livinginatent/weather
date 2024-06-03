"use client";
import React, { useEffect, useState } from "react";
import MainInfo from "./SideDetailsMainInfo/SideDetailsMainInfo";
import { DEFAULT_LOCATION } from "@/lib/config";
import { getCurrent } from "@/actions/getCurrent";
import { CurrentWeatherDataT } from "@/lib/types";
import { cities, locationNames } from "@/lib/locationNames";
import { conditionTranslations } from "@/lib/conditionTranslations";
import { getIcon } from "@/utils/getIcon";
import Search from "../Search/Search";
import { formatDate } from "@/utils/formatDate";
import useWeatherStore from "@/store/store";
import { getSearchCity } from "@/actions/getSearchCity";

const isObjectEmpty = (obj: any) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const SideDetails = () => {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [weatherData, setWeatherData] = useState<
    CurrentWeatherDataT | undefined
  >();
  const [loading, setLoading] = useState<boolean>(true);
  const [logoUrl, setLogoUrl] = useState<string>("");
  const searchCity = useWeatherStore((state) => state.coordinates);

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
        { timeout: 10000 }
      );
    };

    getLocation();
  }, []);

  // Fetch weather data based on location or selected city
  useEffect(() => {
    if (searchCity.lat != null && searchCity.lon !== null) {
      console.log("hey");
      setLoading(true);
      getSearchCity({ lat: searchCity.lat, lon: searchCity.lon })
        .then((data) => {
          setWeatherData(data);
          setLoading(false);
          if (data && data.current && data.current.condition.icon) {
            const localIconPath = getIcon(data.current.condition.icon);
            setLogoUrl(localIconPath);
          }
        })
        .catch((error) => {
          console.error("Error fetching weather data for selected city", error);
          setLoading(false);
        });
    } else {
      setLoading(true);
      getCurrent(location)
        .then((data) => {
          setWeatherData(data);
          setLoading(false);
          if (data && data.current && data.current.condition.icon) {
            const localIconPath = getIcon(data.current.condition.icon);
            setLogoUrl(localIconPath);
          }
        })
        .catch((error) => {
          console.error(
            "Error fetching weather data for current location",
            error
          );
          setLoading(false);
        });
    }
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
