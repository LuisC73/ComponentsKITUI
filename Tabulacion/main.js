// iframe twitter
setTimeout(() => {
  let iframeTwitter = document.querySelector("#twitter-widget-0");
  iframeTwitter.setAttribute("tabindex", "-1");
  iframeTwitter.setAttribute("loading", "lazy");
  iframeTwitter.setAttribute("title", "redes");
  let iframes = document.querySelectorAll("iframe");
  iframes.forEach((el) => {
    el.setAttribute("tabindex", "-1");
    el.setAttribute("loading", "lazy");
  });
}, 4000);

// no seleccionar imagenes
let images = document.querySelectorAll("img").forEach((img) => { img.setAttribute("tabindex", "-1") });

// enlaces de carrusel
let itemsCarousel = document.querySelectorAll("#carousel1 > div > .carousel-item > a").forEach((el) => el.setAttribute("tabindex", "-1"));

// imagenes seccion patrocinadores
let imgPatrocinadores = document.querySelectorAll("#patrocinadores > li > a").forEach((el) => el.setAttribute("tabindex", "-1"));

//enlaces en seccion de noticias
let itemsNoticias = document.querySelectorAll("#news .agileits_w3layouts_event_grid1 a").forEach((el) => el.setAttribute("tabindex", "-1"))

//enlaces en seccion de cambiando
let itemsCambiando = document.querySelectorAll("#cambiando .agileits_w3layouts_event_grid1 a").forEach((el) => el.setAttribute("tabindex", "-1"))