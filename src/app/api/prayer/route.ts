import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const API_KEY = process.env.PRAYER_API;
  const { searchParams } = new URL(request.url);

  // Get city from query parameters
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json(
      { error: "City parameter is required" },
      { status: 400 }
    );
  }

  try {
    const date = searchParams.get("date");
    const calculationMethod = searchParams.get("calculationMethod");

    // Construct the prayer URL with city
    let prayerUrl = `https://muslimsalat.com/${city}/weekly.json?key=${API_KEY}`;

    if (date) prayerUrl += `&date=${date}`;
    if (calculationMethod) prayerUrl += `&method=${calculationMethod}`;

    // Fetch data from the external API
    const res = await fetch(prayerUrl, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch data from external API");
    }

    const data = await res.json();

    // Set any headers you need
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // adjust if needed
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    return new NextResponse(JSON.stringify(data), { status: 200, headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
