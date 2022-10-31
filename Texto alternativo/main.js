setTimeout(() => {
  document.querySelector("#imgTable img").setAttribute("alt", "tramiApp");
  document.querySelector("#imgTable a").setAttribute("aria-label", "tramiApp");
  // no seleccionar imagenes
  let images = document.querySelectorAll("img").forEach((img) => {
    img.setAttribute("tabindex", "-1");
    img.setAttribute("loading", "lazy");
    if (!img.hasAttribute("alt")) {
      img.setAttribute("alt", "imagen");
    }
  });
}, 4000);

let imagesNoticias = document.querySelectorAll(".w3_agile_event_grid1 img");
imagesNoticias.forEach((img) => img.setAttribute("alt", "imagenNoticias"));

let enlaces = document.querySelectorAll(".news-desc a");
enlaces.forEach((enlace) =>
  enlace.setAttribute("aria-label", "enlace sala de prensa")
);

let imagesPop = document.querySelectorAll(".modal-body img");
imagesPop.forEach((img) => img.setAttribute("alt", "imagen pop up"));

let enlacesPop = document.querySelectorAll(".modal-body a");
enlacesPop.forEach((enlace) =>
  enlace.setAttribute("aria-label", "enlace pop up")
);
