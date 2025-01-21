import { Coordinates } from "@/lib/types";

export async function getPrayer(
  coords: Coordinates,
  options?: {
    date?: string;
    calculationMethod?: string;
  }
) {
  if (!coords?.lat || !coords?.lon) {
    throw new Error("Latitude (lat) and longitude (lon) must be defined.");
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Construct the query string with lat and lon
  const params = new URLSearchParams();
  params.append("lat", String(coords.lat));
  params.append("lon", String(coords.lon));

  if (options?.date) params.append("date", options.date);
  if (options?.calculationMethod) {
    params.append("calculationMethod", options.calculationMethod);
  }

  const url = `${baseUrl}/api/prayer?${params.toString()}`;

  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
