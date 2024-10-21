"use client";
import MainContainer from "@/components/AirQuality/MainContainer/MainContainer";
import Warning from "@/components/AirQuality/Warning/Warning";
import React, { useEffect, useState } from "react";
import { PiVirusFill } from "react-icons/pi";
import { GiGasMask } from "react-icons/gi";
import { LuBiohazard } from "react-icons/lu";
import { AiOutlineNumber } from "react-icons/ai";
import { ForecastChart } from "@/components/AirQuality/ForecastChart/ForecastChart";
import { DailyForecastT } from "@/lib/types";
import { getWeekly } from "@/actions/getWeekly";
import { ClipLoader } from "react-spinners";
import { cities } from "@/lib/locationNames";
import Recommendations from "@/components/AirQuality/Recommendations/Recommendations";
import { getEPARecommendations } from "@/utils/getRecommendations";
import AQILevel from "@/components/AirQuality/AQILevel/AQILevel";
import useWeatherStore from "@/store/store";
import Search from "@/components/Search/Search";
import AQIWeekly from "@/components/AirQuality/AQIWeekly/AQIWeekly";
import { getSearchWeekly } from "@/actions/getSearchWeekly";
type Props = {};

const AQIMain = (props: Props) => {
  const [weeklyWeatherData, setWeeklyWeatherData] =
    useState<DailyForecastT | null>(null);

  const [recommendations, setRecommendations] = useState<any>([]);

  const searchCity = useWeatherStore((state) => state.coordinates);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        let data;

        if (searchCity.lat != null && searchCity.lon != null) {
          data = await getSearchWeekly({
            lat: searchCity.lat,
            lon: searchCity.lon,
          });
        } else {
          data = await getWeekly();
        }

        if (data) {
          setWeeklyWeatherData(data);

          const aqiIndex = data.current.air_quality["us-epa-index"];
          const generatedRecommendations = getEPARecommendations(aqiIndex);
          setRecommendations(generatedRecommendations);
        }
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };

    fetchWeatherData();
  }, [searchCity]);
  if (!weeklyWeatherData) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  const fineParticle = <PiVirusFill size={24} color="white" />;
  const co = <GiGasMask size={24} color="white" />;
  const no2 = <LuBiohazard size={24} color="white" />;
  const index = <AiOutlineNumber size={24} color="white" />;

  let city: string | undefined = "";
  if (searchCity.lat === 39.8265 && searchCity.lon === 46.7656) {
    city = "Xankəndi";
  } else {
    city =
      (weeklyWeatherData && cities[weeklyWeatherData.location?.name]) ||
      weeklyWeatherData?.location?.name;
  }
  return (
    <div className="flex flex-col  justify-center items-center">
      <h1 className="text-2xl text-center mt-8 font-bold mb-6">
        Hava Keyfiyyəti Haqqında Məlumat - {`${city}`}
      </h1>
      <Search />
      <div className="flex p-2 flex-col justify-center items-center gap-2">
        <div className="w-full">

        <div className="flex w-full flex-col gap-4 lg:flex-row xl:flex-row justify-center items-center">
          <MainContainer
            title="PM2.5 (Çirkli partikullar)"
            value={Math.round(weeklyWeatherData.current.air_quality.pm2_5)}
            unit="µg/m³"
            icon={fineParticle}
            />
          <MainContainer
            title="Karbon Monoksid (CO)"
            value={Math.round(weeklyWeatherData.current.air_quality.co)}
            unit="µg/m³"
            icon={co}
            />
          <MainContainer
            title="Azot Dioksid (NO₂)"
            value={Math.round(weeklyWeatherData.current.air_quality.no2)}
            unit="µg/m³"
            icon={no2}
            />
          <MainContainer
            title="Hava Keyfiyyəti İndeksi"
            value={weeklyWeatherData.current.air_quality["us-epa-index"]}
            unit=""
            icon={index}
            />
        </div>
        <AQILevel />
        <Warning
          pm2_5={weeklyWeatherData.current.air_quality.pm2_5}
          location={weeklyWeatherData.location.name}
          />
        <Recommendations recommendations={recommendations} />
        <AQIWeekly forecastData={weeklyWeatherData} />
          </div>
      </div>
    </div>
  );
};

export default AQIMain;
