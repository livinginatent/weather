"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { CiSearch } from "react-icons/ci";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { locationNames, cities } from "@/lib/locationNames";
import { ScrollArea } from "../ui/scroll-area";
import { Coordinates } from "@/lib/types";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const Search = () => {
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const cityArray = Object.entries(locationNames).map(([key, value]) => ({
    name: key,
    coordinates: value,
  }));

  useEffect(() => {
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    if (lat && lon) {
      const currentCity = getLocationName(parseFloat(lat), parseFloat(lon));
      setSelectedCity(currentCity);
    } else {
      setSelectedCity(null);
    }
  }, [searchParams]);

  const getLocationName = (lat: any, lon: any) => {
    for (const cityName in locationNames) {
      const location = locationNames[cityName];
      if (location.lat === lat && location.lon === lon) {
        return cityName;
      }
    }
    return null;
  };

  const handleSelect = (cityCoordinates: Coordinates) => {
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
      } else if (pathname.includes("/10-gunluk-hava-proqnozu")) {
        // If on 10-day forecast page, navigate to the selected city's 10-day forecast
        const selectedCityName = getLocationName(
          cityCoordinates.lat,
          cityCoordinates.lon
        );
        if (selectedCityName) {
          // Find the URL key for this city from cities object
          const cityKey = Object.keys(cities).find(
            (key) => cities[key] === selectedCityName
          );
          if (cityKey) {
            router.push(`/${cityKey.toLowerCase()}/10-gunluk-hava-proqnozu`);
          }
        }
      } else {
        // On main page, preserve the current view parameter
        const currentView = searchParams.get("view") || "hourly";
        router.push(
          `/?lat=${cityCoordinates.lat}&lon=${cityCoordinates.lon}&view=${currentView}`
        );
      }
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full md:w-[200px] lg:w-[200px] justify-between text-sm"
        >
          {selectedCity ? selectedCity : "Şəhər axtarın"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Şəhər axtarın..." />
          <CommandEmpty>Şəhər tapılmadı.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-36">
              {cityArray.map((city) => (
                <CommandItem
                  key={city.name}
                  value={city.name}
                  onSelect={() => handleSelect(city.coordinates)}
                >
                  {city.name}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Search;
