import paginationItems from "../pagination/main.js";
import dataInfo from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".searchDocuments__input"),
    searchButton = document.querySelector(".searchDocuments__button"),
    results = document.querySelector(".searchResults"),
    resultLoader = document.querySelector(".searchLoader"),
    resultError = document.querySelector(".searchError");

  const SearchSelect = document.querySelector(".searchDocuments__select");

  let valueSearch = SearchSelect.value;

  SearchSelect.addEventListener("change", () => {
    valueSearch = SearchSelect.value;
  });

  const regularExpressions = {
    Title: /^[A-Za-z0-9\s]+$/i,
    Ano: /^[0-9]{4}$/i,
  };

  const SEARCH_TYPES = new Set(["Title", "Ano"]);

  function validationSearch(data) {
    if (data === "") {
      drawSearchError("El campo se encuentra vacio");
      return;
    }

    if (!SEARCH_TYPES.has(valueSearch)) {
      drawSearchError("Tipo de búsqueda no válido");
      return;
    }

    const regex = regularExpressions[valueSearch];
    if (!regex.test(data)) {
      drawSearchError(
        `Ingrese los valores correctos de tipo ${valueSearch.toLowerCase()}`
      );
      return;
    }

    validationDraw(dataInfo);
    filterSearch(dataInfo);
    dropMenuData(dataInfo);
  }

  searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    let data = searchInput.value;
    validationSearch(data);
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key == "enter" || e.keyCode == 13) {
      e.preventDefault();
      let data = searchInput.value;
      validationSearch(data);
    }
  });

  let fullDate = "",
    fullDateHour = "",
    dateShow = "";

  function convertDateSearch(date) {
    if (date != null) {
      let dateLocal = date.split("-");

      let days = dateLocal[2].split("T")[0].toString(),
        month = dateLocal[1].toString(),
        year = dateLocal[0].toString(),
        hour = dateLocal[2].split("T")[1].split("Z")[0].toString();

      let monthText = "";

      const MESES = {
        Enero: "01",
        Febrero: "02",
        Marzo: "03",
        Abril: "04",
        Mayo: "05",
        Junio: "06",
        Julio: "07",
        Agosto: "08",
        Septiembre: "09",
        Octubre: "10",
        Noviembre: "11",
        Diciembre: "12",
      };

      for (const i in MESES) {
        if (month === MESES[i]) monthText = i;
      }

      fullDate = `${days} de ${monthText} de ${year}`;

      return fullDate;
    } else {
      return "Fecha";
    }
  }

  function convertTime(dateOld) {
    if (dateOld != null) {
      let date = new Date().getTime();

      let dateLocal = dateOld.split("-");

      let daysOld = dateLocal[2].split("T")[0].toString(),
        monthOld = dateLocal[1].toString(),
        yearOld = dateLocal[0].toString(),
        hourOld = dateLocal[2].split("T")[1].split("Z")[0].toString();

      fullDateHour = `${yearOld}/${monthOld}/${daysOld},${hourOld}`;

      let fullDateOld = new Date(fullDateHour).getTime();

      let differenceTime = date - fullDateOld;

      const seconds = 1000,
        minutes = seconds * 60,
        hours = minutes * 60,
        days = hours * 24;

      let timeDays = Math.floor(differenceTime / days),
        timeHours = Math.floor((differenceTime % days) / hours);

      let hour = parseInt(hourOld.split(":")[0].toString()),
        minute = parseInt(hourOld.split(":")[1].toString()),
        second = parseInt(hourOld.split(":")[2].toString());

      let AmPm = hour >= 12 ? "pm" : "am";

      hour = hour % 12 || 12;
      let finalTime = `${hour}:${minute}:${second} ${AmPm}`;

      const optionsDate = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      };

      if (timeDays < 2) {
        let time = timeHours != 1 ? "Horas" : "Hora";
        dateShow = `Hace ${timeHours} ${time}`;
      } else if (timeDays < 5) {
        dateShow = `Hace ${timeDays} Dias`;
      } else {
        let date = new Date(fullDateOld).toLocaleDateString(
          "co-Co",
          optionsDate
        );

        dateShow = `${date}, ${finalTime}`;
      }

      return dateShow;
    } else {
      return "Fecha";
    }
  }

  const defaultValue = {
    size: "Tamaño",
    Clasificac_x00f3_n: "Clasificación",
    Title: "Titulo",
    FileRef: "#",
    Descripci_x00f3_n: "Descripción",
    Fechaorden: "Fecha",
    Modified: "Ultima modificación",
  };

  function validationFields(data, defaultValue) {
    return data.map((item) => {
      const newItem = {};
      Object.keys(defaultValue).forEach((key) => {
        newItem[key] = item[key] !== "" ? item[key] : defaultValue[key];
      });
      return newItem;
    });
  }

  function validationDraw(data) {
    if (data.length != 0) {
      const newData = validationFields(data, defaultValue);
      draw(newData);
    } else {
      drawSearchError("No se encontraron documentos");
    }
  }

  const resultsContainer = document.querySelector(".searchResults__container"),
    pagNumbers = document.querySelector(".paginationItems__numbers");

  //pruebas
  function draw(data) {
    searchInput.value = "";
    resultsContainer.innerHTML = "";
    pagNumbers.innerHTML = "";

    const fragmentContent = document.createDocumentFragment();

    resultError.classList.remove("searchError--active");
    resultLoader.classList.add("searchLoader--active");
    results.classList.remove("searchResults--active");

    setTimeout(() => {
      resultLoader.classList.remove("searchLoader--active");
      results.classList.add("searchResults--active");
    }, 2000);

    for (const i in data) {
      let item = document.createElement("li");

      item.classList.add("searchResults__li");

      convertDateSearch(data[i].Fechaorden);
      convertTime(data[i].Modified);

      item.innerHTML = `
        <figure class="searchResults__figure">
          <img src="./assets/img/pdf_blue.png" alt="pdf" class="searchResults__img">
          <figcaption class="searchResults__fig">${data[i].size}</figcaption>
        </figure>
        <div class="searchResults__content">
          <p class="searchResults__p searchResults__p--transform">${data[i].Clasificac_x00f3_n}</p>
          <a href="${data[i].FileRef}" class="searchResults__a">${data[i].Title} ${i}</a>
          <p class="searchResults__p">${data[i].Descripci_x00f3_n}</p>
          <p class="searchResults__p searchResults__p--size"><span class="searchResults__span">Publicacion: ${dateShow}</span> | <span>Expedición: ${fullDate}</span></p>
        </div>
        <div class="searchResults__buttons">
          <a class="searchResults__btn" href="${data[i].FileRef}">Abrir</a>
          <a class="searchResults__btn" href="${data[i].FileRef}" download>Descargar</a>
        </div>
      `;

      fragmentContent.appendChild(item);
    }

    resultsContainer.appendChild(fragmentContent);

    // Paginador
    paginationItems(
      ".paginationItems__numbers",
      ".searchResults__container",
      ".searchResults__li"
    );
  }

  function drawSearchError(msg) {
    searchInput.value = "";
    results.classList.remove("searchResults--active");
    resultError.classList.add("searchError--active");
    searchInput.classList.add("searchDocuments__input--error");
    searchButton.classList.add("searchDocuments__button--error");

    const spanMsg = document.querySelector(".searchError__span");

    spanMsg.textContent = `${msg}`;

    setTimeout(() => {
      resultError.classList.remove("searchError--active");
      searchInput.classList.remove("searchDocuments__input--error");
      searchButton.classList.remove("searchDocuments__button--error");
    }, 4000);
  }

  const searchDeleteButton = document.querySelector(".searchResults__reset");

  function deleteSearchs(e) {
    e.preventDefault();
    resultsContainer.innerHTML = ``;
    pagNumbers.innerHTML = ``;
    results.classList.remove("searchResults--active");
  }

  searchDeleteButton.addEventListener("click", deleteSearchs);

  let filters = document.querySelectorAll(".searchResults__liOption--color"),
    year_now = new Date().getFullYear();

  function filterSearch(data) {
    filters.forEach((filter) => {
      filter.addEventListener("click", () => {
        console.log(filter.textContent);
        if (filter.textContent === "Año actual") {
          let dataFilter = data.filter((el) =>
            el.A_x00f1_o === `${year_now}` ? el : ""
          );
          validationDraw(dataFilter);
        } else if (filter.textContent === "Recientes") {
          let dateNow = new Date();
          dateNow = `${dateNow.getDate()}/${dateNow.getMonth()}/${dateNow.getFullYear()}`;
          let dataFilter = data.filter((el) => {
            let dateData = new Date(el.Modified);
            dateData = `${dateData.getDate()}/${dateData.getMonth()}/${dateData.getFullYear()}`;
            if (dateData === dateNow) return el;
          });
          validationDraw(dataFilter);
        }
      });
    });
  }

  const dropMenuContainer = document.querySelector(".searchResults__dropmenu");

  function dropMenuData(data) {
    let fragmentContent = document.createDocumentFragment();
    const clasifications = [];

    for (const i in data) {
      clasifications.push(data[i].Clasificac_x00f3_n);
    }

    const clasfCount = clasifications.reduce(
      (prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev),
      {}
    );

    const clasfResult = {};

    clasifications.forEach(
      (el) => (clasfResult[el] = clasfResult[el] + 1 || 1)
    );

    const clasfSet = new Set(clasifications);

    let results = [...clasfSet];

    results.forEach((el) => {
      let dropItem = document.createElement("li");
      dropItem.classList.add("searchResults__option");
      dropItem.innerText = `${el} (${clasfCount[el]})`;
      fragmentContent.appendChild(dropItem);
    });

    dropMenuContainer.appendChild(fragmentContent);
  }

  function activeDropMenu(menu, state) {
    if (state === "active") {
      document.querySelector(`.${menu}`).classList.add(`${menu}--active`);
    } else if (state === "desactive") {
      document.querySelector(`.${menu}`).classList.remove(`${menu}--active`);
    }
  }

  //Delegación de eventos
  document.addEventListener("click", (e) => {
    if (e.target.matches(".searchResults__liOption--drop")) {
      activeDropMenu("searchResults__dropmenu", "active");
    }
    if (e.target.matches(".searchResults__option--close")) {
      activeDropMenu("searchResults__dropmenu", "desactive");
    }
  });
});
