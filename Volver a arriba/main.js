//Inicio scroll top

window.addEventListener("DOMContentLoaded", () => {
  const $workpace = document.getElementById("s4-workspace"),
    $buttonScroll = document.getElementById("scrollUp");

  $workpace.addEventListener("scroll", () => {
    $workpace.scrollTop >= 400
      ? ($buttonScroll.style.transform = "scale(1)")
      : ($buttonScroll.style.transform = "scale(0)");

    if ($workpace.scrollTop == 0) $buttonScroll.style.opacity = "1";
  });

  $buttonScroll.addEventListener("click", () => {
    if ($workpace.scrollTop > 0) $workpace.scrollTo(0, 0);
    $buttonScroll.style.opacity = "0";
  });
});

//Fin scroll top

// si no funciona el primer metodo, puedes intentar con la siguiente....

//Inicio scroll top

window.addEventListener("scroll", () => {
  const $buttonScroll = document.getElementById("scrollUp");
  let scrollTop = document.documentElement.scrollTop;
  if (scrollTop > 0) {
    $buttonScroll.style.transform = "scale(1)";
    $menuprincipal.classList.add("menuprincipal--scroll");
  } else {
    $buttonScroll.style.transform = "scale(0)";
    $menuprincipal.classList.remove("menuprincipal--scroll");
  }

  if (scrollTop == 0) $buttonScroll.style.opacity = "1";
});

$buttonScroll.addEventListener("click", () => {
  let scrollTop = document.documentElement.scrollTop;
  if (scrollTop > 0) window.scrollTo(0, 0);
  $buttonScroll.style.opacity = "0";
});

//Fin scroll top
