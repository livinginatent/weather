"use client";
import React, { useEffect, useState } from "react";
import MainInfo from "./SideDetailsMainInfo/SideDetailsMainInfo";
import { DEFAULT_LOCATION } from "@/lib/config";
import { getCurrent } from "@/actions/getCurrent";
import { CurrentWeatherDataT } from "@/lib/types";
import { locationNames } from "@/lib/locationNames";
import { days, months } from "@/lib/dateTranslations";
import { conditionTranslations } from "@/lib/conditionTranslations";
import { getIcon } from "@/lib/getIcon";

export const SideDetails = () => {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [weatherData, setWeatherData] = useState<
    CurrentWeatherDataT | undefined
  >();
  const [loading, setLoading] = useState(true);
  const [logoUrl, setLogoUrl] = useState("");

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayOfWeek = days[date.toLocaleString("en-US", { weekday: "long" })];
    const month = months[date.toLocaleString("en-US", { month: "long" })];
    const dayOfMonth = date.getDate();
    const time = `${date.getHours()}:${date.getMinutes()}`;

    return `${dayOfWeek}, ${dayOfMonth} ${month}, ${time} `;
  };

  // Fetch location from navigator or use default
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
      getCurrent(location)
        .then((data) => {
          setWeatherData(data);
          setLoading(false);
          if (data && data.current && data.current.condition.icon) {
            const localIconPath = getIcon(data.current.condition.icon);
            setLogoUrl(localIconPath);
            console.log(localIconPath)
            
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

  return (
    <aside className="md:w-1/4 bg-[#5c9ce5]">
      <MainInfo
        loading={loading}
        date={formattedDate}
        sunrise="07:19"
        sunset="20:08"
        condition={
          conditionTranslations[weatherData?.current?.condition.text] ||
          "Not available"
        }
        country={localCountryName}
        city={localCityName}
        temp={`${weatherData?.current?.temp_c || "N/A"}°C`}
        logo={logoUrl}
      />
    </aside>
  );
};

export default SideDetails;
