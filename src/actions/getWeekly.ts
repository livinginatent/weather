import { Coordinates } from "@/lib/types";

export const getWeekly = async ({ lat, lon }: Coordinates = {}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url =
    lat && lon
      ? `${baseUrl}/api/weather/weekly?lat=${lat}&lon=${lon}`
      : `${baseUrl}/api/weather/weekly`;

  // Disable caching by adding cache: "no-store"
  const data = await fetch(url, {
    cache: "no-store", // Ensures the response is not cached
  });

  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }

  const res = await data.json();
  return res;
};
