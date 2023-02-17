import paginationItems from "/SiteAssets/V2/Componentes/BuscadorNormatividad/paginador/main.js";

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
      drawSearchError("El campo se encuentra vacio");
    } else if ((valueSearch === "Title") & !regularExpression.all.test(data)) {
      drawSearchError("Ingrese los valores correctos");
    } else if ((valueSearch === "Fecha") & !regularExpression.date.test(data)) {
      drawSearchError("Ingrese los valores correctos de tipo fecha");
    } else if (
      (valueSearch === "A_x00f1_o") &
      !regularExpression.number.test(data)
    ) {
      drawSearchError("Ingrese los valores correctos de tipo numerico");
    } else {
      searchDataDocuments(data);
      searchInput.value = "";
    }
  }

  searchButton.addEventListener("click", (e) => {
    let data = searchInput.value;
    e.preventDefault();
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

    timeSeconds = timeSeconds < 10 ? "0" + timeSeconds : timeSeconds;

    let AmPm = "";

    AmPm += timeDays >= 12 ? "pm" : "am";

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

      dateShow = `${date}, ${timeHours}:${timeMinutes}:${timeSeconds} ${AmPm}`;
    }

    return dateShow;
  }

  let sizeDocument = 0;

  async function getPdfSize(url) {
    try {
      let response = await fetch(url, {
        method: "HEAD",
      });
      const contentLength = response.headers.get("Content-Length");
      const sizeInBytes = parseInt(contentLength);
      const sizeInKb = sizeInBytes / 1024;
      sizeDocument = Math.floor(sizeInKb);
      return sizeDocument;
    } catch (error) {
      console.log(error);
    }
  }

  const resultsContainer = document.querySelector(".searchResults__container"),
    pagNumbers = document.querySelector(".paginationItems__numbers");

  async function searchDataDocuments(data) {
    const modulePage = "Transparencia",
      folder = "Normatividad",
      params = [
        "Title",
        "LinkFilename",
        "FileRef",
        "Descripci_x00f3_n",
        "A_x00f1_o",
        "Clasificac_x00f3_n",
        "Fechaorden",
        "Modified",
      ];

    let ulrFetch = `${location.protocol}//${location.host}/${modulePage}/_api/web/lists/getbytitle('${folder}')/items?$select=${params}&$top=2000&$filter=substringof('${data}',${valueSearch})`;

    try {
      let data = await fetch(ulrFetch, {
        method: "GET",
        headers: {
          Accept: "application/json; odata=verbose",
        },
      });
      let resp = await data.json();
      resultsContainer.innerHTML = ``;
      pagNumbers.innerHTML = ``;
      resultsDataDocuments(resp);
    } catch (error) {
      drawSearchError(error);
    }
  }

  function resultsDataDocuments(resp) {
    console.log(resp);
    let data = resp.d.results;

    resultError.classList.remove("searchError--active");
    resultLoader.classList.add("searchLoader--active");
    results.classList.remove("searchResults--active");

    setTimeout(() => {
      resultLoader.classList.remove("searchLoader--active");
      results.classList.add("searchResults--active");
    }, 2000);

    const fragmentContent = document.createDocumentFragment();

    for (const i in data) {
      let item = document.createElement("li");

      item.classList.add("searchResults__li");

      let date = data[i].Fechaorden,
        dateModified = data[i].Modified;

      convertDateSearch(date);
      convertTime(dateModified);

      // getPdfSize(`${data[i].FileRef}`);

      console.log(sizeDocument);

      item.innerHTML = `
        <figure class="searchResults__figure">
          <img src="/SiteAssets/V2/Componentes/BuscadorNormatividad/img/pdf.png" alt="pdf" class="searchResults__img">
          <figcaption class="searchResults__fig">${sizeDocument} KB</figcaption>
        </figure>
        <div class="searchResults__content">
          <p class="searchResults__p searchResults__p--transform">${data[i].Clasificac_x00f3_n}</p>
          <a href="${data[i].FileRef}" class="searchResults__a">${data[i].Title}</a>
          <p class="searchResults__p">${data[i].Descripci_x00f3_n}</p>
          <p class="searchResults__p searchResults__p--size"><span class="searchResults__span">Publicacion: ${dateShow}</span> | <span>Expedición: ${fullDate}</span></p>
        </div>
        <div class="searchResults__buttons">
          <a class="searchResults__btn" href="${data[i].FileRef}">Abrir</a>
          <a class="searchResults__btn" href="${data[i].FileRef}" download>Descargar</a>
        </div>`;

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
    results.classList.remove("searchResults--active");
    resultError.classList.add("searchError--active");

    const spanMsg = document.querySelector(".searchError__span");

    spanMsg.textContent = `${msg}`;
  }

  const searchDeleteButton = document.querySelector(".searchResults__reset");

  function deleteSearchs(e) {
    e.preventDefault();
    resultsContainer.innerHTML = ``;
    pagNumbers.innerHTML = ``;
    results.classList.remove("searchResults--active");
  }

  searchDeleteButton.addEventListener("click", deleteSearchs);
});
