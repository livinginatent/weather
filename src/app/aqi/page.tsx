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

type Props = {};

const AqiPage = (props: Props) => {
  const [weeklyWeatherData, setWeeklyWeatherData] =
    useState<DailyForecastT | null>(null);

  const [recommendations, setRecommendations] = useState<any>([]);

  const searchCity = useWeatherStore((state) => state.coordinates);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeekly({
          lat: searchCity.lat,
          lon: searchCity.lon,
        });

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

  const city = cities[weeklyWeatherData?.location.name]
    ? cities[weeklyWeatherData?.location.name]
    : [weeklyWeatherData?.location.name];
  return (
    <main className="flex flex-col w-full justify-center items-center">
      <div className="flex p-1 flex-col justify-center items-center">
        <h1 className="text-2xl text-center mt-8 font-bold mb-6">
          Hava Keyfiyyəti Haqqında Məlumat - {`${city}`}
        </h1>
        <Search />
        <div className="flex p-2 flex-col justify-center items-center gap-2">
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
        </div>
        <Recommendations recommendations={recommendations} />
        <AQIWeekly forecastData={weeklyWeatherData} />
      </div>
    </main>
  );
};

export default AqiPage;
