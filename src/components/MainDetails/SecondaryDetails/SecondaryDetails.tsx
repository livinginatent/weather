import React from "react";
import Humidity from "./Humidity/Humidity";

type Props = {};

const SecondaryDetails = (props: Props) => {
  return (
    <div className="container mt-4 w-full px-1 grid grid-cols-1 md:grid-cols-3 gap-2">
      <Humidity />
      
    </div>
  );
};

export default SecondaryDetails;
