import React from "react";
import { Metadata } from "next";
import AQIMain from "@/components/AirQuality/AQIMain";
export const metadata: Metadata = {
  title: "Havam.az | Hava Proqnozu - Hava Keyfiyyəti | Bakı Hava Proqnozu",
  description:
    "Detallı hava keyfiyyəti proqnozu üçün Havam.az-a qoşulun. PM2.5, PM10 və digər çirkləndiricilər barədə dəqiq məlumat alın.",
  /*   alternates: {
    canonical: "https://havam.az/aqi",
  }, */
};
type Props = {};

const AqiPage = (props: Props) => {
  return <AQIMain />;
};

export default AqiPage;
