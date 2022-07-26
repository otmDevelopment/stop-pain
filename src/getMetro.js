export const getMetro = (city) => {
  const metroSelect = document.querySelector(".metro");
  const hoodOption = document.querySelector(".start-metro");
  hoodOption.textContent = "Выберите метро";

  const metroList = [];

  city.forEach((item) => {
    if (item.metro) {
      metroList.push(item.metro);
    }
  });

  const metroListFiltered = metroList.filter((item, i) => {
    if (metroList.indexOf(item) === i) {
      return true;
    }
  });

  metroListFiltered.forEach((item) => {
    if (item) {
      const newOption = new Option(item, item);
      newOption.classList.add("metroOption");
      metroSelect.appendChild(newOption);
    }
  });

  return 'metro'
};
