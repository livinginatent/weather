import { cities } from "@/lib/locationNames";
import { WarningT } from "@/lib/types";
import React from "react";

type Props = {};

const Warning = ({ location, pm2_5 }: WarningT) => {
  const howBad = () => {
    if(Math.round(pm2_5 / 12)===1){
      return 'cüzi dərəcədə aşır'
    }
    return `${Math.round(pm2_5/12)} dəfə aşır`
  }
  const getBorderColor = () => {
    if (pm2_5 <= 12) {
      return "border-good"; // Green for good air quality
    } else if (pm2_5 < 35) {
      return "border-moderate"; // Orange for moderate air quality
    } else {
      return "border-hazardous"; // Red for unhealthy air quality
    }
  };

  const getText = () => {
    if (pm2_5 <= 12) {
      return "üçün PM2.5 konsentrasiyası hazırda Ümumdünya Səhiyyə Təşkilatının  hava keyfiyyəti göstərici dəyərinə uyğundur və sağlamlıq üçün heç bir risk yaratmır.";
    } else if (pm2_5 > 12 && pm2_5 < 35) {
      return `üçün PM2.5 konsentrasiyası hazırda Ümumdünya Səhiyyə Təşkilatının  hava keyfiyyəti göstərici dəyərini  ${howBad()}  və həssas qruplar üçün müəyyən risk yarada bilər.`;
    } else {
      return `üçün PM2.5 konsentrasiyası hazırda Ümumdünya Səhiyyə Təşkilatının  hava keyfiyyəti göstərici dəyərini ${howBad()} və bütün qruplar üçün zərərlidir.`;
    }
  };
  return (
    <div
      className={`border-2 p-6 rounded-md mt-8 w-full  ${getBorderColor()}`}
    >
      <p>{`${cities[location]} ${getText()}`}</p>
    </div>
  );
};

export default Warning;
