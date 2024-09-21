import React from "react";
import { Metadata } from "next";
import AQIMain from "@/components/AirQuality/AQIMain";
export const metadata: Metadata = {
  title: "Havam.az | Hava Proqnozu - Hava Keyfiyyəti",
  description: "Detallı hava keyfiyyəti pronozu",
  alternates: {
    canonical: "https://havam.az/aqi",
  },
};
type Props = {};

const AqiPage = (props: Props) => {
  return (
    <>
      <main className="flex flex-col w-full justify-center items-center">
        <AQIMain />
      </main>
    </>
  );
};

export default AqiPage;
