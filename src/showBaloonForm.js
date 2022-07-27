import { createWidgetButton } from "./createWidgetButton.js";

export const showBaloonFrom = () => {
  const map = document.querySelector("#map");
  const ballonForm = document.querySelector(".popup_main-popup");

  const formAdress = document.querySelector(".map-adress");

  map.addEventListener("click", (e) => {
    if (e.target.classList.contains("button-baloon")) {
      const baloonAdress = document.querySelector(".map-clinic-adress");
      const baloontitle = document.querySelector(".map-title");

      ballonForm.value = "";
      ballonForm.classList.add("show");

      formAdress.innerHTML = `<h4 class ="form-title">${baloontitle.textContent}</h4>
      <span class ="form-adress">${baloonAdress.textContent}</span>
      `;
    }
  });
};
