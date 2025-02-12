"use client";
import WeeklyForecast from "@/components/MainDetails/WeeklyForecast/WeeklyForecast";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex flex-col pb-4 items-center">
      <h1 className="text-3xl mt-4">Hava Proqnozu Quba</h1>
      <p className="w-5/6 p-8">
        Quba, Azərbaycanın şimalında yerləşən və unikal iqlim şəraitinə malik
        olan bölgədir. Yaz aylarında hava yumşaq olur, təbiət canlanır və
        yaşıllıq artır; bu dövr bölgənin təbii gözəlliyini daha da artırır.
        Yayda isə isti və quru hava şəraiti hökm sürür, bu da kənd təsərrüfatı
        və bağçılıq üçün əlverişli şərait yaradır. Payızda temperatur azalsa da,
        meyvə və tərəvəzlərin yığımı zamanı məhsuldarlıq zirvəyə çatır, təbiət
        rəngarəng mənzərələrə çevrilir. Qışda isə soyuq hava hakim olur və bəzən
        qar yağışı müşahidə edilir, bu da bölgəyə xüsusi cazibə qatır və qış
        turizmi üçün imkanlar yaradır.
      </p>
      <h2 className="text-2xl">Quba Hava Durumu</h2>
      <WeeklyForecast lat={41.3647} lon={48.5122} />
    </div>
  );
};

export default page;
