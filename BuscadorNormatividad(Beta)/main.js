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

  async function searchDataDocuments(data) {
    const modulePage = "Transparencia",
      folder = "Normatividad",
      params = [
        "Title",
        "LinkFilename",
        "FileRef",
        "Fecha",
        "LinkFilename",
        "Descripci_x00f3_n",
        "A_x00f1_o",
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
      resultsDataDocuments(resp);
    } catch (error) {
      console.log(`error en consulta ${error}`);
    }
  }

  const resultsContainer = document.querySelector(".searchResults");

  function resultsDataDocuments(resp) {
    let data = resp.d.results;

    console.log(data);
  }

  // Funcionalidad botones modal

  const modalItems = document.querySelectorAll(".searchResults__modal"),
    modalButtonsOpen = document.querySelectorAll(".searchResults__button--des"),
    modalButtonsClose = document.querySelectorAll(
      ".searchResults__button--close"
    );

  modalButtonsOpen.forEach((btn, indexBtn) => {
    modalItems.forEach((item, indexItem) => {
      btn.addEventListener('click',() => {
        if(indexBtn == indexItem) item.classList.add('searchResults__modal--active') 
      })
    });
  });

  modalButtonsClose.forEach((btn, indexBtn) => {
    modalItems.forEach((item, indexItem) => {
      btn.addEventListener('click',() => {
        if(indexBtn == indexItem) item.classList.remove('searchResults__modal--active') 
      })
    });
  });
});
