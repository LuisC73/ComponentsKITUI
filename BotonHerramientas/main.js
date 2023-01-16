import buttonInformation from "./dataInformation.js";

document.addEventListener("DOMContentLoaded", () => {
  // Se inicializa constante con valor del boton y contenedor de opciones
  const buttonFloat = document.querySelector(".floatButton"),
    buttonsContainer = document.querySelector(".floatButton__options");

  // Se crea fragmento para insertar elementos.
  const fragmentContent = document.createDocumentFragment();

  // Apartir de importar la informacion de cada opcion se recorre el objeto
  for (const i in buttonInformation) {
    // Se crea elemento tipo enlace (a)
    let button = document.createElement("a");
    // Se agrega clase principal para elemento tipo opcion
    button.classList.add("floatButton__item");
    //Se cambia color del elemento
    button.style.background = `${buttonInformation[i].color}`;
    button.style.boxShadow = `0 20px 20px -10px ${buttonInformation[i].color}`;

    // Se ingresa atributo href al elemento
    button.setAttribute("href", buttonInformation[i].link);

    // Si el elemento es tipo icono se agrega el siguiente contenido
    if (buttonInformation[i].link !== "none") {
      button.innerHTML = `<i class="${buttonInformation[i].icon} floatButton__icon"></i>
      <span class="floatButton__tooltip"
        >${buttonInformation[i].text}</span>`;
    }

    // Si el elemento es tipo imagen se agrega el siguiente contenido
    if (buttonInformation[i].img !== "none") {
      button.innerHTML = `<img
      src="${buttonInformation[i].img}"
      alt="${buttonInformation[i].text}"
      class="floatButton__img ${
        buttonInformation[i].imgFit ? "floatButton__img--fit" : ""
      }"
    />
      <span class="floatButton__tooltip"
      >${buttonInformation[i].text}</span>`;
    }

    // Se insertan todos los elementos en el fragmento
    fragmentContent.appendChild(button);
  }

  // Se inserta fragmento en contenedor principal de opciones
  buttonsContainer.appendChild(fragmentContent);

  // Se crea funcion para activacion del boton y animacion a sus opciones
  function activeButtons() {
    buttonFloat.classList.toggle("floatButton--active");

    const button = document.querySelectorAll(".floatButton__item");

    button.forEach((el, i) => {
      el.style.animation
        ? (el.style.animation = "")
        : (el.style.animation = `come-in 0.4s forwards ${i / 4 + 0.2}s`);
    });
  }

  //Se realiza delegacion de eventos, especificamente en el evento click.
  document.addEventListener("click", (e) => {
    if (
      e.target === buttonFloat ||
      e.target.classList.contains("floatButton__button")
    ) {
      activeButtons();
    } else {
      buttonFloat.classList.remove("floatButton--active");
    }
  });
});
