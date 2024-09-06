export const formatTextValue = (value: number): string => {
  const valueTextMap: { [key: number]: string } = {
    1: "Yaxşı",
    2: "Orta",
    3: "Pis",
    4: "Zərərli",
    5: "Çox Zərərli",
    6: "Təhlükəli",
  };
  return valueTextMap[value] || value.toString();
};
