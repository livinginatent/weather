"use client";
import React, { useEffect, useState } from "react";
import CitySelector from "../CitySelector/CitySelector";
import { getPrayer } from "@/actions/getPrayer";
import useWeatherStore from "@/store/store";
import { citiesEn, locationNames } from "@/lib/locationNames";
import { getLocationName } from "@/utils/getLocationNames";
import { PrayerTimesResponse } from "@/lib/types";
import moment from "moment-hijri";
type Props = {};

const PrayerTimes = (props: Props) => {
  const [prayerData, setPrayerData] = useState<PrayerTimesResponse | null>(
    null
  );
  const [currentDate, setCurrentDate] = useState<string>("");
  const [hijriDate, setHijriDate] = useState<string>("");

  const searchCity = useWeatherStore((state) => state.coordinates);

  const locationName = getLocationName(
    searchCity?.lat,
    searchCity?.lon,
    locationNames
  );

  const englishCityName = locationName ? citiesEn[locationName] : "Baku";

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const res = await getPrayer('baku');
        if (res) {
          setPrayerData(res);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const today = new Date();
    setCurrentDate(
      today.toLocaleDateString("az-AZ", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    const hijriToday = moment().format("iYYYY/iM/iD");
    setHijriDate(hijriToday);

    if (englishCityName) {
      fetchPrayerTimes();
    }
  }, [searchCity.lat, searchCity.lon, englishCityName]);

  const convertTo24HourFormat = (time: string): string => {
    const [hour, minute] = time.split(":");
    const ampm =
      time.includes("AM") || time.includes("PM") ? time.slice(-2) : "";
    let hours = parseInt(hour, 10);
    if (ampm === "PM" && hours < 12) hours += 12;
    if (ampm === "AM" && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, "0")}:${minute}`;
  };

  return (
    <div className="flex flex-col w-full items-center justify-center gap-6">
      <h1 className="text-3xl text-center  font-bold mt-4">Namaz vaxtları</h1>
      <div className="w-1/4">
        <CitySelector />
      </div>
      <h2 className="text-2xl">Bakı üçün Namaz vaxtları</h2>
      <div className="text-lg">
        {currentDate} - {hijriDate} {"(Hicri tarixi)"}
      </div>{" "}
      {/* Display current and Hijri date */}
      {prayerData && prayerData.items.length > 0 && (
        <div className="grid grid-cols-5 gap-12 mt-4">
          {prayerData.items[0] && (
            <>
              <div
                className="border-2 border-blue-950 flex bg-[#E8F9FF] flex-col items-center justify-around border-gray-700 w-48 h-32 rounded-lg"
                key="fajr"
              >
                <p className="text-xl">Sübh namazı</p>
                <p className="text-lg">
                  {convertTo24HourFormat(prayerData.items[0].fajr)}
                </p>
              </div>

              <div
                className="border-2 border-blue-950 flex bg-[#E8F9FF] flex-col items-center justify-around border-gray-700 w-48 h-32 rounded-lg"
                key="dhuhr"
              >
                <p className="text-xl">Zöhr namazı</p>
                <p className="text-lg">
                  {convertTo24HourFormat(prayerData.items[0].dhuhr)}
                </p>
              </div>
              <div
                className="border-2 border-blue-950 flex bg-[#E8F9FF] flex-col items-center justify-around border-gray-700 w-48 h-32 rounded-lg"
                key="asr"
              >
                <p className="text-xl">Əsr namazı</p>
                <p className="text-lg">
                  {convertTo24HourFormat(prayerData.items[0].asr)}
                </p>
              </div>
              <div
                className="border-2 border-blue-950 flex bg-[#E8F9FF] flex-col items-center justify-around border-gray-700 w-48 h-32 rounded-lg"
                key="maghrib"
              >
                <p className="text-xl">Şam namazı</p>
                <p className="text-lg">
                  {convertTo24HourFormat(prayerData.items[0].maghrib)}
                </p>
              </div>
              <div
                className="border-2 border-blue-950 flex bg-[#E8F9FF] flex-col items-center justify-around border-gray-700 w-48 h-32 rounded-lg"
                key="isha"
              >
                <p className="text-xl">İşa namazı</p>
                <p className="text-lg">
                  {convertTo24HourFormat(prayerData.items[0].isha)}
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PrayerTimes;
