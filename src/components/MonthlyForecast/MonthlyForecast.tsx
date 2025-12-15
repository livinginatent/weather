"use client";

import { getMonthly } from "@/actions/getMonthly";
import { locationNames } from "@/lib/locationNames";
import type { MonthlyDataT } from "@/lib/types";
import { weatherCodes } from "@/lib/weatherCodes";
import { weatherIcons } from "@/lib/weatherIcons";
import { useEffect, useState } from "react";
import Search from "../Search/Search";
import CitySelector from "../CitySelector/CitySelector";
import { getLocationName } from "@/utils/getLocationNames";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Thermometer,
  Wind,
  CloudRain,
  Snowflake,
} from "lucide-react";

const MonthlyForecast = ({}) => {
  const [monthlyData, setMonthlyData] = useState<MonthlyDataT | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    const fetchData = async () => {
      try {
        if (lat && lon) {
          const res = await getMonthly({
            lat: parseFloat(lat),
            lon: parseFloat(lon),
          });
          setMonthlyData(res);
        } else {
          const res = await getMonthly({ lat: 40.394317, lon: 49.865584 });
          setMonthlyData(res);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [searchParams]);

  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const city = getLocationName(
    lat ? parseFloat(lat) : null,
    lon ? parseFloat(lon) : null,
    locationNames
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Bugün";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Sabah";
    } else {
      return date.toLocaleDateString("az-AZ", {
        day: "numeric",
        month: "long",
      });
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold ">Aylıq Hava Proqnozu</h1>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/20 mb-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {city}
            </h2>
            <div className="space-y-4">
              <Search />
              <CitySelector />
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-md border border-white/20 max-w-4xl mx-auto">
            <p className="text-gray-700 leading-relaxed">
              Aylıq hava proqnozu, ay ərzində hava şəraitini qabaqcadan
              qiymətləndirməyə imkan verir. Bu proqnoz, temperatur
              dəyişiklikləri, yağış və külək sürəti kimi amillərini nəzərə
              alaraq, daha dəqiq qərarlar qəbul etməyə kömək edir. Hava
              proqnozunun dəqiqliyi, proqnozun müddəti uzandıqca azalır.
            </p>
          </div>
        </div>

        {/* Navigation Button */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={() => router.push("/")}
            className="bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 shadow-lg border border-white/20 backdrop-blur-sm transition-all duration-200 hover:shadow-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Günlük və həftəlik hava proqnozu
          </Button>
        </div>

        {/* Weather Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {monthlyData?.daily.time.map((date, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 hover:bg-white/90"
            >
              {/* Date Header */}
              <div className="text-center mb-4">
                <h3 className="font-bold text-lg text-gray-800">
                  {formatDate(date)}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(date).toLocaleDateString("az-AZ", {
                    weekday: "long",
                  })}
                </p>
              </div>

              {/* Weather Icon and Description */}
              <div className="text-center mb-6">
                <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {weatherIcons[monthlyData?.daily.weatherCode[index]]}
                </div>
                <p className="text-sm font-medium text-gray-600">
                  {weatherCodes[monthlyData?.daily.weatherCode[index]] ||
                    "Unknown Weather"}
                </p>
              </div>

              {/* Temperature Display */}
              <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg p-4 mb-4 border border-blue-100">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">Yuxarı</p>
                    <p className="text-xl font-bold text-blue-700">
                      {Math.round(monthlyData?.daily.temperature2mMax[index])}°
                    </p>
                  </div>
                  <Thermometer className="w-6 h-6 text-orange-500" />
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">Aşağı</p>
                    <p className="text-xl font-bold text-sky-700">
                      {Math.round(monthlyData?.daily.temperature2mMin[index])}°
                    </p>
                  </div>
                </div>
              </div>

              {monthlyData?.daily.windSpeed10mMax && (
                <div className="flex justify-center items-center gap-2 text-sm text-gray-600">
                  <Wind className="w-4 h-4 text-blue-600" />
                  <span>
                    Külək:{" "}
                    {monthlyData.daily.windSpeed10mMax[index]?.toFixed(0)} km/saat
                  </span>
                </div>
              )}
              {/* Additional Weather Info */}
              <div className="space-y-2 text-sm">
                {(() => {
                  const rain = monthlyData?.daily.rainSum?.[index] || 0;
                  const snow = monthlyData?.daily.snowfallSum?.[index] || 0;
                  const hasRain = rain > 0;
                  const hasSnow = snow > 0;

                  if (hasSnow && hasRain) {
                    // Both snow and rain
                    return (
                      <>
                        <div className="flex justify-center items-center gap-2 text-cyan-600">
                          <Snowflake className="w-4 h-4" />
                          Qar: {snow.toFixed(0)} mm
                        </div>
                        <div className="flex justify-center items-center gap-2 text-blue-600">
                          <CloudRain className="w-4 h-4" />
                          Yağış: {rain.toFixed(0)} mm
                        </div>
                      </>
                    );
                  } else if (hasSnow) {
                    // Only snow
                    return (
                      <div className="flex justify-center items-center gap-2 text-cyan-600">
                        <Snowflake className="w-4 h-4" />
                        Qar: {snow.toFixed(0)} mm
                      </div>
                    );
                  } else if (hasRain) {
                    // Only rain
                    return (
                      <div className="flex justify-center items-center gap-2 text-blue-600">
                        <CloudRain className="w-4 h-4" />
                        Yağış: {rain.toFixed(0)} mm
                      </div>
                    );
                  } else {
                    // No precipitation
                    return (
                      <div className="flex justify-center items-center gap-2 text-slate-400">
                        Yağıntı gözlənilmir
                      </div>
                    );
                  }
                })()}
              </div>
            </div>
          ))}
        </div>

        {/* Loading State */}
        {!monthlyData && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyForecast;
