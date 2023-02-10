// Inicio opciones de seleccion

const $icons = document.querySelectorAll(".fa-circle"),
  $buttonsCheck = document.querySelectorAll(".ItemOpRtaV3");

function clearToggle(number) {
  $icons[number].classList.remove("icon--color");
}

function addToggle(number) {
  $icons.forEach((icon) => {
    icon.classList.remove("fa-circle");
    icon.classList.add("glyphicon");
    icon.classList.add("glyphicon-ok");
  });
  $icons[number].classList.remove("fas");
  $icons[number].classList.toggle("icon--color");
  $buttonsCheck[number].style.background = "none";
  $buttonsCheck[number].style.color = "#727272";
}

document.addEventListener("click", (e) => {
  if (e.target == $buttonsCheck[0]) {
    addToggle(0);
    clearToggle(1);
    clearToggle(2);
  }

  if (e.target == $buttonsCheck[1]) {
    addToggle(1);
    clearToggle(0);
    clearToggle(2);
  }

  if (e.target == $buttonsCheck[2]) {
    addToggle(2);
    clearToggle(0);
    clearToggle(1);
  }
});

// Fin opciones de seleccion
