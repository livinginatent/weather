"use client";
import React, { useEffect, useState } from "react";
import SideDetailsMainInfo from "./SideDetailsMainInfo/SideDetailsMainInfo";
import { DEFAULT_LOCATION } from "@/lib/config";
import { CurrentWeatherDataT } from "@/lib/types";
import { cities } from "@/lib/locationNames";
import { conditionTranslations } from "@/lib/conditionTranslations";
import { getIcon } from "@/utils/getIcon";
import Search from "../Search/Search";
import { formatDate } from "@/utils/formatDate";
import useWeatherStore from "@/store/store";
import { getSearchCity } from "@/actions/getSearchCity";
import { ClipLoader } from "react-spinners";
import { getHourly } from "@/actions/getHourly";
import { getSearchCityHourly } from "@/actions/getSearchCityHourly";
import ForecastToggle from "@/utils/ForecastToggle";
import FeaturedCities from "../FeaturedCities/FeaturedCities";

const SideDetails = () => {

  const [weatherData, setWeatherData] = useState<CurrentWeatherDataT | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [logoUrl, setLogoUrl] = useState<string>("");
  const searchCity = useWeatherStore((state) => state.coordinates);


  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        let data;
        if (searchCity.lat != null && searchCity.lon !== null) {
          data = await getSearchCityHourly({
            lat: searchCity.lat,
            lon: searchCity.lon,
          });
        } else {
          data = await getHourly();
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
  }, [searchCity]);

  if (loading || !weatherData) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  const formattedDate = formatDate(weatherData?.location.localtime);
  const localCityName =
    (weatherData && cities[weatherData.location?.region]) ||
    weatherData?.location?.region;
  const localCountryName =
    cities[weatherData.location?.country] || weatherData.location?.country;
  const conditionText = weatherData.current.condition.text.trim();
  const condition =
    conditionTranslations[conditionText] || conditionText;
if (loading) {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <ClipLoader color="#36d7b7" size={50} />
    </div>
  );
}
  return (
    <aside className="md:w-1/4 lg:w-1/4 xl:w-1/4 flex flex-col bg-[#5c9ce5]">
      <SideDetailsMainInfo
        date={formattedDate}
        condition={condition}
        country={localCountryName}
        city={localCityName}
        temp={`${Math.round(weatherData.current.temp_c)}°C`}
        logo={logoUrl}
        loading={loading}
      />
      <div className="flex w-4/5 mt-4 max-w-sm self-center mb-2 items-center justify-center space-x-2">
        <Search />
        <ForecastToggle />
      </div>
      <FeaturedCities/>
    </aside>
  );
};

export default SideDetails;
