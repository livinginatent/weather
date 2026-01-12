import PrayerTimes from "@/components/PrayerTimes/PrayerTimes";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Namaz Vaxti - Dəqiq Namaz Vaxtları Azərbaycan | Günlük Namaz Saatları",
  description:
    "Namaz vaxti Azərbaycan üzrə - Bakı, Gəncə, Sumqayıt və digər şəhərlərdə dəqiq namaz vaxtları. Sübh, günorta, əsr, məğrib və işa namazı saatları. Aylıq namaz təqvimi və namaz vaxtları cədvəli.",
  keywords: [
    "namaz vaxti",
    "namaz vaxtlari",
    "namaz vaxtları",
    "namaz vaxti baku",
    "namaz vaxti bakı",
    "namaz saatları",
    "namaz təqvimi",
    "namaz vaxtları azərbaycan",
    "günlük namaz saatları",
    "sübh namazı",
    "günorta namazı",
    "əsr namazı",
    "məğrib namazı",
    "işa namazı",
    "aylıq namaz təqvimi",
  ],
  authors: [{ name: "Hava Məlumatı" }],
  creator: "Hava Məlumatı",
  publisher: "Hava Məlumatı",
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "Namaz Vaxti - Dəqiq Namaz Vaxtları Azərbaycan",
    description:
      "Azərbaycanın bütün şəhər və rayonları üzrə dəqiq namaz vaxti məlumatları. Günlük və aylıq namaz təqvimi. Sübh, günorta, əsr, məğrib və işa namazı saatları.",
    url: "https://havam.az/namaz",
    siteName: "Hava Məlumatı",
    locale: "az_AZ",
    type: "website",
    images: [
      {
        url: "https://havam.az/og-image.png",
        width: 1200,
        height: 630,
        alt: "Namaz Vaxti - Azərbaycan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Namaz Vaxti - Dəqiq Namaz Vaxtları Azərbaycan",
    description:
      "Azərbaycanın bütün şəhər və rayonları üzrə dəqiq namaz vaxti məlumatları. Günlük və aylıq namaz təqvimi.",
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
    canonical: "https://havam.az/namaz",
  },
};

type Props = {};

const page = (props: Props) => {
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Namaz Vaxti Azərbaycan",
    description:
      "Azərbaycanın bütün şəhər və rayonları üzrə dəqiq namaz vaxti məlumatları",
    url: "https://havam.az/namaz",
    inLanguage: "az-AZ",
    provider: {
      "@type": "Organization",
      name: "Hava Məlumatı",
      url: "https://havam.az",
    },
    about: {
      "@type": "Thing",
      name: "Namaz Vaxtları",
      description: "İslam namaz vaxtları və təqvimi",
    },
    mainEntity: {
      "@type": "Schedule",
      name: "Günlük Namaz Vaxtları",
      description:
        "Azərbaycan üzrə günlük namaz vaxtları - sübh, günorta, əsr, məğrib və işa namazı saatları",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PrayerTimes />
    </>
  );
};

export default page;
