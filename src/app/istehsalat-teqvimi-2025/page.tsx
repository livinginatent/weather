import Image from "next/image";
import React, { useState } from "react";
import WorkCalendar2025 from "../../../public/assets/istehsalat-teqvimi-2025.png";

import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: "İstehsalat təqvimi 2025 | Qeyri-iş günləri",
  description:
    "İstehsalat təqvimi 2025, müəssisələrin və təşkilatların istehsal proseslərini planlamaq və idarə etmək üçün istifadə olunan bir vasitədir. 2025 qeyri-iş günləri.",
};
const CalendarPage = (props: Props) => {
  return (
    <>
      <div className="flex  flex-col justify-center p-4 bg-white  items-center">
        <Image
          className="self-center"
          src={WorkCalendar2025}
          alt="istehsalat teqvimi 2025"
          width={800}
          height={800}
        />
        <h1 className="text-4xl p-4 self-center">2025 İstehsalat Təqvimi</h1>
        <div className="flex lg:flex-row md:flex-row xl:flex-row gap-4">
          {/*      <Calendar
            mode="single"
            selected={date}
            locale={az}
            onSelect={setDate}
            className="rounded-md border self-start bg-white"
          /> */}

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
            <h2>
              Əmək və Əhalinin Sosial M&uuml;dafiəsi Nazirliyinin Kollegiyasının
              Qərarı ilə 2025-ci il &uuml;&ccedil;&uuml;n iş vaxtı normasına
              əsasən gələn ilin aşağıdakı g&uuml;nləri iş g&uuml;n&uuml; hesab
              edilmir:
            </h2>
            <p>
              <ul>
                1, 2 yanvar&ndash;Yeni il bayramı;
                <br />
                20 Yanvar&ndash;&Uuml;mumxalq H&uuml;zn G&uuml;n&uuml;;
                <br />8 Mart&ndash;Qadınlar G&uuml;n&uuml;;
                <br />
                20, 21, 22, 23, 24 mart&ndash;Novruz bayramı;
                <br />
                30, 31 mart &ndash;Ramazan bayramı;
                <br />9 May &ndash;Faşizm &uuml;zərində Qələbə g&uuml;n&uuml;;
                <br />
                28 May&ndash;M&uuml;stəqillik G&uuml;n&uuml;;
                <br />
                6, 7 iyun&ndash;Qurban bayramı;
                <br />
                15 İyun&ndash;Azərbaycan xalqının Milli Qurtuluş G&uuml;n&uuml;;
                <br />
                26 İyun&ndash;Azərbaycan Respublikasının Silahlı Q&uuml;vvələri
                G&uuml;n&uuml;;
                <br />8 Noyabr&ndash;Zəfər G&uuml;n&uuml;;
                <br />9 Noyabr&ndash; Azərbaycan Respublikasının D&ouml;vlət
                Bayrağı G&uuml;n&uuml;;
                <br />
                31 Dekabr&ndash;D&uuml;nya Azərbaycanlılarının Həmrəyliyi
                G&uuml;n&uuml;.
              </ul>
            </p>
            <p>
              Əmək Məcəlləsinə və Nazirlər Kabinetinin qərarlarına uyğun olaraq
              2025-ci ildə beşg&uuml;nl&uuml;k iş həftəsində 3 yanvar, 10, 25 və
              26 mart, 1 aprel, 9, 16 iyun, 10 və 11 noyabr tarixləri,
              altıg&uuml;nl&uuml;k iş həftəsində 25 mart, 1 aprel, 16 iyun və 10
              noyabr tarixləri istirahət g&uuml;nləridir. 2025-ci ilin fevral
              ayı 28 təqvim g&uuml;n&uuml;ndən, il isə 365 təqvim
              g&uuml;n&uuml;ndən ibarətdir.
            </p>
            <p>
              2025-ci ildə beşg&uuml;nl&uuml;k iş həftəsində 239 iş
              g&uuml;n&uuml; (onlardan, 8-i bayramqabağı və 1-bələdiyyə
              se&ccedil;kiləri g&uuml;n&uuml; qabağı), iş g&uuml;n&uuml; hesab
              edilməyən 105 istirahət g&uuml;n&uuml; (onlardan, 8-i iş
              g&uuml;n&uuml; hesab edilməyən bayram g&uuml;nləri ilə
              &uuml;st-&uuml;stə d&uuml;şməsinə g&ouml;rə m&uuml;əyyən edilən,
              1-i 2024-c&uuml; ildən yerdəyişmə ilə ke&ccedil;irilən), iş
              g&uuml;n&uuml; hesab edilməyən 19 bayram, 1 Bələdiyyə
              se&ccedil;kiləri g&uuml;n&uuml; və 1 &Uuml;mumxalq H&uuml;zn
              G&uuml;n&uuml; vardır.
            </p>
            <p>
              Azərbaycanda g&uuml;ndəlik normal iş vaxtının m&uuml;ddəti 8
              saatdan, g&uuml;ndəlik normal iş vaxtına uyğun olan həftəlik
              normal iş vaxtının m&uuml;ddəti isə 40 saatdan artıq ola bilməz.
              Bir qayda olaraq, iki istirahət g&uuml;n&uuml; olan
              beşg&uuml;nl&uuml;k iş həftəsi m&uuml;əyyən edilir.
            </p>
            <p>
              2025-ci ilin iş vaxtı norması 40 saatlıq beşg&uuml;nl&uuml;k iş
              həftəsi &uuml;zrə 8 saatlıq iş g&uuml;n&uuml; hesabından
              m&uuml;əyyən edilir və bu zaman iş g&uuml;n&uuml; hesab edilməyən
              bayramqabağı, səsvermə, habelə &Uuml;mumxalq H&uuml;zn
              G&uuml;n&uuml; qabağı iş g&uuml;nlərində həftəlik iş
              g&uuml;nlərinin m&uuml;ddəti bir saat qısaldılır.
            </p>
            <p>
              2025-ci il &uuml;&ccedil;&uuml;n 40 saatlıq iş həftəsində iş
              vaxtının illik norması 1903 saatdır.
            </p>
            <p>
              Altıg&uuml;nl&uuml;k iş həftəsi olan iş yerlərində 40 saatlıq iş
              həftəsində &ccedil;alışan iş&ccedil;ilər &uuml;&ccedil;&uuml;n
              2025-ci ildə beşg&uuml;nl&uuml;k iş həftəsi &uuml;zrə hesablanmış
              1903 saatlıq illik iş vaxtı norması tətbiq edilməlidir.
            </p>
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
