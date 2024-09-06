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
import useWeatherStore from "@/store/store";
import { getWeekly } from "@/actions/getWeekly";
import { ClipLoader } from "react-spinners";

type Props = {};

const AqiPage = (props: Props) => {
  const [weeklyWeatherData, setWeeklyWeatherData] =
    useState<DailyForecastT | null>(null);

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
        }
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };

    fetchWeatherData();
  }, [searchCity]);
  console.log(weeklyWeatherData);
  if (!weeklyWeatherData) {
    return <ClipLoader color="#36d7b7" />;
  }
  const fineParticle = <PiVirusFill size={24} color="white" />;
  const co = <GiGasMask size={24} color="white" />;
  const no2 = <LuBiohazard size={24} color="white" />;
  const index = <AiOutlineNumber size={24} color="white" />;
  return (
    <main className="flex flex-col w-full justify-center items-center">
      <div className="flex p-1 flex-col justify-center items-center">
        <h1 className="text-2xl text-center mt-8 font-bold">
          Hava Keyfiyyəti Haqqında Məlumat
        </h1>
        <div className="flex p-2 flex-col lg:flex-row xl:flex-row gap-2">
          <MainContainer
            title="PM2.5 (Çirkli partikullar)"
            value={weeklyWeatherData.current.air_quality.pm2_5}
            unit="µg/m³"
            icon={fineParticle}
          />
          <MainContainer
            title="Karbon Monoksid (CO)"
            value={weeklyWeatherData.current.air_quality.co}
            unit="µg/m³"
            icon={co}
          />
          <MainContainer
            title="Azot Dioksid (NO₂)"
            value={weeklyWeatherData.current.air_quality.no2}
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
        <Warning
          pm2_5={weeklyWeatherData.current.air_quality.pm2_5}
          location={weeklyWeatherData.location.name}
        />
      </div>

      <ForecastChart />
    </main>
  );
};

export default AqiPage;
