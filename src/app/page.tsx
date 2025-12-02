import MainDetails from "@/components/MainDetails/MainDetails";
import SideDetails from "@/components/SideDetails/SideDetails";
import WeatherContent from "@/components/WeatherContent/WeatherContent";
import type { Metadata } from "next";
import { getHourly } from "@/actions/getHourly";
import { getSearchCityHourly } from "@/actions/getSearchCityHourly";

export const metadata: Metadata = {
  title: "Hava Proqnozu | Saatlıq, Günlük Hava Proqnozu",
  description:
    "Bakı və Azərbaycan Hava proqnozu haqqında ən dəqiq məlumatlar burada! Dəqiq hava proqnozu, temperatur, külək sürəti",
};

type SearchParams = {
  lat?: string;
  lon?: string;
  view?: string;
};

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Bakı Hava Proqnozu",
        item: "https://havam.az/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Həftəlik Hava Proqnozu",
        item: "https://havam.az/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Aylıq Hava Proqnozu",
        item: "https://havam.az/monthly",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Hava Keyfiyyəti Proqnozu",
        item: "https://havam.az/aqi",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "İstehsalat Təqvimi 2025",
        item: "https://havam.az/istehsalat-teqvimi-2025",
      },
    ],
  };

  // Determine coordinates from search params or use default
  const lat = searchParams.lat ? parseFloat(searchParams.lat) : 40.4093;
  const lon = searchParams.lon ? parseFloat(searchParams.lon) : 49.8671;
  const isSearch = searchParams.lat != null && searchParams.lon != null;

  // Fetch weather data server-side
  let weatherData = null;
  try {
    weatherData = isSearch
      ? await getSearchCityHourly({ lat, lon })
      : await getHourly({ lat, lon });
  } catch (error) {
    console.error("Error fetching weather data", error);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row custom-height-903">
        <SideDetails weatherData={weatherData} />
        <MainDetails hourlyWeatherData={weatherData} />
      </div>
    </>
  );
}
