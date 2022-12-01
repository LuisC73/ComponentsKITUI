/* Inicio funcion boton subir arriba  */

const backGoToUpElement = document.querySelector(".scrollTop");

backGoToUpElement.addEventListener("click", backGoToUp, false);

function backGoToUp() {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

window.addEventListener("scroll", () => {
  let scrollTop = document.documentElement.scrollTop;
  scrollTop > 0
    ? (backGoToUpElement.style.transform = "scale(1)")
    : (backGoToUpElement.style.transform = "scale(0)");
});

/* Fin funcion boton subir arriba  */
