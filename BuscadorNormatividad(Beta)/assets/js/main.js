import paginationItems from "/SiteAssets/V2/Components/BuscadorNormatividad/assets/pagination/main.js";

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
    A_x00f1_o: /^[0-9]{4}$/i,
  };

  const SEARCH_TYPES = new Set(["Title", "A_x00f1_o"]);

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

    searchDataDocuments(data);
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

      const MONTHS = {
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

      for (const i in MONTHS) {
        if (month === MONTHS[i]) monthText = i;
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

      let daysDifference = Math.floor(differenceTime / days),
        hoursDifference = Math.floor((differenceTime % days) / hours);

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

      if (daysDifference < 2) {
        let time = hoursDifference != 1 ? "Horas" : "Hora";
        dateShow = `Hace ${hoursDifference} ${time}`;
      } else if (daysDifference < 5) {
        dateShow = `Hace ${daysDifference} Dias`;
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

  function bytesToSize(bytes) {
    if(bytes != null){
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes === 0) return 'n/a';
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
      if (i === 0) return `${bytes} ${sizes[i]})`;
      return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
    }else{
      return `Tamaño`;
    }
  }

  function validationDraw(resp) {
    let data = resp.d.results;
    if (data.length != 0) {
      resultsDataDocuments(data);
    } else {
      drawSearchError("No se encontraron documentos");
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
        "File/ServerRelativeUrl",
        "File/Length",
        "Descripci_x00f3_n",
        "A_x00f1_o",
        "Clasificac_x00f3_n",
        "Fechaorden",
        "Modified",
      ];

    let ulrFetch = `${location.protocol}//${location.host}/${modulePage}/_api/web/lists/getbytitle('${folder}')/items?$select=${params}&$top=2000&$filter=substringof('${data}',${valueSearch})&$expand=File`;

    try {
      let data = await fetch(ulrFetch, {
        method: "GET",
        headers: {
          Accept: "application/json; odata=verbose",
        },
      });
      let resp = await data.json();
      validationDraw(resp);
      filterSearch(resp);
    } catch (error) {
      drawSearchError(error);
    }
  }

  function resultsDataDocuments(data) {
    searchInput.value = "";
    resultsContainer.innerHTML = "";
    pagNumbers.innerHTML = "";

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
      
      let classification = data[i].Clasificac_x00f3_n,
        title = data[i].Title,
        urlFile = data[i].File.ServerRelativeUrl,
        description = data[i].Descripci_x00f3_n,
        date = data[i].Fechaorden,
        dateModified = data[i].Modified,
        fileSize = bytesToSize(data[i].File.Length);

      convertDateSearch(date);
      convertTime(dateModified);

      item.innerHTML = `
            <figure class="searchResults__figure">
              <img src="/SiteAssets/V2/Components/BuscadorNormatividad/assets/img/pdf_blue.png" alt="pdf" class="searchResults__img">
              <figcaption class="searchResults__fig">${fileSize}</figcaption>
            </figure>
            <div class="searchResults__content">
              <p class="searchResults__p searchResults__p--transform">${classification}</p>
              <a href="${urlFile}" class="searchResults__a">${title}</a>
              <p class="searchResults__p">${description}</p>
              <p class="searchResults__p searchResults__p--size"><span class="searchResults__span">Publicacion: ${dateShow}</span> | <span>Expedición: ${fullDate}</span></p>
            </div>
            <div class="searchResults__buttons">
              <a class="searchResults__btn" href="${urlFile}">Abrir</a>
              <a class="searchResults__btn" href="${urlFile}" download>Descargar</a>
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
    yearNow = new Date().getFullYear();

  function filterSearch(data) {
    let info = data.d.results;
    filters.forEach((filter) => {
      filter.addEventListener("click", () => {
        if (filter.textContent === "Año actual") {
          let dataFilter = info.filter((el) =>
            el.A_x00f1_o === `${yearNow}` ? el : ""
          );
          if (dataFilter.length != 0) {
            resultsDataDocuments(dataFilter);
          } else {
            drawSearchError("No existen documentos con el filtro solicitado");
          }
        } else if (filter.textContent === "Recientes") {
          let dateNow = new Date();
          dateNow = `${dateNow.getDate()}/${dateNow.getMonth()}/${dateNow.getFullYear()}`;
          let dataFilter = info.filter((el) => {
            let dateData = new Date(el.Modified);
            dateData = `${dateData.getDate()}/${dateData.getMonth()}/${dateData.getFullYear()}`;
            if (dateData === dateNow) return el;
          });
          if (dataFilter.length != 0) {
            resultsDataDocuments(dataFilter);
          } else {
            drawSearchError("No existen documentos con el filtro solicitado");
          }
        }
      });
    });
  }
});
