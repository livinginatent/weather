import { Metadata } from "next";
import React from "react";

type Props = {};
export const metadata: Metadata = {
  title: "Havam.az | Hava Proqnozu - Haqqımızda",
  description:
    "Havam.az - Etibarlı Hava Proqnozu və Hava Keyfiyyəti Məlumatları",
};
const page = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 ">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mt-4 text-center mb-4">
        Havam.az - Etibarlı Hava Proqnozu və Hava Keyfiyyəti Məlumatları
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-center w-full sm:w-5/6 md:w-3/4 ">
        Havam.az, müasir texnologiyalarla təchiz olunmuş, ən dəqiq hava
        proqnozlarını təqdim edən bir platformadır. Saytımızın əsas məqsədi
        istifadəçilərimizə gündəlik fəaliyyətlərini planlaşdırmaq üçün lazım
        olan hava məlumatlarını sadə və əlçatan şəkildə çatdırmaqdır.
      </p>
      <br />
      <p className="text-base sm:text-lg md:text-xl text-center w-full sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 mt-4">
        Əsas hava məlumatları daxil olmaqla, biz həm də{" "}
        <a className="font-bold text-blue-500 hover:underline" href="/">
          hava keyfiyyəti
        </a>{" "}
        haqqında ətraflı məlumat təqdim edirik. Beləliklə, yalnız yağış və ya
        günəşli hava ilə məhdudlaşmayan, sağlamlığınıza təsir edə biləcək ətraf
        mühit faktorlarını da nəzərə alan hava proqnozu əldə edirsiniz.
      </p>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-4 text-center mb-4">
        Niyə Havam.az?
      </h2>
      <ul className="w-full sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 text-base sm:text-lg md:text-xl list-disc pl-4 sm:pl-6 md:pl-8">
        <li>
          Ən dəqiq hava proqnozu:{" "}
          <a className="font-bold text-blue-500 hover:underline" href="/">
            Havam.az
          </a>{" "}
          güvənilir beynəlxalq mənbələrdən istifadə edərək dəqiq və sürətli hava
          proqnozu verir.
        </li>
        <li>
          Hava keyfiyyəti göstəriciləri: Azərbaycanın istənilən guşəsində
          havanın keyfiyyəti ilə bağlı məlumatları asanlıqla əldə edin.
        </li>
        <li>
          Müasir və istifadəçi dostu dizayn: Mobil cihazlardan və ya kompüterdən
          rahatlıqla istifadə edə biləcəyiniz bir platforma.
        </li>
        <li>
          Real vaxtda yenilənmələr: Hər zaman aktual hava proqnozu təmin olunma
          imkanı.
        </li>
      </ul>
    </div>
  );
};

export default page;
