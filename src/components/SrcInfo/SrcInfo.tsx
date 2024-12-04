import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const SrcInfo = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <h3>Hava Proqnozu Məlumatları Haradan Gəlir?</h3>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <p>
          Saytımızda təqdim olunan hava proqnozu məlumatları etibarlı bir API
          vasitəsilə əldə edilir. Bu, sizə dəqiq və yenilənmiş hava
          məlumatlarını çatdırmağa imkan verir. Hər zaman ən etibarlı proqnozlar
          üçün bizə güvənə bilərsiniz!
        </p>
      </PopoverContent>
    </Popover>
  );
};
