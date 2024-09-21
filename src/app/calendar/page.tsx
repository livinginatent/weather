"use client";
import Image from "next/image";
import React, { useState } from "react";
import WorkCalendar from "../../../public/assets/2024.jpg";
import { Calendar } from "@/components/ui/calendar";
import { az } from "date-fns/locale";
import { Metadata } from "next";

type Props = {};
export const metadata: Metadata = {
  title: "Havam.az | 2024 İstehsalat Təqvimi",
  description: "2024 İstehsalat Təqvimi | Qeyri-iş günləri",
  alternates: {
    canonical: "https://havam.az/calendar",
  },
};

const CalendarPage = (props: Props) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <>
      <div className="flex flex-col justify-center p-4 bg-white  items-center">
        <h1 className="text-4xl p-4 self-center">2024 İstehsalat Təqvimi</h1>
        <div className="flex flex-col lg:flex-row md:flex-row xl:flex-row gap-4">
          <Calendar
            mode="single"
            selected={date}
            locale={az}
            onSelect={setDate}
            className="rounded-md border self-start bg-white"
          />

          <Image
            className="self-center"
            src={WorkCalendar}
            alt="qeyri iş günləri 2024"
            width={800}
            height={800}
          />
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
