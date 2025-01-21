import PrayerTimes from "@/components/PrayerTimes/PrayerTimes";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Namaz Vaxtları - Namaz Təqvimi | Aylıq Namaz təqvimi - Şəhər və Rayonlar",
  description:
    "Şəhər və rayonlar üzrə namaz təqvimi. Namaz vaxtları cədvəli - günlük namaz saatları. Dəqiq namaz saatları Azərbaycan.",
};
type Props = {};

const page = (props: Props) => {
  return <PrayerTimes />;
};

export default page;
