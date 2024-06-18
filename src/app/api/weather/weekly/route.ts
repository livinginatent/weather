import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const API_KEY = process.env.API_KEY;

  // Extracting the IP address
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(/, /)[0] : request.ip;
  const testIp = "103.167.234.0";

  try {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${ip}&days=7&aqi=no&alerts=no`;
    const res = await fetch(url);
    const data = await res.json();

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}
