import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
  value: country.cca2, //國家的兩位數字代碼 (cca2)
  label: country.name.common, //國家的一般名稱 (common name)
  flag: country.flag, //國家的國旗圖片路徑
  latlng: country.latlng, //國家的地理位置座標 (緯度和經度)
  region: country.region, //國家所屬的地理區域
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
//3:41:29
