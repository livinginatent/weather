"use client";
import React, { Suspense, useEffect, useState } from "react";
import MainInfo from "./MainInfo/MainInfo";
import { DEFAULT_LOCATION } from "@/lib/config";
import { getCurrent } from "@/actions/getCurrent";
import { WeatherDataT } from "@/lib/types";
import { locationNames } from "@/lib/locationNames";
import { days, months } from "@/lib/dateTranslations";

export const SideDetails = () => {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [weatherData, setWeatherData] = useState<WeatherDataT | undefined>();
  const [loading, setLoading] = useState(true);

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
        })
        .catch((error) => console.error("Error fetching weather data", error));
    }
  }, [location, loading]);

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
    <aside className="w-1/5 h-screen bg-[#5c9ce5]">
      <MainInfo
        loading={loading}
        date={formattedDate}
        sunrise="07:19"
        sunset="20:08"
        condition={weatherData?.current?.condition.text || "Not available"}
        country={localCountryName}
        city={localCityName}
        temp={`${weatherData?.current?.temp_c || "N/A"}°C`}
      />
    </aside>
  );
};

export default SideDetails;
