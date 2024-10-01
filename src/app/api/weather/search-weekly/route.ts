import { NextResponse } from "next/server";
export const revalidate = 0;

export async function GET(request: Request) {
  const API_KEY = process.env.API_KEY;
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7&aqi=yes&alerts=no`;

  try {
    const headers = {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      "Surrogate-Control": "no-store",
      "Access-Control-Allow-Origin": "*", // Allow all origins
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // Allow specific methods
      "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allow specific headers
    };
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200, headers });
  } catch (error) {
    const headers = {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      "Surrogate-Control": "no-store",
      "Access-Control-Allow-Origin": "*", // Allow all origins
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // Allow specific methods
      "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allow specific headers
    };

    return new NextResponse(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers,
    });
  }
}
