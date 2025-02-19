"use client";
import CitySelector from "@/components/CitySelector/CitySelector";
import WeeklyForecast from "@/components/MainDetails/WeeklyForecast/WeeklyForecast";
import Search from "@/components/Search/Search";
import { Button } from "@/components/ui/button";
import { locationNames } from "@/lib/locationNames";
import useWeatherStore from "@/store/store";
import { getLocationName } from "@/utils/getLocationNames";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  const searchCity = useWeatherStore((state) => state.coordinates);
  const city = getLocationName(searchCity.lat, searchCity.lon, locationNames);
  const router = useRouter();

  return (
    <section className="bg-[#e4f1ff] flex flex-col items-center w-full h-full">
      <div>
        <div className="flex flex-col items-center">
          <p className="text-2xl mt-4 self-center"></p>
          <h1 className="text-2xl mt-4 self-center">Həftəlik Hava Proqnozu</h1>
          <div className="flex justify-center gap-1 items-center">
            <p className="text-xl mt-4 self-center">{city} </p>
            <h2 className="text-xl mt-4 self-center"> üzrə Həftəlik Hava</h2>
          </div>
        </div>
        <div className="flex flex-col  items-center justify-center mt-4">
          <Search />
          <CitySelector />
        </div>
      </div>
      <p className="mt-2 text-center">
        Həftəlik Hava Proqnozu- hava şəraitindən xəbərdar olmaq üçün səhifəmizi
        izləyin! Sizə ən dəqiq və operativ hava proqnozunu təqdim edirik. Hər
        mövsümdə etibarlı məlumat üçün bizimlə qalın!
      </p>
      <div>

      <Button
        onClick={() => router.push("/")}
        className="bg-gray-300 text-black hover:bg-gray-200 w-full mt-2"
        >
        Günlük hava proqnozu
      </Button>
        </div>
      <WeeklyForecast />
    </section>
  );
};

export default Page;
