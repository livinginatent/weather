import MainDetails from "@/components/MainDetails/MainDetails";
import SideDetails from "@/components/SideDetails/SideDetails";
import Head from "next/head";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Havam.az | Hava Proqnozu",
  description: "Ən dəqiq və müasir günlük və həftəlik hava proqnozu - Havam.az",
};
export default function Home() {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://havam.az" />
      </Head>
      <div className="flex  flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row">
        <SideDetails />
        <MainDetails />
      </div>
    </>
  );
}
