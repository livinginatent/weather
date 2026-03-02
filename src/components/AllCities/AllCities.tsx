"use client";
import { locationNames } from "@/lib/locationNames";
import React from "react";
import { Button } from "../ui/button";
import { Coordinates } from "@/lib/types";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import useWeatherStore from "@/store/store";

type Props = {
  onSelect: () => void;
};

const cityArray = Object.entries(locationNames).map(([key, value]) => ({
  name: key,
  coordinates: value,
}));

const AllCities: React.FC<Props> = ({ onSelect }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const setCoordinates = useWeatherStore((state) => state.setCoordinates);

  const handleClick = (cityCoordinates: Coordinates) => {
    if (cityCoordinates.lat == null || cityCoordinates.lon == null) {
      return;
    }

    // Always update global coordinates (used by PrayerTimes and others)
    setCoordinates({
      lat: cityCoordinates.lat,
      lon: cityCoordinates.lon,
    });

    // On namaz page, just update coordinates and stay on the same page
    if (pathname === "/namaz") {
      onSelect();
      return;
    }

    // If on /weekly or /monthly page, navigate to that page with coordinates
    if (pathname === "/weekly") {
      router.push(
        `/weekly?lat=${cityCoordinates.lat}&lon=${cityCoordinates.lon}`
      );
    } else if (pathname === "/monthly") {
      router.push(
        `/monthly?lat=${cityCoordinates.lat}&lon=${cityCoordinates.lon}`
      );
    } else {
      // Default: stay on current path and update query params
      const basePath = pathname || "/";
      const currentView = searchParams.get("view") || "hourly";
      const viewSuffix =
        basePath === "/" ? `&view=${encodeURIComponent(currentView)}` : "";

      router.push(
        `${basePath}?lat=${cityCoordinates.lat}&lon=${cityCoordinates.lon}${viewSuffix}`
      );
    }

    onSelect();
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-2">
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
