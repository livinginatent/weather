"use client";

import React, { useEffect, useState } from "react";
import CitySelector from "../CitySelector/CitySelector";
import useWeatherStore from "@/store/store";
import { getLocationName } from "@/utils/getLocationNames";
import { locationNames } from "@/lib/locationNames";
import moment from "moment-hijri";
import { prayTimes } from "@/utils/prayerTimes";
import PrayerFAQs from "./PrayerFAQs";

type PrayerDay = {
  date: Date;
  times: {
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    [key: string]: string;
  };
};

const PrayerTimes = () => {
  const DEFAULT_LAT = 40.4093;
  const DEFAULT_LON = 49.8671;

  const [todayTimes, setTodayTimes] = useState<PrayerDay | null>(null);
  const [calculationMethod, setCalculationMethod] = useState("MWL");
  const [monthlyTimes, setMonthlyTimes] = useState<PrayerDay[]>([]);

  const [currentDate, setCurrentDate] = useState<string>("");
  const [hijriDate, setHijriDate] = useState<string>("");

  const searchCity = useWeatherStore((state) => state.coordinates);
  const lat = searchCity?.lat ?? DEFAULT_LAT;
  const lon = searchCity?.lon ?? DEFAULT_LON;

  const locationName = getLocationName(lat, lon, locationNames);

  const buildPrayerData = (
    dateObj: Date,
    timesObj: Record<string, string>
  ): PrayerDay => {
    return {
      date: dateObj,
      times: {
        fajr: timesObj.fajr,
        sunrise: timesObj.sunrise,
        dhuhr: timesObj.dhuhr,
        asr: timesObj.asr,
        maghrib: timesObj.maghrib,
        isha: timesObj.isha,
      },
    };
  };

  const convertTo24HourFormat = (time: string): string => {
    const [hour, minutePart] = time.split(":");
    const minute = minutePart.slice(0, 2);
    const ampm = minutePart.slice(3) || "";
    let hours = parseInt(hour, 10);

    if (ampm.toUpperCase() === "PM" && hours < 12) hours += 12;
    if (ampm.toUpperCase() === "AM" && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, "0")}:${minute}`;
  };

  useEffect(() => {
    const today = new Date();
    setCurrentDate(
      today.toLocaleDateString("az-AZ", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    setHijriDate(moment().format("iYYYY/iM/iD"));

    // Update calculation method
    prayTimes.setMethod(calculationMethod);

    const todayTimesObj = prayTimes.getTimes(
      today,
      [lat, lon],
      "auto",
      "auto",
      "24h"
    );
    const builtTodayData = buildPrayerData(today, todayTimesObj);
    setTodayTimes(builtTodayData);

    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const newMonthlyTimes: PrayerDay[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      const dayTimesObj = prayTimes.getTimes(
        dateObj,
        [lat, lon],
        "auto",
        "auto",
        "24h"
      );
      newMonthlyTimes.push(buildPrayerData(dateObj, dayTimesObj));
    }

    setMonthlyTimes(newMonthlyTimes);
  }, [lat, lon, calculationMethod]);
  const today = new Date();

  const monthName = today.toLocaleString("az-AZ", { month: "long" });
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 w-full max-w-screen-xl mx-auto">
      <h1 className="text-5xl font-bold mt-4 text-center">Namaz vaxtları</h1>
      <h3 className="text-4xl font-semibold mb-1">
        {locationName || "Default City"}
      </h3>
      <div className="w-full flex flex-col items-center justify-center mt--6 sm:w-1/4 mx-auto">
        <div>Şəhər seç</div>
        <CitySelector />
      </div>

      <div className="flex flex-col items-center">
        <div className="text-xl">
          {currentDate} - {hijriDate}{" "}
          <span className="italic">(Hicri tarixi)</span>
        </div>
      </div>
      <h2 className="text-2xl">Namaz saatları - Düzgün Namaz vaxtları</h2>

      {todayTimes && (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-12 mt-4">
          <div className="flex flex-col items-center justify-around bg-[#E8F9FF] border-2 border-blue-950 w-full h-32 rounded-lg p-8">
            <h3 className="text-xl font-semibold">Sübh</h3>
            <p className="text-lg">
              {convertTo24HourFormat(todayTimes.times.fajr)}
            </p>
          </div>

          <div className="flex flex-col items-center justify-around bg-[#E8F9FF] border-2 border-blue-950 w-full h-32 rounded-lg p-8">
            <h3 className="text-xl font-semibold">Zöhr</h3>
            <p className="text-lg">
              {convertTo24HourFormat(todayTimes.times.dhuhr)}
            </p>
          </div>

          <div className="flex flex-col items-center justify-around bg-[#E8F9FF] border-2 border-blue-950 w-full h-32 rounded-lg p-8">
            <h3 className="text-xl font-semibold">Əsr</h3>
            <p className="text-lg">
              {convertTo24HourFormat(todayTimes.times.asr)}
            </p>
          </div>

          <div className="flex flex-col items-center justify-around bg-[#E8F9FF] border-2 border-blue-950 w-full h-32 rounded-lg p-8">
            <h3 className="text-xl font-semibold">Məğrib</h3>
            <p className="text-lg">
              {convertTo24HourFormat(todayTimes.times.maghrib)}
            </p>
          </div>

          <div className="flex flex-col items-center justify-around bg-[#E8F9FF] border-2 border-blue-950 w-full h-32 rounded-lg p-8">
            <h3 className="text-xl font-semibold">İşa</h3>
            <p className="text-lg">
              {convertTo24HourFormat(todayTimes.times.isha)}
            </p>
          </div>
        </div>
      )}
      <div className="w-full sm:w-1/4 mx-auto mb-4">
        <label className="block text-center text-lg font-semibold mb-2">
          Hesablama Metodu
        </label>
        <select
          className="block w-full border border-gray-300 rounded-md p-2"
          value={calculationMethod}
          onChange={(e) => setCalculationMethod(e.target.value)}
        >
          <option value="MWL">Ümumdünya İslam Liqası</option>
          <option value="ISNA">Şimali Amerika İslam Cəmiyyəti</option>
          <option value="Egypt">Misir Tədqiqatlar İdarəsi</option>
          <option value="Makkah">Üm Al Qura Universiteti (Məkkə)</option>
          <option value="Karachi">İslam Elmləri Universiteti (Karaçi)</option>
          <option value="Tehran">Tehran Universiteti Geofizika İnstitu</option>
          <option value="Jafari">Şiə İsnə-Əşəri, Ləva İnstitutu (Qum)</option>
        </select>
      </div>
      <div className="w-full">
        <p>
          Bu səhifə vasitəsilə Bakı namaz vaxtı və rayonlarda namaz vaxtını
          öyrənə bilərsiniz. Səhər (Sübh), Günorta (Zöhr), İkindi (Əsr), Axşam
          (Məğrib) və Yatsı (İşa) namazlarının vaxtlarını ətraflı şəkildə
          öyrənin. Xüsusilə, regionunuza uyğun namaz cədvəlləri və hicri tarixi
          daxil olmaqla, dəqiq informasiya təqdim olunur. Eyni zamanda, ayın hər
          gününə aid namaz saatlarını da əldə etmək mümkündür. Beləliklə, harada
          olmağınızdan asılı olmayaraq,rayon və Bakı namaz vaxtlarını vaxtında
          izləmək və gündəlik ibadətinizi tənzimləmək üçün bu səhifədən
          faydalana bilərsiniz.
        </p>
      
      </div>

      <div className="w-full mt-12">
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-2xl font-bold text-center mb-4">
            {locationName || "Default City"}: Ayın Namaz Cədvəli
          </h3>
          <p className="text-2xl">
            {monthName[0].toUpperCase() + monthName.slice(1)}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-slate-300">
            <thead>
              <tr className="bg-blue-200">
                <th className="border border-slate-300 p-2">Tarix</th>
                <th className="border border-slate-300 p-2">Sübh</th>
                <th className="border border-slate-300 p-2">Günəş</th>
                <th className="border border-slate-300 p-2">Zöhr</th>
                <th className="border border-slate-300 p-2">Əsr</th>
                <th className="border border-slate-300 p-2">Şam</th>
                <th className="border border-slate-300 p-2">İşa</th>
              </tr>
            </thead>
            <tbody>
              {monthlyTimes.map((item, index) => {
                const dateStr = item.date.toLocaleDateString("az-AZ", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                });
                return (
                  <tr key={index} className="hover:bg-blue-50">
                    <td className="border border-slate-300 p-2">{dateStr}</td>
                    <td className="border border-slate-300 p-2">
                      {convertTo24HourFormat(item.times.fajr)}
                    </td>
                    <td className="border border-slate-300 p-2">
                      {convertTo24HourFormat(item.times.sunrise)}
                    </td>
                    <td className="border border-slate-300 p-2">
                      {convertTo24HourFormat(item.times.dhuhr)}
                    </td>
                    <td className="border border-slate-300 p-2">
                      {convertTo24HourFormat(item.times.asr)}
                    </td>
                    <td className="border border-slate-300 p-2">
                      {convertTo24HourFormat(item.times.maghrib)}
                    </td>
                    <td className="border border-slate-300 p-2">
                      {convertTo24HourFormat(item.times.isha)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <PrayerFAQs />
        <article className="mt-10 rounded-2xl bg-white/90 p-6 shadow-sm border border-gray-100 text-gray-800">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            Namaz Vaxtları: İbadətin Nizamı və Mənəvi Dərinlik
          </h2>

          <p className="mb-4 text-sm md:text-base leading-relaxed">
            İslam dinində ibadət, insanın yaradıcısı ilə qurduğu ən şəxsi və
            dərin əlaqədir. Bu əlaqənin ən mühüm ayağı olan namaz, günün müəyyən
            anlarında dünyanın qayğılarından uzaqlaşıb ruhu dincliyə
            qovuşdurmaqdır.{" "}
            <strong className="font-semibold text-gray-900">Namaz vaxtları</strong>, təkcə
            zamanı təqib etmək deyil, həm də həyatın ritmini ibadətlə tənzimləməkdir.
          </p>

          <h2 className="mt-6 text-xl md:text-2xl font-semibold text-gray-900">
            Namazın Həyatımızdakı Yeri
          </h2>
          <p className="mt-2 mb-4 text-sm md:text-base leading-relaxed">
            İnsan həyatı çox vaxt qarmaqarışıq və sürətli axır. İş, təhsil və
            sosial öhdəliklər arasında insan öz mənəvi köklərini unuda bilər.
            Məhz bu məqamda{" "}
            <strong className="font-semibold text-gray-900">namaz vaxtlari</strong> bir
            çərçivə rolunu oynayır. Gündə beş dəfə Yaradanın hüzuruna çıxmaq,
            insana etdiyi səhvləri düşünmək, şükür etmək və gələcəyə dair
            ümidlərini təzələmək imkanı verir.
          </p>

          <h2 className="mt-6 text-xl md:text-2xl font-semibold text-gray-900">
            Beş Vaxt Namazın Ətraflı Təhlili
          </h2>

          <div className="mt-3 space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                1. Sübh (Fəcr) Namazı
              </h3>
              <p className="text-sm md:text-base leading-relaxed">
                Günün başlanğıcı, qaranlığın işığa təslim olduğu an. Sübh namazı,
                yeni bir günə bərəkətlə başlamağın açarıdır. Bir çoxları üçün
                səhərin erkən saatlarında yuxudan oyanmaq çətin görünsə də, bu
                ibadət günün qalan hissəsində mənəvi bir dayanıqlılıq bəxş edir.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                2. Zöhr (Günorta) Namazı
              </h3>
              <p className="text-sm md:text-base leading-relaxed">
                İş və qayğıların ən sıx olduğu zaman. Zöhr namazı, dünyəvi
                işlərin ortasında verilən mənəvi bir fasilədir. Bu vaxt, insanın
                dünyəvi məqsədləri ilə əbədi məqsədləri arasında bir tarazlıq
                yaratmasına kömək edir.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                3. Əsr (İkindi) Namazı
              </h3>
              <p className="text-sm md:text-base leading-relaxed">
                Günün ikinci yarısı, yorğunluğun hiss olunmağa başladığı an. Əsr
                namazı, günün qalan hissəsini daha səmərəli keçirmək üçün bir
                motivasiya mənbəyidir.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                4. Məğrib (Axşam) Namazı
              </h3>
              <p className="text-sm md:text-base leading-relaxed">
                Günəşin batışı, günün sonuna doğru bir addım. Məğrib namazı,
                geridə qoyulan günün hesabını vermək və axşamın dincliyinə qədəm
                qoymaq üçün bir fürsətdir.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                5. İşa (Yatsı) Namazı
              </h3>
              <p className="text-sm md:text-base leading-relaxed">
                Gecənin sakitliyi. İşa namazı, insanın yuxuya getməzdən əvvəl
                ruhunu təmizləməsi və rahat bir yuxu üçün mənəvi hazırlaşmasıdır.
              </p>
            </div>
          </div>

          <h2 className="mt-8 text-xl md:text-2xl font-semibold text-gray-900">
            Niyə Dəqiq &quot;Namaz Vaxtlari&quot; Hesablaması Vacibdir?
          </h2>
          <p className="mt-2 mb-4 text-sm md:text-base leading-relaxed">
            İbadətin qəbul olunması və yerinə yetirilməsi üçün{" "}
            <strong className="font-semibold text-gray-900">namaz vaxtları</strong> düzgün
            riayət edilməlidir. Astronomik hadisələr və coğrafi mövqe{" "}
            <strong className="font-semibold text-gray-900">namaz vaxtları</strong>{" "}
            cədvəlinin hər gün, hətta hər dəqiqə dəyişməsinə səbəb olur.
            Saytımızda təqdim etdiyimiz məlumatlar, yerli koordinatlarınız və
            müasir astronomik alqoritmlər əsasında hesablanır.
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm md:text-base">
              <caption className="mb-2 text-sm font-medium text-gray-700">
                Gündəlik İbadət Qrafiki
              </caption>
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-3 py-2 font-semibold text-gray-900">
                    Namaz
                  </th>
                  <th className="px-3 py-2 font-semibold text-gray-900">
                    Zamanın Əsas Göstəricisi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-3 py-2">Sübh</td>
                  <td className="px-3 py-2">Fəcrin doğuşu</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Zöhr</td>
                  <td className="px-3 py-2">Günəşin zenitdən keçməsi</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Əsr</td>
                  <td className="px-3 py-2">Kölgənin bir misli artması</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Məğrib</td>
                  <td className="px-3 py-2">Günəşin batması</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">İşa</td>
                  <td className="px-3 py-2">Şəfəqin itməsi</td>
                </tr>
              </tbody>
            </table>
          </div>

   
        </article>
    </div>
  );
};

export default PrayerTimes;
