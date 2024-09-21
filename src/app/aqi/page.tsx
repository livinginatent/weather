import React from "react";
import { Metadata } from "next";
import AQIMain from "@/components/AirQuality/AQIMain";
import Head from "next/head";
export const metadata: Metadata = {
  title: "Havam.az | Hava Keyfiyyəti Proqnozu",
  description: "Hava Keyfiyyəti Proqnozu - Havam.az",
};
type Props = {};

const AqiPage = (props: Props) => {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://havam.az/aqi" />
      </Head>
      <main className="flex flex-col w-full justify-center items-center">
        <AQIMain />
      </main>
    </>
  );
};

export default AqiPage;
