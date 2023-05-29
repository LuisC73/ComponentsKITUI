"use strict";

import buttonsData from "./buttons-data.js";

document.addEventListener("DOMContentLoaded", () => {
  const containerButtons = document.querySelector(".floatButtonBottom__options");
  const fragmentContent = document.createDocumentFragment();

  for (const { text, icon, link, target } of buttonsData) {
    const buttonItem = document.createElement("li");
    buttonItem.classList.add("floatButtonBottom__btn");

    const buttonWrapper = document.createElement("a");
    buttonWrapper.classList.add("floatButtonBottom__link");
    buttonWrapper.href = link;
    if (target) buttonWrapper.target = "_blank";
    buttonWrapper.innerHTML = `<i class="${icon} floatButtonBottom__icon" aria-hidden="true"></i><span class="floatButtonBottom__tooltip">${text}</span>`;

    buttonItem.appendChild(buttonWrapper);
    fragmentContent.appendChild(buttonItem);
  }

  containerButtons.appendChild(fragmentContent);

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("floatButtonBottom__button")) {
      e.preventDefault();
      containerButtons.classList.toggle("floatButtonBottom__options--active");
      e.target.classList.toggle("floatButtonBottom__button--active");
    }
  });
});
