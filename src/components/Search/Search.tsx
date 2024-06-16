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
  const [value, setValue] = useState("");

  const setCoordinates = useWeatherStore((state) => state.setCoordinates);

  const cityArray = Object.entries(locationNames)
    .slice(1)
    .map(([key, value]) => ({
      name: key,
      coordinates: value,
    }));

  const handleSelect = (cityName: string, cityCoordinates: Coordinates) => {
    setValue(cityName);
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
          className="w-[200px] justify-between"
        >
          {value
            ? cityArray.find((city) => city.name === value)?.name
            : "Şəhər seçin..."}
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
                  onSelect={() => handleSelect(city.name, city.coordinates)}
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
