import paginationItems from "./prueba/data.js";

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchDocument"),
    searchButton = document.querySelector(".searchDocuments__button"),
    results = document.querySelector(".searchResults"),
    resultLoader = document.querySelector(".searchLoader"),
    resultError = document.querySelector(".searchError");

  searchButton.addEventListener("click", (e) => {
    let data = searchInput.value;
    e.preventDefault();
    searchDataDocuments(data);
    searchInput.value = "";
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key == "enter" || e.keyCode == 13) {
      e.preventDefault();
      let data = searchInput.value;
      searchDataDocuments(data);
      searchInput.value = "";
    }
  });

  const resultsContainer = document.querySelector(".searchResults__container"),
    pagNumbers = document.querySelector(".paginationItems__numbers");

  async function searchDataDocuments(data) {
    const modulePage = "Transparencia",
      folder = "Normatividad",
      params = [
        "Title",
        "LinkFilename",
        "FileRef",
        "Fecha",
        "Descripci_x00f3_n",
        "A_x00f1_o",
        "Clasificac_x00f3_n",
      ];

    let ulrFetch = `${location.protocol}//${location.host}/${modulePage}/_api/web/lists/getbytitle('${folder}')/items?$select=${params}&$top=2000&$filter=substringof('${data}',Title)`;

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
    let data = resp.d.results;

    resultError.classList.remove(".searchError--active");
    resultLoader.classList.add("searchLoader--active");
    results.classList.remove("searchResults--active");

    setTimeout(() => {
      resultLoader.classList.remove("searchLoader--active");
      results.classList.add("searchResults--active");
    }, 2000);

    const fragmentContent = document.createDocumentFragment();

    for (const i in data) {
      let item = document.createElement("div");

      item.classList.add("searchResults__item");

      item.innerHTML = `
          <div class="searchResults__title">
            <img src="/SiteAssets/matriz-ITA/Components/BuscadorNormatividad/img/pdf.png" alt="pdf" class="searchResults__img" />
            <a class="searchResults__a" href="${data[i].FileRef}">${data[i].Title}</a>
          </div>
          <div class="searchResults__content">
            <p class="searchResults__p">
             <span class="searchResults__span">Clasificación:</span>${data[i].Clasificac_x00f3_n}
          </p>
          <p class="searchResults__p">
            <span class="searchResults__span">Fecha:</span>${data[i].Fecha}
          </p>
          <p class="searchResults__p">
            <span class="searchResults__span">Año:</span>${data[i].A_x00f1_o}
          </p>
          <div class="searchResults__buttons">
            <a class="searchResults__button searchResults__button--des">Descripción</a>
            <a class="searchResults__button searchResults__button--dow" href="${data[i].FileRef}" download>Descargar</a>
          </div>
        </div>
        <div class="searchResults__modalContainer">
          <div class="searchResults__modalContent">
            <h4 class="searchResults__h4">
              ${data[i].Title}
            </h4>
            <p class="searchResults__text">
              ${data[i].Descripci_x00f3_n}
            </p>
            <a class="searchResults__button searchResults__button--close">Cerrar</a>
          </div>
        </div>
      `;

      fragmentContent.appendChild(item);
    }

    resultsContainer.appendChild(fragmentContent);

    // Paginador
    paginationItems(
      ".paginationItems__numbers",
      ".searchResults__container",
      ".searchResults__item"
    );

    //modal
    modalFunction();
  }

  function drawSearchError(msg) {
    results.classList.remove("searchResults--active");
    resultError.classList.add("searchError--active");
    const spanMsg = document.querySelector(".searchError__span");

    spanMsg.textContent = `${msg}`;
  }

  // Funcionalidad botones modal

  function modalFunction() {
    const modalItems = document.querySelectorAll(
        ".searchResults__modalContainer"
      ),
      modalButtonsOpen = document.querySelectorAll(
        ".searchResults__button--des"
      ),
      modalButtonsClose = document.querySelectorAll(
        ".searchResults__button--close"
      );

    modalButtonsOpen.forEach((btn, indexBtn) => {
      modalItems.forEach((item, indexItem) => {
        btn.addEventListener("click", () => {
          if (indexBtn == indexItem)
            item.classList.add("searchResults__modalContainer--active");
        });
      });
    });

    modalButtonsClose.forEach((btn, indexBtn) => {
      modalItems.forEach((item, indexItem) => {
        btn.addEventListener("click", () => {
          if (indexBtn == indexItem)
            item.classList.remove("searchResults__modalContainer--active");
        });
      });
    });
  }
});
