import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const API_KEY = process.env.API_KEY;
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
  const forwarded = request.headers.get("x-forwarded-for");
  const userIp = forwarded ? forwarded.split(/, /)[0] : request.ip;
  const testIp = "91.160.93.4";

  const ip = environment === "development" ? testIp : userIp;

  try {
    const geoRes = await fetch(`http://ip-api.com/json/${ip}`, {
      cache: "no-store",
    });
    const geoData = await geoRes.json();

    if (geoData.status !== "success") {
      throw new Error("Failed to retrieve geolocation data");
    }

    const lat = geoData.lat;
    const lon = geoData.lon;

    const url = ` http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=1&aqi=yes&alerts=no;`;

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
  } catch (error: any) {
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

    return new NextResponse(JSON.stringify({ error: error.message }), {
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
