"use client";
import React, { useEffect, useState } from "react";
import HourlyForecast from "./HourlyForecast/HourlyForecast";
import { HourlyWeatherDataT } from "@/lib/types";
import { getHourly } from "@/actions/getHourly";
import SecondaryDetails from "./SecondaryDetails/SecondaryDetails";
import useWeatherStore from "@/store/store";
import { getSearchCityHourly } from "@/actions/getSearchCityHourly";
import WeeklyForecast from "./WeeklyForecast/WeeklyForecast";
import { ClipLoader } from "react-spinners";
import { cities } from "@/lib/locationNames";

const MainDetails = () => {
  const [hourlyWeatherData, setHourlyWeatherData] =
    useState<HourlyWeatherDataT | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const searchCity = useWeatherStore((state) => state.coordinates);
  const { showHourlyForecast, setShowHourlyForecast } = useWeatherStore();
const dummyHourlyWeatherData = {
  forecast: {
    // Add your forecast data here (e.g., hourly forecasts, alerts)
  },
  location: {
    name: "Baku",
    region: "Absheron",
    country: "Azerbaijan",
    lat: 40.3993,
    lon: 49.8947,
    tz_id: "Asia/Baku",
    localtime: "2024-10-18 12:28:37",
    localtime_epoch: 1708225317,
  },
  current: {
    time_epoch: 1708225317,
    time: "12:28 PM",
    temp_c: 20,
    temp_f: 68,
    is_day: 1,
    condition: {
      // Add condition details here (e.g., text, icon)
    },
    wind_mph: 10,
    wind_kph: 16,
    wind_degree: 270,
    wind_dir: "West",
    pressure_mb: 1013,
    pressure_in: 29.91,
    precip_mm: 0,
    precip_in: 0,
    snow_cm: 0,
    humidity: 50,
    cloud: 20,
    feelslike_c: 22,
    feelslike_f: 72,
    windchill_c: 18,
    windchill_f: 64,
    heatindex_c: 20,
    heatindex_f: 68,
    dewpoint_c: 15,
    dewpoint_f: 59,
    will_it_rain: 0,
    chance_of_rain: 10,
    will_it_snow: 0,
    chance_of_snow: 0,
    vis_km: 10,
    vis_miles: 6,
    gust_mph: 12,
    gust_kph: 19,
    uv: 3,
    air_quality: {
      // Add air quality data here (e.g., co, no2, pm10)
    },
  },
};
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        let data;

        if (searchCity.lat != null && searchCity.lon != null) {
          data = await getSearchCityHourly({
            lat: searchCity.lat,
            lon: searchCity.lon,
          });
        } else {
          data = await getHourly();
        }

        if (data) {
          setHourlyWeatherData(data);
        }
      } catch (error) {
        console.error("Error fetching weather data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [searchCity]);
  const localCityName =
    (hourlyWeatherData && cities[hourlyWeatherData.location?.name]) ||
    hourlyWeatherData?.location?.name;
  return (
    <>
      {loading ? (
        <div className="justify-center items-center flex flex-col w-full xl:justify-center xl:items-center">
          <ClipLoader size={50} color="#36d7b7" loading={loading} />
        </div>
      ) : showHourlyForecast && hourlyWeatherData ? (
        <section className="bg-[#e4f1ff] justify-center items-center p-4 flex flex-col w-full xl:9/12 xl:justify-center xl:items-center">
          <h1 className="text-2xl mt-4 self-center">
            {`${localCityName} Hava Proqnozu`}
          </h1>
          <HourlyForecast hourlyWeatherData={hourlyWeatherData} />
          <SecondaryDetails hourlyWeatherData={hourlyWeatherData} />
        </section>
      ) : (
        <section className="bg-[#e4f1ff] flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-2xl mt-4 self-center">
            {" "}
            {`${localCityName} Həftəlik Hava Proqnozu`}
          </h1>{" "}
          <div className="h-screen flex flex-col items-center justify-start w-full">
            <WeeklyForecast />
          </div>
        </section>
      )}
    </>
  );
};

export default MainDetails;
