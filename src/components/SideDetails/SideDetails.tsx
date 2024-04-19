import React from "react";
import MainInfo from "./MainInfo/MainInfo";

type Props = {};

const SideDetails = (props: Props) => {
  return <aside className="w-1/4 h-screen bg-[#5c9ce5]">
    <MainInfo sunrise={'07:19'} sunset={'20:08'} country="Azerbaijan" city="Baku" temp={28}/>
  </aside>;
};

export default SideDetails;
