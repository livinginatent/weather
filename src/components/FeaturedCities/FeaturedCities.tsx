"use client";
import React from "react";
import { Button } from "../ui/button";
import useWeatherStore from "@/store/store";
import { Coordinates } from "@/lib/types";

type Props = {};
const cities = {
  Bakı: { lat: 40.4093, lon: 49.8671 },
  Sumqayıt: { lat: 40.5914, lon: 49.6304 },
  Gəncə: { lat: 40.6828, lon: 46.3606 },
  Naxçıvan: { lat: 39.209, lon: 45.412 },
  Şamaxı: { lat: 40.6308, lon: 48.6416 },
  Xankəndi: { lat: 39.8265, lon: 46.7656 },
};
const cityArray = Object.entries(cities).map(([key, value]) => ({
  name: key,
  coordinates: value,
}));

const FeaturedCities = (props: Props) => {
  const setCoordinates = useWeatherStore((state) => state.setCoordinates);
  const handleClick = (cityCoordinates: Coordinates) => {
    setCoordinates(cityCoordinates);
  };
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 self-center grid-rows-3 m-4 ">
        {cityArray.map((city) => (
          <Button
            onClick={() => handleClick(city.coordinates)}
            className="bg-gray-300 text-black  hover:bg-gray-200"
            key={city.name}
          >
            {city.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCities;
