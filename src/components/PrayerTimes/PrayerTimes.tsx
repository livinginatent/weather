"use client";

import React, { useEffect, useState } from "react";
import CitySelector from "../CitySelector/CitySelector";
import useWeatherStore from "@/store/store";
import { getLocationName } from "@/utils/getLocationNames";
import { locationNames } from "@/lib/locationNames";
import moment from "moment-hijri";
import { prayTimes } from "@/utils/prayerTimes";
import PrayerFAQs from "./PrayerFAQs";

type PrayerDay = {
  date: Date;
  times: {
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    [key: string]: string;
  };
};

const PrayerTimes = () => {
  const DEFAULT_LAT = 40.4093;
  const DEFAULT_LON = 49.8671;

  const [todayTimes, setTodayTimes] = useState<PrayerDay | null>(null);
  const [calculationMethod, setCalculationMethod] = useState("MWL");
  const [monthlyTimes, setMonthlyTimes] = useState<PrayerDay[]>([]);

  const [currentDate, setCurrentDate] = useState<string>("");
  const [hijriDate, setHijriDate] = useState<string>("");

  const searchCity = useWeatherStore((state) => state.coordinates);
  const lat = searchCity?.lat ?? DEFAULT_LAT;
  const lon = searchCity?.lon ?? DEFAULT_LON;

  const locationName = getLocationName(lat, lon, locationNames);

  const buildPrayerData = (
    dateObj: Date,
    timesObj: Record<string, string>
  ): PrayerDay => {
    return {
      date: dateObj,
      times: {
        fajr: timesObj.fajr,
        sunrise: timesObj.sunrise,
        dhuhr: timesObj.dhuhr,
        asr: timesObj.asr,
        maghrib: timesObj.maghrib,
        isha: timesObj.isha,
      },
    };
  };

  const convertTo24HourFormat = (time: string): string => {
    const [hour, minutePart] = time.split(":");
    const minute = minutePart.slice(0, 2);
    const ampm = minutePart.slice(3) || "";
    let hours = parseInt(hour, 10);

    if (ampm.toUpperCase() === "PM" && hours < 12) hours += 12;
    if (ampm.toUpperCase() === "AM" && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, "0")}:${minute}`;
  };

  useEffect(() => {
    const today = new Date();
    setCurrentDate(
      today.toLocaleDateString("az-AZ", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    setHijriDate(moment().format("iYYYY/iM/iD"));

    // Update calculation method
    prayTimes.setMethod(calculationMethod);

    const todayTimesObj = prayTimes.getTimes(
      today,
      [lat, lon],
      "auto",
      "auto",
      "24h"
    );
    const builtTodayData = buildPrayerData(today, todayTimesObj);
    setTodayTimes(builtTodayData);

    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const newMonthlyTimes: PrayerDay[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      const dayTimesObj = prayTimes.getTimes(
        dateObj,
        [lat, lon],
        "auto",
        "auto",
        "24h"
      );
      newMonthlyTimes.push(buildPrayerData(dateObj, dayTimesObj));
    }

    setMonthlyTimes(newMonthlyTimes);
  }, [lat, lon, calculationMethod]);
  const today = new Date();

  const monthName = today.toLocaleString("az-AZ", { month: "long" });
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 w-full max-w-screen-xl mx-auto">
      <h1 className="text-5xl font-bold mt-4 text-center">Namaz vaxtları</h1>
      <h3 className="text-4xl font-semibold mb-1">
        {locationName || "Default City"}
      </h3>
      <div className="w-full sm:w-1/4 mx-auto">
        <CitySelector />
      </div>

      <div className="flex flex-col items-center">
        <div className="text-xl">
          {currentDate} - {hijriDate}{" "}
          <span className="italic">(Hicri tarixi)</span>
        </div>
      </div>
      <h2 className="text-2xl">Namaz saatları</h2>
      <h3 className="text-2xl">Rayonlarda namaz vaxtları</h3>
      <div className="w-full sm:w-1/4 mx-auto mb-4">
        <label className="block text-center text-lg font-semibold mb-2">
          Hesablama Metodu
        </label>
        <select
          className="block w-full border border-gray-300 rounded-md p-2"
          value={calculationMethod}
          onChange={(e) => setCalculationMethod(e.target.value)}
        >
          <option value="MWL">Ümumdünya İslam Liqası</option>
          <option value="ISNA">Şimali Amerika İslam Cəmiyyəti</option>
          <option value="Egypt">Misir Tədqiqatlar İdarəsi</option>
          <option value="Makkah">Üm Al Qura Universiteti (Məkkə)</option>
          <option value="Karachi">İslam Elmləri Universiteti (Karaçi)</option>
          <option value="Tehran">Tehran Universiteti Geofizika İnstitu</option>
          <option value="Jafari">Şiə İsnə-Əşəri, Ləva İnstitutu (Qum)</option>
        </select>
      </div>

      {todayTimes && (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-12 mt-4">
          <div className="flex flex-col items-center justify-around bg-[#E8F9FF] border-2 border-blue-950 w-full h-32 rounded-lg p-8">
            <p className="text-xl font-semibold">Sübh</p>
            <p className="text-lg">
              {convertTo24HourFormat(todayTimes.times.fajr)}
            </p>
          </div>

          <div className="flex flex-col items-center justify-around bg-[#E8F9FF] border-2 border-blue-950 w-full h-32 rounded-lg p-8">
            <p className="text-xl font-semibold">Zöhr</p>
            <p className="text-lg">
              {convertTo24HourFormat(todayTimes.times.dhuhr)}
            </p>
          </div>

          <div className="flex flex-col items-center justify-around bg-[#E8F9FF] border-2 border-blue-950 w-full h-32 rounded-lg p-8">
            <p className="text-xl font-semibold">Əsr</p>
            <p className="text-lg">
              {convertTo24HourFormat(todayTimes.times.asr)}
            </p>
          </div>

          <div className="flex flex-col items-center justify-around bg-[#E8F9FF] border-2 border-blue-950 w-full h-32 rounded-lg p-8">
            <p className="text-xl font-semibold">Məğrib</p>
            <p className="text-lg">
              {convertTo24HourFormat(todayTimes.times.maghrib)}
            </p>
          </div>

          <div className="flex flex-col items-center justify-around bg-[#E8F9FF] border-2 border-blue-950 w-full h-32 rounded-lg p-8">
            <p className="text-xl font-semibold">İşa</p>
            <p className="text-lg">
              {convertTo24HourFormat(todayTimes.times.isha)}
            </p>
          </div>
        </div>
      )}
      <div className="w-full">
        <p>
          Bu səhifə vasitəsilə Bakı namaz vaxtı və rayonlarda namaz vaxtını
          öyrənə bilərsiniz. Səhər (Sübh), Günorta (Zöhr), İkindi (Əsr), Axşam
          (Məğrib) və Yatsı (İşa) namazlarının vaxtlarını ətraflı şəkildə
          öyrənin. Xüsusilə, regionunuza uyğun namaz cədvəlləri və hicri tarixi
          daxil olmaqla, dəqiq informasiya təqdim olunur. Eyni zamanda, ayın hər
          gününə aid namaz saatlarını da əldə etmək mümkündür. Beləliklə, harada
          olmağınızdan asılı olmayaraq,rayon və Bakı namaz vaxtlarını vaxtında
          izləmək və gündəlik ibadətinizi tənzimləmək üçün bu səhifədən
          faydalana bilərsiniz.
        </p>
      </div>

      <div className="w-full mt-12">
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-2xl font-bold text-center mb-4">
            {locationName || "Default City"}: Ayın Namaz Cədvəli
          </h3>
          <p className="text-2xl">
            {monthName[0].toUpperCase() + monthName.slice(1)}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-slate-300">
            <thead>
              <tr className="bg-blue-200">
                <th className="border border-slate-300 p-2">Tarix</th>
                <th className="border border-slate-300 p-2">Sübh</th>
                <th className="border border-slate-300 p-2">Günəş</th>
                <th className="border border-slate-300 p-2">Zöhr</th>
                <th className="border border-slate-300 p-2">Əsr</th>
                <th className="border border-slate-300 p-2">Şam</th>
                <th className="border border-slate-300 p-2">İşa</th>
              </tr>
            </thead>
            <tbody>
              {monthlyTimes.map((item, index) => {
                const dateStr = item.date.toLocaleDateString("az-AZ", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                });
                return (
                  <tr key={index} className="hover:bg-blue-50">
                    <td className="border border-slate-300 p-2">{dateStr}</td>
                    <td className="border border-slate-300 p-2">
                      {convertTo24HourFormat(item.times.fajr)}
                    </td>
                    <td className="border border-slate-300 p-2">
                      {convertTo24HourFormat(item.times.sunrise)}
                    </td>
                    <td className="border border-slate-300 p-2">
                      {convertTo24HourFormat(item.times.dhuhr)}
                    </td>
                    <td className="border border-slate-300 p-2">
                      {convertTo24HourFormat(item.times.asr)}
                    </td>
                    <td className="border border-slate-300 p-2">
                      {convertTo24HourFormat(item.times.maghrib)}
                    </td>
                    <td className="border border-slate-300 p-2">
                      {convertTo24HourFormat(item.times.isha)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <PrayerFAQs />
    </div>
  );
};

export default PrayerTimes;
