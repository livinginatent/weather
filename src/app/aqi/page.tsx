import React from "react";
import { Metadata } from "next";
import AQIMain from "@/components/AirQuality/AQIMain";
export const metadata: Metadata = {
  title: "Havam.az | Hava Keyfiyyəti Proqnozu",
  description: "Hava Keyfiyyəti Proqnozu - Havam.az",
};
type Props = {};

const AqiPage = (props: Props) => {
  return (
    <main className="flex flex-col w-full justify-center items-center">
      <AQIMain />
    </main>
  );
};

export default AqiPage;
