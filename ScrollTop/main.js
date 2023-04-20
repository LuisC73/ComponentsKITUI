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

// ---------------- El siguiente codigo es por si no funciona el primero ----------------

document.addEventListener("DOMContentLoaded", () => {
  /* Inicio funcion boton subir arriba  */
  /* Estas líneas de código seleccionan los elementos HTML con los ID "s4-workspace" y "scrollTop"
    respectivamente y asignándolos a las variables `pageContainer` y `scrollButton` usando el
    Métodos `document.getElementById()` y `document.querySelector()`. Estas variables se utilizan luego en
    los detectores de eventos para agregar funcionalidad al botón de desplazamiento y al contenedor de la página. */
  const pageContainer = document.getElementById("s4-workspace");
  const scrollButton = document.querySelector(".scrollTop");

  pageContainer.addEventListener("scroll", () => {
    /* Este código verifica si la posición de desplazamiento vertical del elemento `pageContainer` es mayor
    que o igual a 400 píxeles. Si es así, establece la propiedad `transform` del
    elemento `scrollButton` a `scale(1)` (lo que hace que el botón sea visible). Si no lo es, entonces
    establece la propiedad `transform` del elemento `scrollButton` en `scale(0)` (que oculta el
    botón). Este código es responsable de mostrar u ocultar el botón de desplazamiento hacia arriba según el
    posición de desplazamiento del usuario. */
    pageContainer.scrollTop >= 400
      ? (scrollButton.style.transform = "scale(1)")
      : (scrollButton.style.transform = "scale(0)");

    /* Esta línea de código comprueba si el usuario se ha desplazado hasta la parte superior de la página (donde `scrollTop`
    es igual a 0) y si es así, establece la opacidad del elemento `scrollButton` a 1, haciéndolo
    visible. */
    if (pageContainer.scrollTop == 0) scrollButton.style.opacity = "1";
  });

  scrollButton.addEventListener("click", () => {
    /* Este código verifica si el usuario se ha desplazado hacia abajo en la página (es decir, `scrollTop` es mayor que
      0). Si el usuario se ha desplazado hacia abajo, utiliza el método `scrollTo()` para desplazar la página hacia atrás.
      hasta la parte superior (es decir, `scrollTo(0, 0)`). Esto es parte de la funcionalidad para "volver arriba"
      botón. */
    if (pageContainer.scrollTop > 0) pageContainer.scrollTo(0, 0);
    /* `scrollButton.style.opacity = "0";` establece la opacidad del elemento `scrollButton` en 0,
    haciéndolo invisible. Esto es parte de la funcionalidad del botón "desplazarse hacia arriba", donde el
    El botón debe desaparecer después de que el usuario haga clic en él y la página se desplace hacia arriba. */
    scrollButton.style.opacity = "0";
  });
  /* Fin funcion boton subir arriba  */
});
