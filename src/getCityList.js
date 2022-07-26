import JSON from "./data/data.json" assert { type: "json" };

export const getCityList = () => {
  let city = JSON.map((item) => {
    return item.city;
  });

  city = city.filter((item, i) => {
    if (city.indexOf(item) === i) {
      return true;
    }
  });

  const citySelect = document.querySelector(".city");

  city.forEach((item) => {
    if (item !== "Москва") {
      const newOption = new Option(item, item);
      citySelect.appendChild(newOption);
    }
  });

  return city;
};
