import { Coordinates } from "@/lib/types";
import useWeatherStore from "@/store/store";

export const getSearchCityHourly = async ({ lat, lon }: Coordinates) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const data = await fetch(
    `${baseUrl}/api/weather/hourly?lat=${lat}&lon=${lon}`
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  const res = await data.json();
  return res;
};
