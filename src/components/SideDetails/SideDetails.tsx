"use client";
import React, { useEffect, useState } from "react";
import MainInfo from "./MainInfo/MainInfo";
import { DEFAULT_LOCATION } from "@/lib/config";
import { getCurrent } from "@/actions/getCurrent";
import { WeatherDataT } from "@/lib/types";

export const SideDetails = () => {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [weatherData, setWeatherData] = useState<WeatherDataT | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setLocation(newLocation);
        console.log("Location updated:", newLocation);
      },
      (error) => {
        console.error("Error getting location", error);
      }
    );
  }, []);

  useEffect(() => {
    if (location) {
      getCurrent(location)
        .then((data) => {
          setWeatherData(data);
          console.log("Weather data fetched", data);
        })
        .catch((error) => {
          console.error("Error fetching weather data", error);
        });
    }
  }, [location]);

  return (
    <aside className="w-1/5 h-screen bg-[#5c9ce5]">
      <MainInfo
        sunrise={"07:19"}
        sunset={"20:08"}
        condition={weatherData?.current?.condition.text}
        country={weatherData?.location?.country}
        city={weatherData?.location?.region}
        temp={weatherData?.current?.temp_c}
      />
    </aside>
  );
};

export default SideDetails;
