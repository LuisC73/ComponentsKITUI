"use strict";

import data from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const containerAcordeon = document.getElementById("AcordeonContent");

  function drawAcordeon(data) {
    // const data = response.d.results;

    const ul = document.createElement("ul");
    ul.classList.add("acordeon-web__ul");
    const fragmentDocument = document.createDocumentFragment();

    for (const i in data) {
      const { Title, IdPrincipal, Enlace, IdPadre, item } = data[i];

      const li = document.createElement("li");
      const link = document.createElement("a");
      li.classList.add("acordeon-web__item");
      li.setAttribute("data-item", IdPrincipal);
      link.classList.add("acordeon-web__link");
      link.textContent = `${item} ${Title}`;
      link.setAttribute("href", Enlace);
      li.appendChild(link);

      if (IdPadre === null) {
        ul.appendChild(li);
        fragmentDocument.appendChild(ul);
      } else {
        const parent = fragmentDocument.querySelector(`li[data-item="${IdPadre}"]`);
        parent.classList.add("acordeon-web__item--parent");
        if (parent) {
          let ulChild = parent.querySelector("ul");
          if (!ulChild) {
            ulChild = document.createElement("ul");
            ulChild.classList.add("acordeon-web__content");
            parent.appendChild(ulChild);
          }
          ulChild.appendChild(li);
        }
      }
    }
    containerAcordeon.appendChild(fragmentDocument);
  }

  function toggleAcordeon() {
    const parentItems = document.querySelectorAll(".acordeon-web__item--parent a");

    parentItems.forEach((item) => {
      item.addEventListener("click", () => {
        let content = item.nextElementSibling;
        content.classList.toggle("acordeon-web__content--active");
        item.parentNode.classList.toggle("acordeon-web__item--parent--active");
      });
    });
  }

  drawAcordeon(data);
  toggleAcordeon();
});
