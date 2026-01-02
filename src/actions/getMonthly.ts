import { Coordinates, HistoryData } from "@/lib/types";

export const getMonthly = async ({ lat, lon }: Coordinates) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const data = await fetch(
    `${baseUrl}/api/weather/monthly?lat=${lat}&lon=${lon}`,
    {
      next: { revalidate: 600 }, // Cache for 10 minutes - monthly forecasts update less frequently
    }
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  const res = await data.json();
  return res;
};
