"use client";

import { getMeteo } from "@/actions/getMeteo";
import HistoricalDataUI from "@/components/HistoricalData/HistoricalData";
import Search from "@/components/Search/Search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HistoricalDataT } from "@/lib/types";
import useWeatherStore from "@/store/store";
import { format } from "date-fns";
import { az } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {};

const HistoricalData = (props: Props) => {
  const [date, setDate] = useState<Date | null>(null); // Selected date
  const [error, setError] = useState<string | null>(null);
  const searchCity = useWeatherStore((state) => state.coordinates);
  const [historicalData, setHistoricalData] = useState<HistoricalDataT | null>(
    null
  );

  // Reset historical data when the date is changed
  const handleDateChange = (date: Date | null) => {
    setDate(date);
    setError(null); // Reset error on date change
    setHistoricalData(null); // Clear existing data when a new date is selected
  };

  // Fetch historical data when the button is clicked
  const handleFetchData = async () => {
    if (!date) {
      setError("Tarixi daxil edin");
      return;
    }

    const formattedDate = format(date, "yyyy-MM-dd");

    try {
      const res = await getMeteo({
        lat: searchCity.lat,
        lon: searchCity.lon,
        date: formattedDate,
      });
      setHistoricalData(res);
      setError(null); // Reset error on successful data fetch
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Xəta baş verdi. Yenidən cəhd edin.");
    }
  };

  // Re-fetch data when the city changes
  useEffect(() => {
    if (searchCity.lat && searchCity.lon && date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      const fetchData = async () => {
        try {
          const res = await getMeteo({
            lat: searchCity.lat,
            lon: searchCity.lon,
            date: formattedDate,
          });
          setHistoricalData(res);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [searchCity, date]); // Re-fetch when either the searchCity or date changes

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() - 1); // Set max date to yesterday

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <h1 className="text-2xl">Keçmiş tarixlər üçün hava proqnozu</h1>
      <Search />

      <div className="flex items-center gap-4">
        {/* Date picker component */}
        <DatePicker
          selected={date}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          maxDate={maxDate}
          placeholderText="Tarix seçin"
          className="input input-bordered"
          locale={az}
          disabled={searchCity.lat === null || searchCity.lon === null}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          wrapperClassName="datePicker"
        />
      </div>

      {/* Show error message if the date is invalid */}
      {error && <div className="text-red-500 mt-2">{error}</div>}

      {/* Display historical data if available */}
      {historicalData && historicalData.daily && date && (
        <HistoricalDataUI
          apparentTemperatureMax={
            historicalData.daily.apparentTemperatureMax[0]
          }
          apparentTemperatureMin={
            historicalData.daily.apparentTemperatureMin[0]
          }
          rainSum={historicalData.daily.rainSum[0]}
          snowfallSum={historicalData.daily.snowfallSum[0]}
          weatherCode={historicalData.daily.weatherCode[0]}
          windSpeed10mMax={historicalData.daily.windSpeed10mMax[0]}
          date={format(date, "dd-MM-yyyy", { locale: az })}
        />
      )}
    </div>
  );
};

export default HistoricalData;
