"use client";
import { locationNames } from "@/lib/locationNames";
import React from "react";
import { Button } from "../ui/button";
import useWeatherStore from "@/store/store";
import { Coordinates } from "@/lib/types";
import { ScrollArea } from "@radix-ui/react-scroll-area";

type Props = {
  onSelect: () => void;
};

const cityArray = Object.entries(locationNames).map(([key, value]) => ({
  name: key,
  coordinates: value,
}));

const AllCities: React.FC<Props> = ({ onSelect }) => {
  const setCoordinates = useWeatherStore((state) => state.setCoordinates);
  const handleClick = (cityCoordinates: Coordinates) => {
    setCoordinates(cityCoordinates);
    onSelect();
  };

  return (
    
      <div className="grid  grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-2">
        {cityArray.map((city) => (
          <Button
            onClick={() => handleClick(city.coordinates)}
            className="bg-gray-300 text-black hover:bg-gray-200 w-full"
            key={city.name}
          >
            {city.name}
          </Button>
        ))}
      </div>
    
  );
};

export default AllCities;
