import { NextRequest, NextResponse } from "next/server";

// Remove the revalidate = 0 to allow caching
// export const revalidate = 0;

export async function GET(request: NextRequest) {
  const API_KEY = process.env.API_KEY;
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  try {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=2&aqi=yes&alerts=no`;

    // Enable caching for the external API call
    const res = await fetch(url, {
      next: { revalidate: 600 }, // Cache for 10 minutes
    });

    const data = await res.json();

    const headers = {
      "Content-Type": "application/json",
      // Cache for 10 minutes on edge, serve stale for 20 minutes while revalidating
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    return new NextResponse(JSON.stringify(data), { status: 200, headers });
  } catch (error) {
    const headers = {
      "Content-Type": "application/json",
      // Cache errors for 2 minutes (shorter than success)
      "Cache-Control": "public, s-maxage=120, stale-while-revalidate=240",
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
