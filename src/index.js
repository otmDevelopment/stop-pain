import { getCityList } from "./getCityList.js";
import { createMap } from "./createMap.js";

window.addEventListener("DOMContentLoaded", () => {
  getCityList();
  createMap();
});
