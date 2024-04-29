import React from "react";
import MainInfo from "./MainInfo/MainInfo";

type Props = {temp:any};

export const SideDetails = async ({temp}:Props) => {
  return (
    <aside className="w-1/5 h-screen bg-[#5c9ce5]">
      <MainInfo
        sunrise={"07:19"}
        sunset={"20:08"}
        country="Azerbaijan"
        city="Baku"
        temp={temp}
      />
    </aside>
  );
};

export default SideDetails;
