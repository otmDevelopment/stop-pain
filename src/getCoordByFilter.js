import JSON from "./data/data.json" assert { type: "json" };

export const getCoordByFilter = (cityName, value) => {
  const arrWithDoctors = JSON.filter((item) => {
    if (item[value] && item[value].includes(cityName)) {
      return true;
    }
    return false;
  });
  return arrWithDoctors;
};
