import Banner from "@/components/AdBanner/Banner";
import MainDetails from "@/components/MainDetails/MainDetails";
import SideDetails from "@/components/SideDetails/SideDetails";
import WeatherContent from "@/components/WeatherContent/WeatherContent";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Bakı Hava Proqnozu | Azərbaycan Hava Proqnozu",
  description:
    "Bakı və Azərbaycan Hava proqnozu haqqında ən dəqiq məlumatlar burada! Dəqiq hava proqnozu, temperatur, külək sürəti",
};
export default function Home() {
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row custom-height-903">
        <SideDetails />
        <MainDetails />
        
      </div>
    </>
  );
}
