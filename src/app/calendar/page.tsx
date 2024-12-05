import Image from "next/image";
import React, { useState } from "react";
import WorkCalendar from "../../../public/assets/2024.jpg";
import { Calendar } from "@/components/ui/calendar";
import { az } from "date-fns/locale";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: "İstehsalat təqvimi 2024 | Qeyri-iş günləri",
  description:
    " İstehsalat təqvimi, müəssisələrin və təşkilatların istehsal proseslərini planlamaq və idarə etmək üçün istifadə olunan bir vasitədir.",
};
const CalendarPage = (props: Props) => {
  return (
    <>
      <div className="flex flex-col justify-center p-4 bg-white  items-center">
        <h1 className="text-4xl p-4 self-center">2024 İstehsalat Təqvimi</h1>
        <div className="flex flex-col lg:flex-row md:flex-row xl:flex-row gap-4">
          {/*      <Calendar
            mode="single"
            selected={date}
            locale={az}
            onSelect={setDate}
            className="rounded-md border self-start bg-white"
          /> */}

          <Image
            className="self-center"
            src={WorkCalendar}
            alt="istehsalat teqvimi 2024"
            width={800}
            height={800}
          />
          <p>
            İstehsalat təqvimi, müəssisələrin və təşkilatların istehsal
            proseslərini planlamaq və idarə etmək üçün istifadə olunan bir
            vasitədir. Bu təqvim, istehsal hədəflərinin və iş cədvəllərinin
            düzgün tənzimlənməsi, işçilərin iş vaxtlarının optimallaşdırılması
            və resursların səmərəli istifadəsi üçün əhəmiyyətli rol oynayır.
            İstehsalat təqvimi, həmçinin tətil və qeyri-iş günləri kimi
            istirahət dövrlərini də əhatə edir, bu da müəssisənin fəaliyyətinin
            dayandırılmadan davam etməsinə imkan verir. Təqvim, ilin müxtəlif
            ayları üzrə iş günlərinin sayını və onların bölünməsini müəyyən
            edir. Bu məlumatlar müəssisələrin fəaliyyət həcmini daha dəqiq
            planlaşdırmağa, istehsalat güclərindən və resurslardan maksimum
            faydalanmağa kömək edir. İstehsalat təqvimi həm işçilərin vaxtının
            səmərəli idarə olunması, həm də müəssisə tərəfindən işçi heyətinin
            iş həcminin tənzimlənməsi baxımından olduqca önəmlidir. İstehsalat
            təqvimi həm də istehsalat proseslərinin koordinasiyası və
            planlamasının əsas elementlərindən biridir. Müəssisələr bu təqvimi
            tətbiq edərək, məhsuldarlığı artırmaq, iş yükünü bərabər paylamaq və
            vaxtın daha səmərəli istifadə edilməsini təmin etmək üçün daha
            məqsədyönlü qərarlar qəbul edə bilərlər.
            <br />
            <br />
            <br />
            <a className="font-bold text-decoration-line: underline" href="/">
              Hava proqnozuna geri qayıt
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
