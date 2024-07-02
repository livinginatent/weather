import React, { useState } from "react";
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

type Props = {};

const Search = (props: Props) => {
  const [open, setOpen] = useState(false);

  const setCoordinates = useWeatherStore((state) => state.setCoordinates);
  const setCity = useWeatherStore((state) => state.setCity);
  const coordinates = useWeatherStore((state) => state.coordinates);

  const cityArray = Object.entries(locationNames).map(([key, value]) => ({
    name: key,
    coordinates: value,
  }));
  const getLocationName = (lat: any, lon: any) => {
    // Loop through each location in the locationNames object
    for (const cityName in locationNames) {
      const location = locationNames[cityName];

      // Check if the provided lat and lon match the location's lat and lon
      if (location.lat === lat && location.lon === lon) {
        setCity(cityName)
        return cityName;
      }
    }

    // If no match is found, return null
    return null;
  };
  const handleSelect = (cityCoordinates: Coordinates) => {
    setCoordinates(cityCoordinates);
    setOpen(false);
    
  };
  const currentCity = getLocationName(coordinates.lat, coordinates.lon);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {currentCity ? currentCity : "Şəhər seçin"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Şəhər axtarın..." />
          <CommandEmpty>No city found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-24">
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
