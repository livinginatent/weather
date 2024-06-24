import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const API_KEY = process.env.API_KEY;
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  let url: string;
const testIp = "103.167.234.0";
  if (lat && lon) {
    url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7&aqi=no&alerts=no`;
  } else {
    // Extracting the IP address
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(/, /)[0]
      : request.ip || "103.167.234.0"; // Using testIp as a fallback
    url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${testIp}&days=7&aqi=no&alerts=no`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}