import { NextRequest, NextResponse } from "next/server";

// Add this line to prevent caching
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const API_KEY = process.env.API_KEY;
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  try {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=2&aqi=yes&alerts=no`;
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    const headers = {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      "Surrogate-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    return new NextResponse(JSON.stringify(data), { status: 200, headers });
  } catch (error) {
    const headers = {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=120",
      Pragma: "no-cache",
      Expires: "0",
      "Surrogate-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    return new NextResponse(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers,
    });
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
