"use client";
import { getMonthly } from "@/actions/getMonthly";
import { locationNames } from "@/lib/locationNames";
import { MonthlyDataT } from "@/lib/types";
import { weatherCodes } from "@/lib/weatherCodes";
import { weatherIcons } from "@/lib/weatherIcons";
import useWeatherStore from "@/store/store";
import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import CitySelector from "../CitySelector/CitySelector";
import { getLocationName } from "@/utils/getLocationNames";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const MonthlyForecast = ({}) => {
  const [monthlyData, setMonthlyData] = useState<MonthlyDataT | null>(null);
  const searchCity = useWeatherStore((state) => state.coordinates);
  const router = useRouter();
  useEffect(() => {
    if (searchCity.lat && searchCity.lon) {
      const fetchData = async () => {
        try {
          const res = await getMonthly({
            lat: searchCity.lat,
            lon: searchCity.lon,
          });
          setMonthlyData(res);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    } else {
      const fetchData = async () => {
        try {
          const res = await getMonthly({ lat: 40.394317, lon: 49.865584 });
          setMonthlyData(res);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [searchCity]);

  const city = getLocationName(searchCity.lat, searchCity.lon, locationNames);
  return (
    <div className="flex w-5/6 flex-col items-center justify-center gap-4">
      <h1 className="text-center text-3xl">Aylıq Hava Proqnozu</h1>
      <h2 className="text-3xl">{city}</h2>
      <div className="flex flex-col items-center justify-center">
        <Search />
        <CitySelector />
      </div>

      <p className="w-5/6 text-center">
        Aylıq hava proqnozu, ay ərzində hava şəraitini qabaqcadan
        qiymətləndirməyə imkan verir. Bu proqnoz, temperatur dəyişiklikləri,
        yağış və külək sürəti kimi amillərini nəzərə alaraq, daha dəqiq qərarlar
        qəbul etməyə kömək edir. Hava proqnozunun dəqiqliyi, proqnozun müddəti
        uzandıqca azalır. Gələcək günlər üçün olan hava proqnozları daha çox
        dəyişə biləcək olduğundan, ən yaxın günlər üçün verilən məlumatların
        daha etibarlı olduğunu nəzərə alın.
      </p>
      {/* <div className="w-5/6 text-center">
        <MonthlyRecommendationDisplay monthlyData={monthlyData} />
      </div> */}
      <div>
        <Button
          onClick={() => router.push("/")}
          className="bg-gray-300 text-black hover:bg-gray-200 w-full mt-2"
        >
          Günlük və həftəlik hava proqnozu
        </Button>
      </div>
      <div className="w-full grid grid-cols-1 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {monthlyData?.daily.time.map((date, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 bg-[#fcfcfc] text-center shadow-md"
          >
            <h3 className="font-bold text-lg">
              {new Date(date).toLocaleDateString()}
            </h3>
            <div className="text-2xl my-3">
              {/* Replace with actual weather icons */}
              {weatherIcons[monthlyData?.daily.weatherCode[index]]}
              {weatherCodes[monthlyData?.daily.weatherCode[index]] ||
                "Unknown Weather"}
            </div>
            <p className="text-sm">
              Yuxarı Temperaturtur:{" "}
              {monthlyData?.daily.temperature2mMax[index]?.toFixed(0)}
              °C
            </p>
            <p className="text-sm">
              Aşağı Temperaturtur:{" "}
              {monthlyData?.daily.temperature2mMin[index]?.toFixed(0)}
              °C
            </p>
            {/*  <p className="text-sm">
              Külək: {monthlyData?.daily.windSpeed10mMax[index].toFixed(1)}
              km/s
            </p> */}
            {/* <p className="text-sm">
              {monthlyData?.daily.rainSum[index] === 0
                ? "Yağış: Gözlənilmir"
                : `${"Yağış: "}${monthlyData?.daily.rainSum[index]?.toFixed(2)} mm`}
            </p>
            <p className="text-sm">
              {monthlyData?.daily.rainSum[index] === 0
                ? "Qar: Gözlənilmir"
                : `${"Qar: "}${monthlyData?.daily.snowfallSum[index]?.toFixed(2)} mm`}{" "}
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyForecast;
