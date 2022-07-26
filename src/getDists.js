export const getDists = (city) => {
  const hoodSelect = document.querySelector(".metro");
  const hoodOption = document.querySelector(".start-metro");
  hoodOption.textContent = "Выберите район";
  const metroList = city.map((item) => {
    return item.dist;
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
      hoodSelect.appendChild(newOption);
    }
  });

  return "dist";
};
