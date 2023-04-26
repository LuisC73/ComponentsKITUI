document.addEventListener("DOMContentLoaded", () => {
  const inputSearch = document.getElementById("SearchData");
  const buttonSearch = document.getElementById("SearchButton");

  let valueInputSearch = inputSearch.value;

  inputSearch.addEventListener("input", () => {
    valueInputSearch = inputSearch.value;
  });

  buttonSearch.addEventListener("click", (e) => {
    e.preventDefault();
    let data = inputSearch.value;
    console.log(data);
  });

  inputSearch.addEventListener("keypress", (e) => {
    if (e.key == "enter" || e.keyCode == 13) {
      e.preventDefault();
      let data = inputSearch.value;
      console.log(data);
    }
  });

  async function searchInfoLibrary() {
    const module = "Transparencia",
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

    let ulrFetch = `${location.protocol}//${location.host}/${module}/_api/web/lists/getbytitle('${folder}')/items?$select=${params}&$orderby=ID%20desc`;

    try {
      let data = await fetch(ulrFetch, {
        method: "GET",
        headers: {
          Accept: "application/json; odata=verbose",
        },
      });
      let resp = await data.json();
      drawInfoLibrary(resp);
    } catch (error) {
      console.log(`error en consulta ${error}`);
    }
  }

  function drawInfoLibrary(resp) {
    let data = resp.d.results;

    console.log(data);
  }
});
