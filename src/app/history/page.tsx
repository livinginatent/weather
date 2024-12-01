"use client";

import { getMeteo } from "@/actions/getMeteo";
import Search from "@/components/Search/Search";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HistoricalDataT } from "@/lib/types";
import { cn } from "@/lib/utils";
import useWeatherStore from "@/store/store";
import { format } from "date-fns";
import { az } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";

type Props = {};

const HistoricalData = (props: Props) => {
  const [date, setDate] = React.useState<Date | null>(null);
  const searchCity = useWeatherStore((state) => state.coordinates);
  const [historicalData, setHistoricalData] = useState<HistoricalDataT>();

  const handleSelect = async (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      const newFormattedDate = format(selectedDate, "yyyy-MM-dd");

      try {
        const res = await getMeteo({
          lat: searchCity.lat,
          lon: searchCity.lon,
          date: newFormattedDate,
        });
        console.log(res);
        setHistoricalData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setDate(null);
    }
  };
   const maxDate = new Date();
   maxDate.setDate(maxDate.getDate() - 1);
  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <h1 className="text-2xl">Keçmiş tarixlər üçün hava proqnozu</h1>
      <Search />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2" />
            {date ? (
              format(date, "dd-MM-yyyy", { locale: az })
            ) : (
              <span>Tarix seçin</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            disabled={{ after: maxDate }}
            mode="single"
            onSelect={handleSelect}
            initialFocus
            locale={az}
          />
        </PopoverContent>
      </Popover>
      <Button className="w-[280px]">Seç</Button>
      <p>{historicalData?.daily.apparentTemperatureMax[0]}</p>
    </div>
  );
};

export default HistoricalData;
