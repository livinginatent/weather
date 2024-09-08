import React from "react";

const DataScale = () => {
  const scales = [
    {
      title: "PM2.5 (µg/m³)",
      levels: [
        { label: "Yaxşı", value: "0-12", color: "bg-green-400" },
        { label: "Orta", value: "13-35", color: "bg-yellow-400" },
        { label: "Pis", value: "36-55", color: "bg-orange-400" },
        { label: "Zərərli", value: "56-150", color: "bg-red-500" },
        { label: "Çox Zərərli", value: "151-250", color: "bg-purple-600" },
        { label: "Təhlükəli", value: "251+", color: "bg-maroon-700" },
      ],
    },
    {
      title: "CO (µg/m³)",
      levels: [
        { label: "Yaxşı", value: "0-4", color: "bg-green-400" },
        { label: "Orta", value: "4.5-9", color: "bg-yellow-400" },
        { label: "Pis", value: "9.5-12", color: "bg-orange-400" },
        { label: "Zərərli", value: "12.5-15", color: "bg-red-500" },
        { label: "Çox Zərərli", value: "15.5-30", color: "bg-purple-600" },
        { label: "Təhlükəli", value: "30.5+", color: "bg-maroon-700" },
      ],
    },
    {
      title: "NO₂ (µg/m³)",
      levels: [
        { label: "Yaxşı", value: "0-53", color: "bg-green-400" },
        { label: "Orta", value: "54-100", color: "bg-yellow-400" },
        { label: "Pis", value: "101-360", color: "bg-orange-400" },
        { label: "Zərərli", value: "361-649", color: "bg-red-500" },
        {
          label: "Çox Zərərli",
          value: "650-1249",
          color: "bg-purple-600",
        },
        { label: "Təhlükəli", value: "1250+", color: "bg-maroon-700" },
      ],
    },
    {
      title: "USA EPA İndeksi",
      levels: [
        { label: "Yaxşı", value: "0-50", color: "bg-green-400" },
        { label: "Orta", value: "51-100", color: "bg-yellow-400" },
        { label: "Pis", value: "101-150", color: "bg-orange-400" },
        { label: "Zərərli", value: "151-200", color: "bg-red-500" },
        { label: "Çox Zərərli", value: "201-300", color: "bg-purple-600" },
        { label: "Təhlükəli", value: "301+", color: "bg-maroon-700" },
      ],
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {scales.map((scale) => (
        <div key={scale.title} className="p-4  border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-center">
            {scale.title}
          </h3>
          <div className="flex justify-between space-x-1">
            {scale.levels.map((level) => (
              <div key={level.label} className="text-center">
                <div className="text-sm mb-1">{level.value}</div>
                <div
                  className={`w-8 h-2 mx-auto  ${level.color}`}
                ></div>
                <div className="text-xs w-full mt-1 p-2">{level.label}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataScale;
