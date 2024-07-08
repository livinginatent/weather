import { CalendarDays } from "lucide-react";
import { RiInformation2Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
interface HoverInfoProps {
  title: string;
  info: string;
}
export const HoverInfo = ({title,info}:HoverInfoProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">
          <RiInformation2Line />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-full p-0">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">{info}</p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
