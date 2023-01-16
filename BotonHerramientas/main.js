import buttonInformation from "./dataInformation.js";

document.addEventListener("DOMContentLoaded", () => {
  // Se inicializa constante con valor del boton
  const buttonFloat = document.querySelector(".floatButton"),
    buttonsContainer = document.querySelector(".floatButton__options");

  const fragmentContent = document.createDocumentFragment();

  for (const i in buttonInformation) {
    let button = document.createElement("a");

    button.classList.add("floatButton__item");
    button.classList.add(
      `floatButton__item--color${buttonInformation[i].color}`
    );

    if (buttonInformation[i].link !== "none") {
      button.innerHTML = `<i class="${buttonInformation[i].icon} floatButton__icon"></i>
      <span class="floatButton__tooltip"
        >${buttonInformation[i].text}</span>`;
    }

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

    button.setAttribute("href", buttonInformation[i].link);

    fragmentContent.appendChild(button);
  }

  buttonsContainer.appendChild(fragmentContent);

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
