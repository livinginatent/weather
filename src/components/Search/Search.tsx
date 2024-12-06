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
import { locationNames } from "@/lib/locationNames";
import { ScrollArea } from "../ui/scroll-area";
import useWeatherStore from "@/store/store";
import { Coordinates } from "@/lib/types";

const Search = () => {
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const setCoordinates = useWeatherStore((state) => state.setCoordinates);
  const coordinates = useWeatherStore((state) => state.coordinates);

  const cityArray = Object.entries(locationNames).map(([key, value]) => ({
    name: key,
    coordinates: value,
  }));

  useEffect(() => {
    const currentCity = getLocationName(coordinates.lat, coordinates.lon);
    setSelectedCity(currentCity);
  }, [coordinates]);

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
    setCoordinates(cityCoordinates);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-sm"
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
