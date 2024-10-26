import MainDetails from "@/components/MainDetails/MainDetails";
import SideDetails from "@/components/SideDetails/SideDetails";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Havam.az | Hava Proqnozu",
  description:
    "Havam.az ilə ən dəqiq günlük və həftəlik hava proqnozunu öyrənin. Temperatur, külək, yağıntı və hava şəraiti barədə ətraflı məlumat üçün bizə qoşulun.",
  /*   alternates: {
    canonical: "https://havam.az",
  }, */
};
export default function Home() {
  return (
    <>
      <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row">
   
        <SideDetails />
        <MainDetails />
      </div>
    </>
  );
}
