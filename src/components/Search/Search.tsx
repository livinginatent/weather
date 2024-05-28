import React from "react";
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

type Props = {};

const Search = (props: Props) => {
  const searchIcon = <CiSearch size={22} />;

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const cityArray = Object.entries(locationNames).slice(1).map(([key, value]) => ({
    value: key,
    label: value,
  }));

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
            ? cityArray.find((city) => city.value === value)?.label
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
                  key={city.value}
                  value={city.label}
                  onSelect={() => {
                    setValue(city.value);
                    setOpen(false);
                  }}
                >
                  {city.label}
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
