import { locationNames, cities } from "@/lib/locationNames";
import { weatherCodes } from "@/lib/weatherCodes";
import { weatherIcons } from "@/lib/weatherIcons";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { days, months } from "@/lib/dateTranslations";
import Search from "@/components/Search/Search";

// Generate static params for all cities using the cities object keys
export async function generateStaticParams() {
  return Object.keys(cities).map((cityKey) => ({
    cityName: cityKey.toLowerCase(),
  }));
}

// Generate metadata dynamically based on city
export async function generateMetadata({
  params,
}: {
  params: { cityName: string };
}): Promise<Metadata> {
  const decodedCityName = decodeURIComponent(params.cityName);

  // Find the city key from the cities object
  const cityKey = Object.keys(cities).find(
    (key) => key.toLowerCase() === decodedCityName.toLowerCase()
  );

  if (!cityKey) {
    return {
      title: "Şəhər tapılmadı",
    };
  }

  // Get the Azerbaijani city name
  const cityName = cities[cityKey];

  return {
    title: `${cityName} 10 Günlük Hava Proqnozu | Dəqiq Hava Məlumatı`,
    description: `${cityName} üçün 10 günlük hava proqnozu. Maksimum və minimum temperatur, yağış ehtimalı, külək sürəti və digər hava məlumatları. Gündəlik hava durumu təfərrüatları.`,
    keywords: [
      `${cityName} hava proqnozu`,
      `${cityName} 10 günlük hava`,
      `${cityName} hava durumu`,
      `${cityName} hava`,
      "10 günlük hava proqnozu",
      "hava proqnozu azərbaycan",
      `${cityName} temperatur`,
      `${cityName} yağış`,
      "günlük hava proqnozu",
      "həftəlik hava",
    ],
    openGraph: {
      title: `${cityName} 10 Günlük Hava Proqnozu`,
      description: `${cityName} üçün 10 günlük hava proqnozu. Dəqiq temperatur, yağış və külək məlumatları.`,
      url: `https://havam.az/${cityKey.toLowerCase()}/10-gunluk-hava-proqnozu`,
      siteName: "Hava Məlumatı",
      locale: "az_AZ",
      type: "website",
      images: [
        {
          url: "https://havam.az/og-image.png",
          width: 1200,
          height: 630,
          alt: `${cityName} 10 Günlük Hava Proqnozu`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${cityName} 10 Günlük Hava Proqnozu`,
      description: `${cityName} üçün 10 günlük hava proqnozu. Dəqiq temperatur, yağış və külək məlumatları.`,
      images: ["https://havam.az/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `https://havam.az/${cityKey.toLowerCase()}/10-gunluk-hava-proqnozu`,
    },
  };
}

// Fetch weather data
async function getWeatherData(lat: number, lon: number) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const response = await fetch(
    `${baseUrl}/api/weather/monthly?lat=${lat}&lon=${lon}`,
    {
      next: { revalidate: 600 }, // Cache for 10 minutes
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json();
}

// Format date in Azerbaijani
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const day = date.getDate();
  const monthName = date.toLocaleDateString("en-US", { month: "long" });

  return {
    dayName: days[dayName] || dayName,
    day,
    monthName: months[monthName] || monthName,
    fullDate: `${day} ${months[monthName] || monthName}`,
  };
}

// Check if it's day or night (simple check, defaults to day)
function isDayTime() {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 20;
}

export default async function TenDayForecastPage({
  params,
}: {
  params: { cityName: string };
}) {
  const decodedCityName = decodeURIComponent(params.cityName);

  // Find the city key from the cities object
  const cityKey = Object.keys(cities).find(
    (key) => key.toLowerCase() === decodedCityName.toLowerCase()
  );

  if (!cityKey) {
    notFound();
  }

  // Get the Azerbaijani city name
  const cityNameAz = cities[cityKey];

  // Get coordinates using the Azerbaijani city name
  const coordinates = locationNames[cityNameAz];
  if (!coordinates || !coordinates.lat || !coordinates.lon) {
    notFound();
  }

  const weatherData = await getWeatherData(coordinates.lat, coordinates.lon);
  const isDay = isDayTime();

  // Take only first 10 days
  const forecastDays = weatherData.daily.time.slice(0, 10);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${cityNameAz} 10 Günlük Hava Proqnozu`,
    description: `${cityNameAz} üçün 10 günlük hava proqnozu. Temperatur, yağış və külək məlumatları.`,
    url: `https://havam.az/${cityKey.toLowerCase()}/10-gunluk-hava-proqnozu`,
    inLanguage: "az-AZ",
    mainEntity: {
      "@type": "WeatherForecast",
      name: `${cityNameAz} 10 Günlük Hava Proqnozu`,
      location: {
        "@type": "Place",
        name: cityNameAz,
        geo: {
          "@type": "GeoCoordinates",
          latitude: coordinates.lat,
          longitude: coordinates.lon,
        },
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-6 px-4 shadow-lg">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/"
              className="inline-block text-sm mb-3 hover:underline opacity-90"
            >
              ← Ana səhifə
            </Link>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              {cityNameAz} 10 günlük hava proqnozu
            </h1>
            <p className="text-sm sm:text-base opacity-90">
              Dəqiq və etibarlı 10 günlük hava məlumatı - gündəlik yenilənir
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-6xl mx-auto px-4 pt-6">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Başqa şəhər seçin:
              </span>
              <div className="w-full sm:w-auto">
                <Search />
              </div>
            </div>
          </div>
        </div>

        {/* Forecast Cards */}
        <div className="max-w-6xl mx-auto px-4 pb-6 sm:pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {forecastDays.map((dateStr: string, index: number) => {
              const formattedDate = formatDate(dateStr);
              const weatherCode = weatherData.daily.weatherCode[index];
              const tempMax = Math.round(
                weatherData.daily.temperature2mMax[index]
              );
              const tempMin = Math.round(
                weatherData.daily.temperature2mMin[index]
              );
              const rain = weatherData.daily.rainSum[index] || 0;
              const snow = weatherData.daily.snowfallSum[index] || 0;
              const wind = Math.round(weatherData.daily.windSpeed10mMax[index]);
              const weatherDescription =
                weatherCodes[weatherCode] || "Açıq səma";
              const weatherIcon = weatherIcons[weatherCode] || "☀️";

              // Get weather icon image based on code
              const dayNight = isDay ? "day" : "night";
              // Map open-meteo codes to weatherapi codes (comprehensive)
              const iconCodeMap: { [key: number]: string } = {
                0: "113", // Clear sky
                1: "116", // Mainly clear
                2: "119", // Partly cloudy
                3: "122", // Overcast
                45: "248", // Fog
                48: "248", // Depositing rime fog
                51: "293", // Drizzle: Light
                53: "296", // Drizzle: Moderate
                55: "299", // Drizzle: Dense
                56: "311", // Freezing Drizzle: Light
                57: "314", // Freezing Drizzle: Dense
                61: "302", // Rain: Slight
                63: "305", // Rain: Moderate
                65: "308", // Rain: Heavy
                66: "311", // Freezing Rain: Light
                67: "314", // Freezing Rain: Heavy
                71: "326", // Snow: Slight
                73: "332", // Snow: Moderate
                75: "338", // Snow: Heavy
                77: "368", // Snow grains
                80: "353", // Rain showers: Slight
                81: "356", // Rain showers: Moderate
                82: "359", // Rain showers: Violent
                85: "326", // Snow showers: Slight
                86: "338", // Snow showers: Heavy
                95: "386", // Thunderstorm: Slight or moderate
                96: "392", // Thunderstorm with slight hail
                99: "395", // Thunderstorm with heavy hail
              };
              const iconCode = iconCodeMap[weatherCode] || "113";

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5"
                >
                  {/* Date Header */}
                  <div className="border-b border-gray-200 pb-3 mb-4">
                    <p className="text-lg font-semibold text-gray-800">
                      {index === 0 ? "Bu gün" : formattedDate.dayName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formattedDate.fullDate}
                    </p>
                  </div>

                  {/* Weather Icon and Description */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">
                        {weatherDescription}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-blue-600">
                          {tempMax}°
                        </span>
                        <span className="text-xl text-gray-400">
                          {tempMin}°
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Image
                        src={`/assets/${dayNight}/${iconCode}.png`}
                        alt={weatherDescription}
                        width={64}
                        height={64}
                        className="w-16 h-16"
                      />
                    </div>
                  </div>

                  {/* Weather Details */}
                  <div className="space-y-2 text-sm">
                    {rain > 0 && (
                      <div className="flex items-center justify-between text-gray-700">
                        <span className="flex items-center gap-2">
                          <span>🌧️</span>
                          <span>Yağış</span>
                        </span>
                        <span className="font-medium">
                          {rain.toFixed(1)} mm
                        </span>
                      </div>
                    )}
                    {snow > 0 && (
                      <div className="flex items-center justify-between text-gray-700">
                        <span className="flex items-center gap-2">
                          <span>❄️</span>
                          <span>Qar</span>
                        </span>
                        <span className="font-medium">
                          {snow.toFixed(1)} sm
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-gray-700">
                      <span className="flex items-center gap-2">
                        <span>💨</span>
                        <span>Külək</span>
                      </span>
                      <span className="font-medium">{wind} km/saat</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Information */}
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              10 Günlük Hava Proqnozu Haqqında
            </h2>
            <div className="prose prose-sm max-w-none text-gray-700">
              <p className="mb-3">
                {cityNameAz} üçün 10 günlük hava proqnozu sizə gələcək günlərdə
                gözlənilən hava şəraiti haqqında ətraflı məlumat verir. Hava
                proqnozu daima yenilənir və ən dəqiq məlumatları təqdim edir.
              </p>
              <p className="mb-3">
                <strong>Proqnozda nələr var:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Maksimum və minimum temperatur dəyərləri</li>
                <li>Yağış və qar miqdarı proqnozu</li>
                <li>Külək sürəti göstəriciləri</li>
                <li>Hava şəraiti təsviri (açıq, buludlu, yağışlı və s.)</li>
              </ul>
            </div>
          </div>

          {/* Other Cities */}
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Digər Şəhərlər
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {Object.keys(cities)
                .filter((key) => key.toLowerCase() !== cityKey.toLowerCase())
                .slice(0, 12)
                .map((key) => (
                  <Link
                    key={key}
                    href={`/${key.toLowerCase()}/10-gunluk-hava-proqnozu`}
                    className="text-center py-2 px-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 text-sm font-medium text-blue-700"
                  >
                    {cities[key]}
                  </Link>
                ))}
            </div>
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="text-sm font-medium text-gray-700">
                Digər şəhərlərə bax:
              </span>
              <div className="w-full sm:w-auto">
                <Search />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
