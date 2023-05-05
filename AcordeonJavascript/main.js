document.addEventListener("DOMContentLoaded", () => {
  async function consultDataAcordeon() {
    const modulePage = "Ciudadanos";
    const folder = "AcordeonNormativa";
    const params = ["ID", "IdPrincipal", "Enlace", "IdPadre", "item", "Title"];

    let urlSearch = `${location.protocol}//${location.host}/${modulePage}/_api/web/lists/getbytitle('${folder}')/items?$select=${params}&$orderby=IdPrincipal%20asc&$top=10000`;

    let data = await fetch(urlSearch, {
      method: "GET",
      headers: {
        Accept: "application/json; odata=verbose",
      },
    });

    if (!data.ok) {
      const message = `Error en Consulta de Noticias: ${data.status} - ${data.statusText}`;
      throw new Error(message);
    } else {
      let response = await data.json();
      drawAcordeon(response);
    }
  }

  consultDataAcordeon().catch((error) => {
    console.error(error.message);
  });

  const containerAcordeon = document.getElementById("AcordeonContent");

  function drawAcordeon(response) {
    const data = response.d.results;

    const ul = document.createElement("ul");
    ul.classList.add("acordeon-normativa__ul");
    const fragmentDocument = document.createDocumentFragment();

    for (const i in data) {
      const { Title, IdPrincipal, Enlace, IdPadre, item } = data[i];

      const li = document.createElement("li");
      const link = document.createElement("a");
      li.setAttribute("data-item", IdPrincipal);
      link.textContent = `${item} ${Title}`;
      link.setAttribute("href", Enlace);
      li.appendChild(link);

      if (IdPadre === null) {
        ul.appendChild(li);
        fragmentDocument.appendChild(ul);
      } else {
        const parent = fragmentDocument.querySelector(`li[data-item="${IdPadre}"]`);
        if (parent) {
          let ulChild = parent.querySelector("ul");
          if (!ulChild) {
            ulChild = document.createElement("ul");
            parent.appendChild(ulChild);
          }
          ulChild.appendChild(li);
        }
      }
    }

    containerAcordeon.appendChild(fragmentDocument);
  }
});
