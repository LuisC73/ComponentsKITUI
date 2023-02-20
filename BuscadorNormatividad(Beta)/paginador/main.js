export default function paginationItems(pagNumbers, pagItemContainer, pagItem) {
  const paginationNumbers = document.querySelector(pagNumbers);
  const paginatedList = document.querySelector(pagItemContainer);
  const total_items = paginatedList.querySelectorAll(pagItem);
  const nextButton = document.getElementById("pagNext-button");
  const prevButton = document.getElementById("pagPrev-button");

  //Ingresamos el limite de items para mostrar por pagina.
  const items_per_page = 5;
  /*Calculamos a partir de la cantidad de items en total existentes y el limite ingresado, cuantas paginas
  es necesario crear.*/
  const total_pages = Math.ceil(total_items.length / items_per_page);
  //Inicializamos con 1, indicando que la paginación inicia en esta pagina.
  let currentPage = 1;

  //Funcion para desabilitar el boton solicitado.
  const disableButton = (button) => {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
  };

  //Funcion para habilitar el boton solicitado.
  const enableButton = (button) => {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
  };

  /*Funcion para activar y desactivar el boton de "Anterior" y "Siguiente", cuando sea el momento indicado,
  Es decir desactivamos el boton de "Anterior" en la pagina inicial y el boton "Siguiente" en la pagina final */
  const handlePageButtonsStatus = () => {
    if (currentPage === 1) {
      disableButton(prevButton);
    } else {
      enableButton(prevButton);
    }

    if (total_pages === currentPage) {
      disableButton(nextButton);
    } else {
      enableButton(nextButton);
    }
  };

  //Funcion para activar el botón dependiendo si el numero coincide con la pagina.
  const handleActivePageNumber = () => {
    document.querySelectorAll(".paginationItems__number").forEach((button) => {
      button.classList.remove("active");
      const pageIndex = Number(button.getAttribute("page-index"));
      if (pageIndex == currentPage) {
        button.classList.add("active");
      }
    });

    if (currentPage > 4) {
      document.querySelector(".paginationItems__dots").classList.add("active");
    }
  };

  //Funcion para crear los diferentes botones de numeración de las paginas.
  const appendPageNumber = (index) => {
    const pageNumber = document.createElement("button");
    pageNumber.className = "paginationItems__number";
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index", index);
    pageNumber.setAttribute("aria-label", "Page " + index);

    paginationNumbers.appendChild(pageNumber);
  };

  const appendDots = () => {
    const dots = document.createElement("button");
    dots.className = "paginationItems__dots";
    dots.innerHTML = "...";
    dots.setAttribute("aria-label", "More pages");

    paginationNumbers.appendChild(dots);
  };

  const appendLastPage = (total_pages) => {
    const pageNumber = document.createElement("button");
    pageNumber.className = "paginationItems__number";
    pageNumber.innerHTML = total_pages;
    pageNumber.setAttribute("page-index", total_pages);
    pageNumber.setAttribute("aria-label", "Page " + total_pages);

    paginationNumbers.appendChild(pageNumber);
  };

  const getPaginationNumbers = () => {
    if (total_pages <= 4) {
      for (let i = 1; i <= total_pages; i++) {
        appendPageNumber(i);
      }
    } else {
      for (let i = 1; i <= 4; i++) {
        appendPageNumber(i);
      }
      appendDots();
      appendLastPage(total_pages);
    }
  };

  const setCurrentPage = (pageNum) => {
    currentPage = pageNum;

    handleActivePageNumber();
    handlePageButtonsStatus();

    const prevRange = (pageNum - 1) * items_per_page;
    const currRange = pageNum * items_per_page;

    total_items.forEach((item, index) => {
      item.classList.add("hidden");
      if (index >= prevRange && index < currRange) {
        item.classList.remove("hidden");
      }
    });

    const pagButtons = document.querySelectorAll(".paginationItems__number");
    const firstButton = pagButtons[0];
    const lastButton = pagButtons[pagButtons.length - 1];

    console.log(firstButton);
    console.log(lastButton);
  };

  getPaginationNumbers();
  setCurrentPage(1);

  prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });

  nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
  });

  document.querySelectorAll(".paginationItems__number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));

    if (pageIndex) {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        setCurrentPage(pageIndex);
      });
    }
  });
}
