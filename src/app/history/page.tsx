"use client";

import { getMeteo } from "@/actions/getMeteo";
import HistoricalDataUI from "@/components/HistoricalData/HistoricalData";
import Search from "@/components/Search/Search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HistoricalDataT } from "@/lib/types";
import useWeatherStore from "@/store/store";
import { format, isValid, parse } from "date-fns";
import { az } from "date-fns/locale";
import React, { useEffect, useState } from "react";

type Props = {};

const HistoricalData = (props: Props) => {
  const [date, setDate] = useState<Date | null>(null);
  const [manualDate, setManualDate] = useState<string>(""); // For manual date input
  const [error,setError] = useState<string | null>(null)
  const searchCity = useWeatherStore((state) => state.coordinates);
  const [historicalData, setHistoricalData] = useState<HistoricalDataT>();

 const handleManualDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const inputDate = e.target.value;
   setManualDate(inputDate);
   setError(null); 
 };

   const handleManualDateSubmit = async () => {
     if (!manualDate) {
       setError("Tarixi daxil edin");
       return;
     }

     const parsedDate = parse(manualDate, "yyyy-MM-dd", new Date());
     if (isValid(parsedDate)) {
       setDate(parsedDate);
       setError(null); // Reset error if date is valid
       const newFormattedDate = format(parsedDate, "yyyy-MM-dd");

       try {
         const res = await getMeteo({
           lat: searchCity.lat,
           lon: searchCity.lon,
           date: newFormattedDate,
         });
         setHistoricalData(res);
       } catch (error) {
         console.error("Error fetching data:", error);
       }
     } else {
       setError("Daxil edilən tarix düzgün formatda deyil (nüm:2000-01-01)");
     }
   };
 useEffect(() => {
   if (searchCity.lat && searchCity.lon && date) {
     const newFormattedDate = format(date, "yyyy-MM-dd");

     const fetchData = async () => {
       try {
         const res = await getMeteo({
           lat: searchCity.lat,
           lon: searchCity.lon,
           date: newFormattedDate,
         });
         setHistoricalData(res);
       } catch (error) {
         console.error("Error fetching data:", error);
       }
     };

     fetchData();
   }
 }, [searchCity, date]);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() - 1);

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <h1 className="text-2xl">Keçmiş tarixlər üçün hava proqnozu</h1>
      <Search />

      <div className="flex items-center gap-4">
        <Input
          disabled={searchCity.lat === null || searchCity.lon === null}
          type="text"
          placeholder="2000-01-01"
          value={manualDate}
          onChange={handleManualDateChange}
          className="input input-bordered"
        />
        <Button onClick={handleManualDateSubmit} variant="outline">
          Axtarış et
        </Button>
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
