import { NextResponse } from "next/server";

// Cache for 5 minutes on edge
export const revalidate = 300;

export async function GET(request: Request) {
  const API_KEY = process.env.API_KEY;
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=2&aqi=yes`;

  try {
    // Cache external API call for 5 minutes
    const res = await fetch(url, { 
      next: { revalidate: 300 } 
    });
    const data = await res.json();
    
    const headers = {
      "Content-Type": "application/json",
      // Cache on edge for 5 minutes, allow stale for 10 minutes while revalidating
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
    return new Response(JSON.stringify(data), { status: 200, headers });
  } catch (error) {
    const headers = {
      "Content-Type": "application/json",
      // Cache errors for shorter time (2 minutes)
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
