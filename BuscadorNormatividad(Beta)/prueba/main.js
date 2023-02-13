import paginationItems from "./paginador/main.js";
import dataInfo from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchDocument"),
    searchButton = document.querySelector(".searchDocuments__button");

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

  // async function searchDataDocuments(data) {
  //   const modulePage = "Transparencia",
  //     folder = "Normatividad",
  //     params = [
  //       "Title",
  //       "LinkFilename",
  //       "FileRef",
  //       "Fecha",
  //       "LinkFilename",
  //       "Descripci_x00f3_n",
  //       "A_x00f1_o",
  //     ];

  //   let ulrFetch = `${location.protocol}//${location.host}/${modulePage}/_api/web/lists/getbytitle('${folder}')/items?$select=${params}&$top=2000&$filter=substringof('${data}',Title)`;

  //   try {
  //     let data = await fetch(ulrFetch, {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json; odata=verbose",
  //       },
  //     });
  //     let resp = await data.json();
  //     resultsDataDocuments(resp);
  //   } catch (error) {
  //     console.log(`error en consulta ${error}`);
  //   }
  // }

  const resultsContainer = document.querySelector(".searchResults__container");

  function resultsDataDocuments(resp) {
    let data = resp.d.results;

    console.log(data);
  }

  //pruebas

  const fragmentContent = document.createDocumentFragment();

  for (const i in dataInfo) {
    let item = document.createElement("div");

    item.classList.add("searchResults__item");

    item.innerHTML = `
        <div class="searchResults__title">
          <img src="img/pdf.png" alt="pdf" class="searchResults__img" />
          <a class="searchResults__a" href="#">${dataInfo[i].title}</a>
        </div>
        <div class="searchResults__content">
          <p class="searchResults__p">
           <span class="searchResults__span">Clasificación:</span>${dataInfo[i].clasf}
        </p>
        <p class="searchResults__p">
          <span class="searchResults__span">Fecha:</span>${dataInfo[i].fecha}
        </p>
        <p class="searchResults__p">
          <span class="searchResults__span">Año:</span>${dataInfo[i].año}
        </p>
        <div class="searchResults__buttons">
          <a class="searchResults__button searchResults__button--des">Descripción</a>
          <a class="searchResults__button searchResults__button--dow" download="/">Descargar</a>
        </div>
      </div>
      <div class="searchResults__modalContainer">
        <div class="searchResults__modalContent">
          <h4 class="searchResults__h4">
            ${dataInfo[i].title}
          </h4>
          <p class="searchResults__text">
            ${dataInfo[i].des}
          </p>
          <a class="searchResults__button searchResults__button--close">Cerrar</a>
        </div>
      </div>
    `;

    fragmentContent.appendChild(item);
  }

  resultsContainer.appendChild(fragmentContent);

  // Funcionalidad botones modal

  const modalItems = document.querySelectorAll(
      ".searchResults__modalContainer"
    ),
    modalButtonsOpen = document.querySelectorAll(".searchResults__button--des"),
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

  // Paginador
  paginationItems(
    ".paginationItems__numbers",
    ".searchResults__container",
    ".searchResults__item"
  );
});
