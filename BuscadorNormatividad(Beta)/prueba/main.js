import paginationItems from "../paginador/main.js";
import dataInfo from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchDocument"),
    searchButton = document.querySelector(".searchDocuments__button"),
    results = document.querySelector(".searchResults"),
    resultLoader = document.querySelector(".searchLoader"),
    resultError = document.querySelector(".searchError");

  const SearchSelect = document.querySelector(".searchDocuments__select");

  let valueSearch = SearchSelect.value;

  SearchSelect.addEventListener("change", () => {
    valueSearch = SearchSelect.value;
  });

  const regularExpression = {
    all: /^[A-Za-z0-9\s]+$/g,
    number: /^[0-9]+$/g,
    date: /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/i,
  };

  function validationSearch(data) {
    if (data === "") {
      console.log("El campo se encuentra vacio");
    } else if (valueSearch == "Title" &! regularExpression.all.test(data)) {
      console.log("Ingrese los valores correctos");
    } else if (valueSearch == "Fecha" &! regularExpression.date.test(data)) {
      console.log("Ingrese los valores correctos de tipo fecha");
    } else if (
      valueSearch == "A_x00f1_o" &!
      regularExpression.number.test(data)
    ) {
      console.log("Ingrese los valores correctos de tipo numerico");
    } else {
      console.log(data);
    }
  }

  searchButton.addEventListener("click", (e) => {
    let data = searchInput.value;
    e.preventDefault();
    // searchDataDocuments(data);
    validationSearch(data);
    searchInput.value = "";
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key == "enter" || e.keyCode == 13) {
      e.preventDefault();
      let data = searchInput.value;
      // searchDataDocuments(data);
      validationSearch(data);
      searchInput.value = "";
    }
  });

  const resultsContainer = document.querySelector(".searchResults__container"),
    pagNumbers = document.querySelector(".paginationItems__numbers");

  //pruebas

  const fragmentContent = document.createDocumentFragment();

  for (const i in dataInfo) {
    let item = document.createElement("li");

    item.classList.add("searchResults__li");

    item.innerHTML = `
      <figure class="searchResults__figure">
        <img src="./img/pdf.png" alt="pdf" class="searchResults__img">
        <figcaption class="searchResults__fig">6 Mb</figcaption>
      </figure>
      <div class="searchResults__content">
        <p class="searchResults__p searchResults__p--transform">${dataInfo[i].clasf}</p>
        <a href="#" class="searchResults__a">${dataInfo[i].title}</a>
        <p class="searchResults__p">${dataInfo[i].des}</p>
        <p class="searchResults__p searchResults__p--size"><span class="searchResults__span">Publicacion: Hace 6 horas</span> | <span>Expedición: ${dataInfo[i].fecha} de ${dataInfo[i].año}</span></p>
      </div>
      <div class="searchResults__buttons">
        <a class="searchResults__btn" href="https://www.inirida-guainia.gov.co/Transparencia/Normatividad/Acuerdo%20N°011%20del%202005.pdf">Abrir</a>
        <a class="searchResults__btn" href="https://www.inirida-guainia.gov.co/Transparencia/Normatividad/Acuerdo%20N°011%20del%202005.pdf" download>Descargar</a>
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

  const searchDeleteButton = document.querySelector(".searchResults__reset");

  function deleteSearchs(e) {
    e.preventDefault();
    resultsContainer.innerHTML = ``;
    pagNumbers.innerHTML = ``;
    results.classList.remove("searchResults--active");
  }

  searchDeleteButton.addEventListener("click", deleteSearchs);

  let filters = document.querySelectorAll('.searchResults__p--option');

  filters.forEach(filter => {
    filter.addEventListener('click',() => {
      if(filter.textContent === "Recientes"){
        let dataFilter =  dataInfo.filter(el => el.año === "2023" ? el : "");
        resultsContainer.innerHTML = "";
        pagNumbers.innerHTML = "";
        for (const i in dataFilter) {
          let item = document.createElement("li");
      
          item.classList.add("searchResults__li");
      
          item.innerHTML = `
            <figure class="searchResults__figure">
              <img src="./img/pdf.png" alt="pdf" class="searchResults__img">
              <figcaption class="searchResults__fig">6 Mb</figcaption>
            </figure>
            <div class="searchResults__content">
              <p class="searchResults__p searchResults__p--transform">${dataInfo[i].clasf}</p>
              <a href="#" class="searchResults__a">${dataInfo[i].title}</a>
              <p class="searchResults__p">${dataInfo[i].des}</p>
              <p class="searchResults__p searchResults__p--size"><span class="searchResults__span">Publicacion: Hace 6 horas</span> | <span>Expedición: ${dataInfo[i].fecha} de ${dataInfo[i].año}</span></p>
            </div>
            <div class="searchResults__buttons">
              <a class="searchResults__btn" href="https://www.inirida-guainia.gov.co/Transparencia/Normatividad/Acuerdo%20N°011%20del%202005.pdf">Abrir</a>
              <a class="searchResults__btn" href="https://www.inirida-guainia.gov.co/Transparencia/Normatividad/Acuerdo%20N°011%20del%202005.pdf" download>Descargar</a>
            </div>
          `;
      
          fragmentContent.appendChild(item);
        }
      
        resultsContainer.appendChild(fragmentContent);        
      }
    })
  })

  let mes = "4";

  // for (const i in MESES) {
  //   if (mes === MESES[i]) console.log(i);
  // }

  let fullDate = "",
    fullDateHour = "",
    dateShow = "";

  function convertDateSearch(date) {
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
  }

  function convertTime(dateOld) {
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
      timeHours = Math.floor((differenceTime % days) / hours),
      timeMinutes = Math.floor((differenceTime % hours) / minutes),
      timeSeconds = Math.floor((differenceTime % minutes) / seconds);

    const optionsDate = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    if (timeDays < 2) {
      dateShow = `Hace ${timeHours} Horas`;
    } else if (timeDays < 5) {
      dateShow = `Hace ${timeDays} Dias`;
    } else {
      let date = new Date(fullDateOld).toLocaleDateString("co-Co", optionsDate);
      dateShow = `${date},${timeHours}:${timeMinutes}:${timeSeconds}`;
    }

    return dateShow;
  }

  // let date = new Date().toLocaleDateString("co-Co");

  // async function getPdfSize(url) {
  //   const response = await fetch(url, {
  //     method: "HEAD",
  //   });
  //   const contentLength = response.headers.get("Content-Length");
  //   const sizeInBytes = parseInt(contentLength);
  //   const sizeInKb = sizeInBytes / 1024;
  //   return sizeInKb;
  // }

  // getPdfSize(
  //   "https://www.inirida-guainia.gov.co/Transparencia/Normatividad/Acuerdo%20N°011%20del%202005.pdf"
  // ).then((size) => {
  //   console.log(`El tamaño del archivo es ${size} KB`);
  // });
});
