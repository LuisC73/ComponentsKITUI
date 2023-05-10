"use strict";

import data from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const containerAcordeon = document.getElementById("AcordeonContent");

  function drawAcordeon(data) {
    // const data = response.d.results;

    const typesContet = Object.freeze({
      NORMAL: "Normal",
      TEXT: "Texto",
      IMAGE: "Imagen",
    });

    const ul = document.createElement("ul");
    ul.classList.add("acordeon-web__ul");
    const fragmentDocument = document.createDocumentFragment();

    for (const { Title, IdPrincipal, Enlace, IdPadre, TipoContenido, Contenido } of data) {
      const li = document.createElement("li");
      li.classList.add("acordeon-web__item");
      li.setAttribute("data-item", IdPrincipal);

      if (TipoContenido === typesContet.NORMAL) {
        const link = document.createElement("a");
        link.classList.add("acordeon-web__link");
        link.textContent = Title;
        link.href = Enlace;
        li.appendChild(link);
      } else if (TipoContenido === typesContet.TEXT) {
        const paragraphContainer = document.createElement("div");
        paragraphContainer.classList.add("acordeon-web__text-content");
        const title = document.createElement("h2");
        title.classList.add("acordeon-web__text-title");
        title.textContent = Title;
        const paragraph = document.createElement("p");
        paragraph.classList.add("acordeon-web__p");
        paragraph.innerHTML = Contenido;
        paragraphContainer.appendChild(title);
        paragraphContainer.appendChild(paragraph);
        li.appendChild(paragraphContainer);
      } else if (TipoContenido === typesContet.IMAGE) {
        const imageContainer = document.createElement("figure");
        const imageTitle = document.createElement("figcaption");
        imageTitle.classList.add("acordeon-web__fig");
        imageContainer.classList.add("acordeon-web__figure");
        const image = document.createElement("img");
        image.classList.add("acordeon-web__img");
        image.alt = Title;
        image.src = Contenido;
        imageTitle.textContent = Title;
        imageContainer.appendChild(image);
        imageContainer.insertBefore(imageTitle, image);
        li.appendChild(imageContainer);
      }

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

  function addIcon() {
    const allParent = document.querySelectorAll(".acordeon-web__item--parent > a");

    allParent.forEach((el) => {
      const icon = document.createElement("i");
      icon.classList.add("acordeon-web__icon");
      el.appendChild(icon);
    });
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
  addIcon();
  toggleAcordeon();
});
