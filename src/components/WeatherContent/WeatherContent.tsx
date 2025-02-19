import React from "react";

type Props = {};

const WeatherContent = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl">Hava Proqnozu</h2>
      <div className="w-5/6">
        <p className="text-center">
          Hava proqnozu atmosfer məlumatlarının toplanması və analizinə
          əsaslanır. Peyklər, radarlar və meteoroloji stansiyalar vasitəsilə
          temperatur, rütubət, təzyiq və külək istiqaməti kimi göstəricilər
          toplanır. Bu məlumatlar riyazi modellər və süni intellekt alqoritmləri
          ilə emal edilir, nəticədə hava şəraitinin yaxın və uzun müddətli
          proqnozları hazırlanır
        </p>
      </div>
    </div>
  );
};

export default WeatherContent;
