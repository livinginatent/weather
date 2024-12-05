import AllCities from "@/components/AllCities/AllCities";
import CitySelector from "@/components/CitySelector/CitySelector";
import MainDetails from "@/components/MainDetails/MainDetails";
import SideDetails from "@/components/SideDetails/SideDetails";
import type { Metadata } from "next";
import Head from "next/head";
export const metadata: Metadata = {
  title: "Bakı Hava Proqnozu | Hava Proqnozu",
  description:
    "Bakı və digər şəhərlərin hava proqnozu Havam.az ilə qarşınızda. Günlük, həftəlik hava proqnozu. Bakıda hava.",
};
export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://havam.az",
    name: "Havam.az",
    description: "Havam.az - Hava proqnozu və keyfiyyəti haqqında məlumatlar.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://havam.az/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://havam.az",
    },
    sitelinksSearchBox: {
      "@type": "SearchAction",
      target: "https://havam.az/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    about: {
      "@type": "Thing",
      name: "Hava Proqnozu və Keyfiyyəti",
    },
    relatedLink: [
      {
        "@type": "WebPage",
        name: "Hava Keyfiyyəti",
        url: "https://havam.az/aqi",
      },
      {
        "@type": "WebPage",
        name: "Aylıq Hava Proqnozu",
        url: "https://havam.az/monthly",
      },
    ],
  };
  return (
    <>
      <Head>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Head>
      <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row custom-height-903">
        <SideDetails />
        <MainDetails />
      </div>
    </>
  );
}
