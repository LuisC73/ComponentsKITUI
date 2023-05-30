import data from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const btnCircle = document.querySelector(".buttonCircle__div"),
    contentCircle = document.querySelector(".buttonCircle"),
    containerCircle = document.querySelector(".buttonCircle__options");

  btnCircle.addEventListener("click", () => {
    contentCircle.classList.toggle("buttonCircle--active");
  });

  // Se crea fragmento para insertar elementos.
  const fragmentContent = document.createDocumentFragment();

  for (const i in data) {
    // Se crea elemento tipo enlace (a)
    let button = document.createElement("a");
    // Se agrega clase principal para elemento tipo opcion
    button.classList.add("buttonCircle__btn");
    // Se ingresa atributo href al elemento
    button.setAttribute("href", data[i].link);
    // Si el elemento es tipo icono se agrega el siguiente contenido
    if (data[i].link !== "none") {
      button.innerHTML = `
        <i class="${data[i].icon} buttonCircle__icon"></i>
        <span class="buttonCircle__tooltip">${data[i].text}</span>`;
    }
    // Se insertan todos los elementos en el fragmento
    fragmentContent.appendChild(button);
  }

  // Se inserta fragmento en contenedor principal de opciones
  containerCircle.appendChild(fragmentContent);

  const allItems = document.querySelectorAll(".buttonCircle__btn");

  allItems.forEach((item, i) => {
    item.style.transitionDelay = `0.${(i / 2) * 2}s`;
  });

  let tamañoTotal = parseInt(allItems.length) - 1;

  allItems[0].style.left = `2px`;
  allItems[0].style.top = `85px`;
  allItems[tamañoTotal].style.left = `2px`;
  allItems[tamañoTotal].style.top = `-85px`;

  if (allItems.length === 7) {
    allItems[1].style.left = "40px";
    allItems[1].style.top = "61px";
    allItems[2].style.left = "75px";
    allItems[2].style.top = "37px";
    allItems[3].style.left = "94px";
    allItems[3].style.top = "0px";
    allItems[4].style.left = "75px";
    allItems[4].style.top = "-37px";
    allItems[5].style.left = "40px";
    allItems[5].style.top = "-61px";
  } else if (allItems.length === 6) {
    allItems[1].style.left = "47px";
    allItems[1].style.top = "61px";
    allItems[2].style.left = "85px";
    allItems[2].style.top = "30px";
    allItems[3].style.left = "85px";
    allItems[3].style.top = "-30px";
    allItems[4].style.left = "47px";
    allItems[4].style.top = "-61px";
  } else if (allItems.length === 5) {
    allItems[1].style.left = "50px";
    allItems[1].style.top = "50px";
    allItems[2].style.left = "85px";
    allItems[2].style.top = "0px";
    allItems[3].style.left = "50px";
    allItems[3].style.top = "-50px";
  } else if (allItems.length === 4) {
    allItems[1].style.left = "55px";
    allItems[1].style.top = "43px";
    allItems[2].style.left = "55px";
    allItems[2].style.top = "-43px";
    allItems.forEach((el) => {
      el.style.width = "42px";
      el.style.height = "42px";
    });
  } else if (allItems.length === 3) {
    allItems[1].style.left = "72px";
    allItems[1].style.top = "0px";
    allItems.forEach((el) => {
      el.style.width = "45px";
      el.style.height = "45px";
    });
  } else {
    console.log("No hay items");
  }
});
