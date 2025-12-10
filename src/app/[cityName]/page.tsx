import { notFound } from "next/navigation";
import { cities, locationNames } from "@/lib/locationNames";
import { Droplets, Sunrise, Sunset, Wind } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getHourly } from "@/actions/getHourly";
import { getSearchWeekly } from "@/actions/getSearchWeekly";
import Image from "next/image";
import { getIcon } from "@/utils/getIcon";
import HourlyForecast from "@/components/MainDetails/HourlyForecast/HourlyForecast";
import WeeklyForecast from "@/components/MainDetails/WeeklyForecast/WeeklyForecast";
import { Metadata } from "next";

type Props = {
  params: {
    cityName: string;
  };
};

export function generateStaticParams() {
  return Object.keys(cities).map((city) => ({
    cityName: city.toLowerCase(),
  }));
}

const canonicalMap: Record<string, string> = {
  agarak: "qubadli",
  haftoni: "lankaran",
  mugan: "hajigabul",
  kedabeko: "gedebey",
  dilagarda: "beyleqan",
  nukha: "shaki",
  ismailly: "ismailli",
  shushi: "shusha",
  hadrut: "jabrayil",
  qaracala: "shirvan",
  qabaqcol: "balakan",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cityName } = params;
  const cityKey = Object.keys(cities).find(
    (key) => key.toLowerCase() === cityName.toLowerCase()
  );

  if (!cityKey) return { title: "Şəhər Tapılmadı | Havam.az" };

  const nativeCity = cities[cityKey];
  const canonicalCityKey = canonicalMap[cityKey.toLowerCase()] ?? cityKey;
  const canonicalUrl = `https://havam.az/city/${canonicalCityKey.toLowerCase()}`;

  // Dynamic dates help CTR (Click Through Rate) in search results
  const dateStr = new Date().toLocaleDateString("az-AZ", {
    month: "long",
    year: "numeric",
  });

  const title = `${nativeCity} Hava Proqnozu - ${dateStr} | Ən Dəqiq Hava Məlumatı`;
  const description = `${nativeCity} üçün saatlıq və həftəlik hava proqnozu. ${nativeCity} bu gün, sabah və 7 günlük hava durumu, temperatur, yağış və külək məlumatları Havam.az-da.`;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: canonicalUrl,
    },
    // Open Graph for Facebook/WhatsApp/LinkedIn sharing
    openGraph: {
      title: title,
      description: description,
      url: canonicalUrl,
      siteName: "Havam.az",
      locale: "az_AZ",
      type: "website",
      images: [
        {
          url: "https://havam.az/og-image.png",
          width: 1200,
          height: 630,
          alt: `${nativeCity} Hava Proqnozu`,
        },
      ],
    },
    // Twitter Card data
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
    },
    keywords: [
      `${nativeCity} hava proqnozu`,
      `${nativeCity} hava durumu`,
      "hava haqqinda",
      "azerbaycan hava",
      nativeCity,
    ],
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CityPage({ params }: Props) {
  const cityKey = Object.keys(cities).find(
    (key) => key.toLowerCase() === params.cityName.toLowerCase()
  );

  if (!cityKey) {
    notFound();
  }

  const nativeCity = cities[cityKey];
  const coords = locationNames[nativeCity];

  if (!coords) {
    console.error(`Coordinates for ${nativeCity} are missing!`);
    return notFound();
  }

  // Parallel data fetching for performance
  const [hourlyWeather, weeklyWeather] = await Promise.all([
    getHourly({ lat: coords.lat, lon: coords.lon }),
    getSearchWeekly({ lat: coords.lat, lon: coords.lon }),
  ]);

  const temp =
    hourlyWeather?.current?.temp_c != null
      ? `${Math.round(hourlyWeather.current.temp_c)}°C`
      : "";
  const feelsLike =
    hourlyWeather?.current?.feelslike_c != null
      ? `${Math.round(hourlyWeather.current.feelslike_c)}°C` // Fixed: was using temp_c
      : "";
  const windSpeed = Math.round(hourlyWeather.current.wind_kph);
  const humidity = hourlyWeather.current.humidity;
  const maxTemp = Math.round(
    weeklyWeather.forecast.forecastday[0].day.maxtemp_c
  );
  const minTemp = Math.round(
    weeklyWeather.forecast.forecastday[0].day.mintemp_c
  );
  const uvIndex = hourlyWeather.current.uv;
  const sunrise = hourlyWeather?.forecast?.forecastday[0]?.astro?.sunrise ?? "";
  const sunset = hourlyWeather?.forecast?.forecastday[0]?.astro?.sunset ?? "";
  const chanceOfRain =
    hourlyWeather?.forecast?.forecastday[0].day.daily_chance_of_rain;
  const localIconPath = getIcon(hourlyWeather.current.condition.icon);
  const conditionText = hourlyWeather.current.condition.text || "Hava durumu"; // API usually provides text

  // --- JSON-LD Structured Data Construction ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Ana Səhifə",
            item: "https://havam.az",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: `${nativeCity} Hava Proqnozu`,
            item: `https://havam.az/${cityKey}`,
          },
        ],
      },
      {
        "@type": "Place",
        name: nativeCity,
        address: {
          "@type": "PostalAddress",
          addressCountry: "AZ",
          addressLocality: nativeCity,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {nativeCity} Hava Proqnozu
        </h1>
        <p className="text-muted-foreground">
          {nativeCity} üçün ən son hava məlumatları:{" "}
          {new Date().toLocaleDateString("az-AZ", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <Card className="p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-start gap-4">
                <div>
                  <div className="text-5xl font-bold">{temp}</div>
                  <div className="text-muted-foreground">
                    Hiss olunan {feelsLike}
                  </div>
                </div>
                <div className="relative w-16 h-16">
                  <Image
                    alt={`${nativeCity} hava durumu: ${conditionText}`}
                    src={localIconPath}
                    fill
                    className="object-contain"
                    priority={true} // Priority loading for LCP improvement
                    sizes="(max-width: 768px) 64px, 64px"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4">
                <h2 className="text-lg font-bold m-0">Külək sürəti</h2>
                <div className="flex justify-start items-center gap-2">
                  <Wind className="h-5 w-5 text-muted-foreground" />
                  <span>{windSpeed} km/saat</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm text-muted-foreground mb-1">
                Gün ərzində temperatur
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500 font-medium">
                  Max: {maxTemp}°C
                </span>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-blue-500 font-medium">
                  Min: {minTemp}°C
                </span>
              </div>
              <p className="text-lg font-bold mt-4">
                Yağış ehtimalı:{" "}
                <span className="text-blue-600">{chanceOfRain}%</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="p-4 bg-muted/50">
              <div className="text-sm font-medium mb-2">UV İndeksi (Günəş)</div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{uvIndex}</div>
                <div
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    uvIndex <= 2
                      ? "bg-green-100 text-green-800"
                      : uvIndex <= 5
                        ? "bg-yellow-100 text-yellow-800"
                        : uvIndex <= 7
                          ? "bg-orange-100 text-orange-800"
                          : "bg-red-100 text-red-800"
                  }`}
                >
                  {uvIndex <= 2
                    ? "Aşağı"
                    : uvIndex <= 5
                      ? "Orta"
                      : uvIndex <= 7
                        ? "Yuxarı"
                        : "Təhlükəli"}
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-muted/50">
              <div className="text-sm font-medium mb-2">Rütubət</div>
              <div className="text-2xl font-bold">{humidity}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${humidity}%` }}
                ></div>
              </div>
            </Card>

            <Card className="p-4 bg-muted/50">
              <div className="text-sm font-medium mb-2">Gün doğumu</div>
              <div className="flex items-center gap-2">
                <Sunrise className="h-5 w-5 text-yellow-500" />
                <span className="text-xl font-medium">{sunrise}</span>
              </div>
            </Card>

            <Card className="p-4 bg-muted/50">
              <div className="text-sm font-medium mb-2">Gün batışı</div>
              <div className="flex items-center gap-2">
                <Sunset className="h-5 w-5 text-orange-500" />
                <span className="text-xl font-medium">{sunset}</span>
              </div>
            </Card>
          </div>
        </div>
      </Card>

      {/* SEO Content Section - Improved Readability */}
      <section className="bg-white/90 rounded-lg shadow-sm p-6 border border-gray-100">
        <h2 className="text-2xl text-center mb-4 font-bold text-gray-800">
          {nativeCity} Hava Durumu Haqqında Məlumat
        </h2>
        <article className="prose max-w-none text-center text-gray-600 leading-relaxed">
          <p>
            Siz hal-hazırda <strong>{nativeCity} hava proqnozu</strong>{" "}
            səhifəsindəsiniz. Burada siz {nativeCity} şəhəri üçün bu günlük,
            sabahkı və gələn həftə üçün (10 günlük) dəqiq hava məlumatlarını
            öyrənə bilərsiniz.
          </p>
          <p className="mt-2">
            Məlumatlarımız daima yenilənir və sizə külək sürəti, yağıntı
            ehtimalı, rütubət dərəcəsi və UV indeksi kimi vacib göstəriciləri
            təqdim edir.
          </p>
        </article>
      </section>

      <div className="mt-8 space-y-8">
        <section>
          <h3 className="text-2xl text-center font-bold mb-4">
            {nativeCity} Saatlıq Hava Proqnozu
          </h3>
          <HourlyForecast hourlyWeatherData={hourlyWeather} />
        </section>

        <section>
          <h3 className="text-2xl text-center font-bold mb-4">
            {nativeCity} Həftəlik (7 Günlük) Hava Proqnozu
          </h3>
          <WeeklyForecast lat={coords.lat} lon={coords.lon} />
        </section>
      </div>
    </div>
  );
}
