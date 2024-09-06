import { WarningT } from "@/lib/types";
import React from "react";

type Props = {};

const Warning = ({ location, pm2_5 }: WarningT) => {
  const howBad = Math.round(pm2_5 / 12);
  const getBorderColor = () => {
    if (pm2_5 <= 12) {
      return "border-green-500"; // Green for good air quality
    } else if (pm2_5 < 35) {
      return "border-orange-500"; // Orange for moderate air quality
    } else {
      return "border-red-500"; // Red for unhealthy air quality
    }
  };

  const getText = () => {
    if (pm2_5 <= 12) {
      return "üçün PM2.5 konsentrasiyası hazırda Ümumdünya Səhiyyə Təşkilatının  hava keyfiyyəti göstərici dəyərinə uyğundur və sağlamlıq üçün heç bir risk yaratmır.";
    } else if (pm2_5 > 12 && pm2_5 < 35) {
      return `üçün PM2.5 konsentrasiyası hazırda Ümumdünya Səhiyyə Təşkilatının  hava keyfiyyəti göstərici dəyərini təxminən ${howBad} dəfə aşır və həssas qruplar üçün müəyyən risk yarada bilər.`;
    } else {
      return `üçün PM2.5 konsentrasiyası hazırda Ümumdünya Səhiyyə Təşkilatının  hava keyfiyyəti göstərici dəyərindən ${howBad} dəfə çoxdur.`;
    }
  };
  return (
    <div className={`border-2 p-6 rounded-md mt-8 ${getBorderColor()}`}>
      <p>{`${location} ${getText()}`}</p>
    </div>
  );
};

export default Warning;
