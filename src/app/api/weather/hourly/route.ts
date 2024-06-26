import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const API_KEY = process.env.API_KEY;

  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
  const forwarded = request.headers.get("x-forwarded-for");
  const userIp = forwarded ? forwarded.split(/, /)[0] : request.ip;
  const testIp = "103.167.234.0";
  const ip = environment === "development" ? testIp : userIp;

  try {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${ip}&days=1&aqi=yes&alerts=no`;
    const res = await fetch(url);
    const data = await res.json();

    const headers = {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      "Surrogate-Control": "no-store",
    };

    return new NextResponse(JSON.stringify(data), { status: 200, headers });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      },
    });
  }
}
