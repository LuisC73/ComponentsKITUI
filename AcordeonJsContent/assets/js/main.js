"use strict";

import data from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const containerAcordeon = document.getElementById("AcordeonContent");

  const typesContet = Object.freeze({
    NORMAL: "Normal",
    TEXT: "Texto",
    IMAGE: "Imagen",
  });

  const organizeData = (data) => {
    // const data = response.d.results;

    const organizedData = [];
    const parentIdMap = {};

    data.forEach((node) => {
      if (node.IdPadre === null) {
        organizedData.push(node);
      } else {
        parentIdMap[node.IdPadre] = parentIdMap[node.IdPadre] || [];
        parentIdMap[node.IdPadre].push(node);
      }
    });

    organizedData.forEach((parentNode) => {
      parentNode.children = parentIdMap[parentNode.IdPrincipal] || [];
    });

    organizedData.sort((a, b) => a.Orden - b.Orden);

    return organizedData;
  };

  function createParentsAccordion(info) {
    const containerList = document.createElement("ul");
    containerList.classList.add("acordeon-web__ul");
    const fragmentDocument = document.createDocumentFragment();

    for (const { Title, Enlace, IdPadre, children } of info) {
      const element = document.createElement("li");
      element.classList.add("acordeon-web__item");
      element.innerHTML = `<a class="acordeon-web__link" href="${Enlace}">${Title}</a>`;

      if (IdPadre === null) element.classList.add("acordeon-web__item--parent");

      const childrenInfo = children.sort((a, b) => a.Orden - b.Orden);

      containerList.appendChild(element);
      fragmentDocument.appendChild(containerList);
      if (children.length !== 0) createTreeAccordion(childrenInfo, element);
    }

    containerAcordeon.appendChild(fragmentDocument);
  }

  function createTreeAccordion(children, parent) {
    let ulChild = parent.querySelector("ul");

    if (!ulChild) {
      ulChild = document.createElement("ul");
      ulChild.classList.add("acordeon-web__content");
      parent.appendChild(ulChild);
    }

    const fragmentTree = document.createDocumentFragment();

    for (const { Title, Enlace, TipoContenido, Contenido } of children) {
      const element = document.createElement("li");
      element.classList.add("acordeon-web__item");

      switch (TipoContenido) {
        case typesContet.NORMAL:
          element.innerHTML = `<a class="acordeon-web__link" href="${Enlace}">${Title}</a>`;
          break;
        case typesContet.TEXT:
          element.innerHTML = `
            <div class="acordeon-web__text-content">
              <h2 class="acordeon-web__text-title">${Title}</h2>
              <p class="acordeon-web__p">${Contenido}</p>
            </div>`;
          break;
        case typesContet.IMAGE:
          element.innerHTML = `
            <figure class="acordeon-web__figure">
              <img class="acordeon-web__img" src="${Contenido}" alt="${Title}">
              <figcaption class="acordeon-web__fig">${Title}</figcaption>
            </figure>`;
          break;
        default:
          console.log("Tipo de Contenido no reconocido");
      }

      fragmentTree.appendChild(element);
    }

    ulChild.appendChild(fragmentTree);
    addGalleryParent(ulChild);
  }

  function addGalleryParent(parent) {
    const images = parent.querySelectorAll("img");

    if (images.length > 1) parent.classList.add("acordeon-web__content--gallery");
  }

  function addIconItemParent() {
    const allParent = document.querySelectorAll(".acordeon-web__item--parent > a");
    allParent.forEach((el) => {
      const icon = document.createElement("i");
      icon.classList.add("acordeon-web__icon");
      el.appendChild(icon);
    });
  }

  function handleToggleAccordion() {
    const parentItems = document.querySelectorAll(".acordeon-web__item--parent a");
    parentItems.forEach((item) => {
      item.addEventListener("click", () => {
        let content = item.nextElementSibling;
        if (content !== null) {
          content.classList.toggle("acordeon-web__content--active");
          item.parentNode.classList.toggle("acordeon-web__item--parent--active");
        }
      });
    });
  }

  createParentsAccordion(organizeData(data));
  addIconItemParent();
  handleToggleAccordion();
});
