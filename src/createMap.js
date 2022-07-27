import { getCoordByFilter } from "./getCoordByFilter.js";
import { setState } from "./state.js";
import { getMetro } from "./getMetro.js";
import { deleteAllOptions } from "./deleteMetro.js";
import { getDists } from "./getDists.js";
import { showBaloonFrom } from "./showBaloonForm.js";
import { createWidgetButton } from "./createWidgetButton.js";

export const createMap = () => {
  const ymaps = window.ymaps;

  ymaps.ready(init);

  function init() {
    // Создание карты.
    var map = new ymaps.Map("map", {
      center: [55.76, 37.64],

      zoom: 10,
    });

    let metroOrDistSelect; /// сюда кладу нужное значение для поиска по району или метро

    const addPointOnTheMap = (e, coordFoo, value, city) => {
      const { filter } = setState(city ? city : e.target.value); ///передаем в объект state название города
      const coord = coordFoo(filter, value); /// получаем кооринаты по району или метро или городу

      const dublicate = []; /////массив для дубликов

      const filteredCoord = coord.map((item) => {
        const coordToString = String(item.coord[0]).substring(
          0,
          String(item.coord[0]).length - 2
        ); ///преврающаю координаты в строку и отрезаю у нее два последних символа, чтобы сранивать, потому что в жсоне есть координтаы отличающиеся 2 цифрами последними

        if (dublicate.includes(coordToString)) {
          //// если в массиве дубликатов есть такие кооринаты
          const indexDublicate = coord.findIndex(
            /// то ищем такой элемент в coord и узнаем его индекс
            (doc) =>
              String(doc.coord[0]).substring(
                0,
                String(doc.coord[0]).length - 2
              ) === coordToString
          );

          return {
            ...item, /// возвращаем item
            secondName: coord[indexDublicate].name, ////и добавляем к нему второе имя
          };
        } else {
          dublicate.push(coordToString); ////если в дубликатах нет, то пушим в массив для проверки дубликатов
          return item;
        }
      });

      if (city || e.target.value !== "start") {
        if (
          city ||
          (e.target.classList.contains("city") && e.target.value !== "start")
        ) {
          ///чтобы метро подгружалось только по нажатию на селект с городом и только по нажатию не на первый option
          const metroOrDistFunc = coord[0].metro ////если в массиве нет метро, то запускаю функцию с районом
            ? getMetro(coord) ///отсюда в переменную возвращается строка metro
            : getDists(coord); ///отсюда в переменную возвращается строка dist

          metroOrDistSelect = metroOrDistFunc; //// присваиваю значение для поиска по району или метро
        }
        map.geoObjects.removeAll(); ////удаляем все точки
        filteredCoord.forEach((item, i) => {
          const createPoints = (item, coord, adress) => {
            const placemark = new ymaps.Placemark(item[coord], {
              /// СОЗДАНИЕ ТОЧЕК
              balloonContentHeader: `<h4 class='map-title'>${item.descr}</h4>`,

              ////ниже верстка балуна
              balloonContentBody: `   
              <h4 class ='map-clinic-adress'>Адрес: ${item[adress]} </h4>
              <h4 class='map-name'>Имя врача: ${item.name}<h4> 
              <button class='button-baloon'>Записаться</button>
              ${
                item.secondName
                  ? `<h4 class='map-name'>Имя врача: ${item.secondName}<h4>
              <button class='button-baloon'>Записаться</button>`
                  : ""
              }`,
            });

            map.geoObjects.add(placemark);
            map.geoObjects.getBounds();
            placemark.events.add("click", function (e) {
              const coords = e.get("coords");

              const widgBtn = document.querySelector(".dd-button");

              if (widgBtn) {
                const oldAttribute = widgBtn.getAttribute("data-call-widget");
                const sliceOldAttribute = oldAttribute.slice(0, 80);
                widgBtn.removeAttribute("data-call-widget");

                widgBtn.setAttribute(
                  "data-call-widget",
                  sliceOldAttribute +
                    `"clinicId":"${item.clinicId[0]}","doctorId":"${item.doctorId}","diagnosticId":null,"type":"Doctor","specialities":[],"specialityId":null}`
                );
              }

              createWidgetButton(item.alyas, item.clinicId[0], item.doctorId);

              map.panTo(coords, {
                //////////АНИМАЦИЯ ПЕРЕХОДА К ТОЧКЕ ПО КЛИКУ
                duration: 500,
              });
            });
          };

          if (item.secondCoord) {
            ////если в объекте есть второй адрес , то добавляем точку с ним тоже
            createPoints(item, "coord", "adress");
            createPoints(item, "secondCoord", "secondAdress");
          } else {
            createPoints(item, "coord", "adress"); ////если нет, то добавляем один
          }
        });

        function setCenter() {
          //////ЦЕНТР НА ТОЧКЕ
          map.setBounds(map.geoObjects.getBounds(), {
            checkZoomRange: true,
            zoomMargin: 35,
          });
        }

        setCenter(coord);
      }
    };
    addPointOnTheMap(false, getCoordByFilter, "city", "Москва");

    const citySelect = document.querySelector(".city");
    showBaloonFrom(); //// вешаю обработчик событий на карту, чтобы кнопочка работала
    citySelect.addEventListener("change", (e) => {
      deleteAllOptions(); /// удаляем все метро, чтобы перерисовать новый список
      addPointOnTheMap(e, getCoordByFilter, "city"); //// добавляем точки с филтрацией по городу
    });

    const metroSelect = document.querySelector(".metro");
    metroSelect.addEventListener("change", (e) => {
      addPointOnTheMap(e, getCoordByFilter, metroOrDistSelect); //// добавляем точки по метро или району, смаря че в metroOrDistSelect
    });
  }
};
