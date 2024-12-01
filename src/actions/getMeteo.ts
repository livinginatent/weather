import { Coordinates, HistoryData } from "@/lib/types";

export const getMeteo = async ({ lat, lon, date }: HistoryData) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const data = await fetch(
    `${baseUrl}/api/weather/meteo?lat=${lat}&lon=${lon}&date=${date}`
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  const res = await data.json();
  return res;
};
