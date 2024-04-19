import MainDetails from "@/components/MainDetails/MainDetails";
import SideDetails from "@/components/SideDetails/SideDetails";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex">
      <SideDetails />
      <MainDetails/>
    </main>
  );
}
