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

/* Inicio funcion boton subir arriba  */
document.addEventListener("DOMContentLoaded", () => {
  const $workpace = document.getElementById('s4-workspace'),
    $buttonScroll = document.querySelector('.scrollTop');

  $workpace.addEventListener('scroll', () => {
    ($workpace.scrollTop >= 400) 
    ? $buttonScroll.style.transform = "scale(1)": $buttonScroll.style.transform = "scale(0)"

    if ($workpace.scrollTop == 0) $buttonScroll.style.opacity = "1"
  })

  $buttonScroll.addEventListener('click', () => {
    if ($workpace.scrollTop > 0) $workpace.scrollTo(0, 0)
    $buttonScroll.style.opacity = "0"
  })
})
/* Fin funcion boton subir arriba  */