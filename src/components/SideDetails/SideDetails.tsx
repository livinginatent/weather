"use client";
import React, { useMemo } from "react";
import SideDetailsMainInfo from "./SideDetailsMainInfo/SideDetailsMainInfo";
import { CurrentWeatherDataT, HourlyWeatherDataT } from "@/lib/types";
import { cities } from "@/lib/locationNames";
import { conditionTranslations } from "@/lib/conditionTranslations";
import { getIcon } from "@/utils/getIcon";
import Search from "../Search/Search";
import { formatDate } from "@/utils/formatDate";
import ForecastToggle from "@/utils/ForecastToggle";
import FeaturedCities from "../FeaturedCities/FeaturedCities";
import CitySelector from "../CitySelector/CitySelector";

type SideDetailsProps = {
  weatherData: HourlyWeatherDataT | null;
};

const SideDetails = ({ weatherData }: SideDetailsProps) => {
  // Handle undefined data by providing default values or using optional chaining
  const now = new Date();
  const currentDateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const formattedDate = formatDate(currentDateTime);

  const localCityName = useMemo(() => {
    if (!weatherData) return "";
  
    return (
      (weatherData && cities[weatherData.location?.name]) ||
      weatherData?.location?.name ||
      ""
    );
  }, [weatherData]);

  const logoUrl = useMemo(() => {
    if (weatherData?.current?.condition?.icon) {
      return getIcon(weatherData.current.condition.icon);
    }
    return "";
  }, [weatherData]);

  const conditionText = weatherData?.current?.condition?.text?.trim() || "";
  const condition = conditionTranslations[conditionText] || conditionText || "";
  const temp =
    weatherData?.current?.temp_c != null
      ? `${Math.round(weatherData.current.temp_c)}°C`
      : "";
  const feelsLike =
    weatherData?.current?.feelslike_c != null
      ? `${Math.round(weatherData.current.feelslike_c)}°C`
      : "";
  return (
    <aside className="flex flex-col bg-gradient-to-tr from-sky-500 to-indigo-600 ">
      <SideDetailsMainInfo
        date={formattedDate}
        condition={condition}
        city={localCityName}
        temp={temp}
        feelsLike={feelsLike}
        logo={logoUrl}
      />

      <div className="flex flex-col p-6 w-full w-4/5 mt-4 self-center mb-2 items-center justify-center">
        <div className="flex w-full">
          <Search />
          <ForecastToggle />
        </div>
        <div className="w-full  mt-6">
          <h3 className="text-center text-white text-lg mb-4">
            Digər şəhərlərdə hava proqnozu
          </h3>
          <FeaturedCities />
          <CitySelector />
        </div>
      </div>
    </aside>
  );
};

export default SideDetails;
