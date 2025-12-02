"use client";
import React from "react";
import { Button } from "../ui/button";
import { Coordinates } from "@/lib/types";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

type Props = {};
const cities = {
  Bakı: { lat: 40.4093, lon: 49.8671 },
  Sumqayıt: { lat: 40.5914, lon: 49.6304 },
  Gəncə: { lat: 40.6828, lon: 46.3606 },
  Naxçıvan: { lat: 39.209, lon: 45.412 },
  Şamaxı: { lat: 40.6308, lon: 48.6416 },
  Xankəndi: { lat: 39.8265, lon: 46.7656 },
  Lənkəran: { lat: 38.7528, lon: 48.85 },
  Masallı: { lat: 39.0358, lon: 48.6556 },
  Cəlilabad: { lat: 39.20372720746327, lon: 48.508631480318584 },
  Şəmkir: { lat: 40.8294, lon: 46.0181 },
  Şəki: { lat: 41.1919, lon: 47.1706 },
  Xaçmaz: { lat: 41.4628, lon: 48.8042 },
};
const cityArray = Object.entries(cities).map(([key, value]) => ({
  name: key,
  coordinates: value,
}));

const FeaturedCities = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const handleClick = (cityCoordinates: Coordinates) => {
    if (cityCoordinates.lat != null && cityCoordinates.lon != null) {
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
        // On main page, preserve the current view parameter
        const currentView = searchParams.get("view") || "hourly";
        router.push(
          `/?lat=${cityCoordinates.lat}&lon=${cityCoordinates.lon}&view=${currentView}`
        );
      }
    }
  };
  return (
    <div>
      <div className="grid  grid-cols-2 gap-2 self-center grid-rows-3  ">
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
