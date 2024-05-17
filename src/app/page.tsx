import { useEffect, useState } from "react";
import MainDetails from "@/components/MainDetails/MainDetails";
import SideDetails from "@/components/SideDetails/SideDetails";
import { DEFAULT_LOCATION } from "@/lib/config";
import { getCurrent } from "@/actions/getCurrent";

export default async function Home() {

  return (
    <main className="flex h-screen">
      <SideDetails />
      <MainDetails />
    </main>
  );
}
