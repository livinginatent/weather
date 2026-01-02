import { Coordinates } from "@/lib/types";

export const getWeekly = async ({ lat, lon }: Coordinates = {}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url =
    lat && lon
      ? `${baseUrl}/api/weather/weekly?lat=${lat}&lon=${lon}`
      : `${baseUrl}/api/weather/weekly`;

  // Cache for 5 minutes (300 seconds) - weather data updates frequently but not every second
  const data = await fetch(url, {
    next: { revalidate: 300 }, // Cache for 5 minutes
  });

  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }

  const res = await data.json();
  return res;
};
