import { NextRequest, NextResponse } from "next/server";
import { fetchWeatherApi } from "openmeteo";
export async function GET(request: NextRequest) {
  const params = {
    latitude: 52.52,
    longitude: 13.41,
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "is_day",
      "precipitation",
      "rain",
      "showers",
      "weather_code",
      "wind_speed_10m",
    ],
    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "rain",
      "showers",
      "weather_code",
      "surface_pressure",
      "visibility",
      "wind_speed_10m",
      "wind_direction_10m",
      "uv_index",
    ],
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
      "daylight_duration",
      "sunshine_duration",
      "uv_index_max",
      "precipitation_sum",
      "rain_sum",
      "wind_speed_10m_max",
    ],
    timezone: "Europe/Moscow",
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  try {
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const latitude = response.latitude();
    const longitude = response.longitude();

    const current = response.current()!;
    const hourly = response.hourly()!;
    const daily = response.daily()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
      current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature2m: current.variables(0)!.value(),
        relativeHumidity2m: current.variables(1)!.value(),
        isDay: current.variables(2)!.value(),
        precipitation: current.variables(3)!.value(),
        rain: current.variables(4)!.value(),
        showers: current.variables(5)!.value(),
        weatherCode: current.variables(6)!.value(),
        windSpeed10m: current.variables(7)!.value(),
      },
      hourly: {
        time: range(
          Number(hourly.time()),
          Number(hourly.timeEnd()),
          hourly.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        temperature2m: hourly.variables(0)!.valuesArray()!,
        relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
        rain: hourly.variables(2)!.valuesArray()!,
        showers: hourly.variables(3)!.valuesArray()!,
        weatherCode: hourly.variables(4)!.valuesArray()!,
        surfacePressure: hourly.variables(5)!.valuesArray()!,
        visibility: hourly.variables(6)!.valuesArray()!,
        windSpeed10m: hourly.variables(7)!.valuesArray()!,
        windDirection10m: hourly.variables(8)!.valuesArray()!,
        uvIndex: hourly.variables(9)!.valuesArray()!,
      },
      daily: {
        time: range(
          Number(daily.time()),
          Number(daily.timeEnd()),
          daily.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        weatherCode: daily.variables(0)!.valuesArray()!,
        temperature2mMax: daily.variables(1)!.valuesArray()!,
        temperature2mMin: daily.variables(2)!.valuesArray()!,
        sunrise: daily.variables(3)!.valuesArray()!,
        sunset: daily.variables(4)!.valuesArray()!,
        daylightDuration: daily.variables(5)!.valuesArray()!,
        sunshineDuration: daily.variables(6)!.valuesArray()!,
        uvIndexMax: daily.variables(7)!.valuesArray()!,
        precipitationSum: daily.variables(8)!.valuesArray()!,
        rainSum: daily.variables(9)!.valuesArray()!,
        windSpeed10mMax: daily.variables(10)!.valuesArray()!,
      },
    };

    return NextResponse.json(weatherData);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
