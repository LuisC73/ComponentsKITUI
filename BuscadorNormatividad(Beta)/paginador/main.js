export default function paginationItems(pagNumbers, pagItemContainer, pagItem) {
  const paginationNumbers = document.querySelector(pagNumbers);
  const paginatedList = document.querySelector(pagItemContainer);
  const listItems = paginatedList.querySelectorAll(pagItem);
  const nextButton = document.getElementById("pagNext-button");
  const prevButton = document.getElementById("pagPrev-button");

  //Ingresamos el limite de items para mostrar por pagina.
  const paginationLimit = 5;
  /*Calculamos a partir de la cantidad de items en total existentes y el limite ingresado, cuantas paginas
    es necesario crear.*/
  const pageCount = Math.ceil(listItems.length / paginationLimit);
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

    if (pageCount === currentPage) {
      disableButton(nextButton);
    } else {
      enableButton(nextButton);
    }
    // uptadePagination();
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

  const getPaginationNumbers = () => {
    for (let i = 1; i <= pageCount; i++) {
      appendPageNumber(i);
    }
  };

  const uptadePagination = () => {
    const pagItems = document.querySelectorAll(`.paginationItems__number`);

    pagItems.forEach((el) => {
      el.classList.add("hiddenItem");
    });

    const maxVisibleItems = 5;
    const maxVisiblePageIndex = Math.min(
      currentPage + maxVisibleItems,
      pageCount
    );
    const minVisiblePageIndex = Math.max(
      maxVisiblePageIndex - maxVisibleItems,
      1
    );

    for (let i = minVisiblePageIndex; i < maxVisiblePageIndex; i++) {
      pagItems[i - 1].classList.remove("hiddenItem");
    }

    pagItems.forEach((el) => {
      el.addEventListener("click", () => {
        const visibleItems =
          document.getElementsByClassName("hiddenItem").length;

        for (let i = visibleItems; i < visibleItems + maxVisibleItems; i++) {
          if (pagItems[i]) {
            pagItems[i].classList.remove("hiddenItem");
          }
        }

        for (let i = 0; i < visibleItems; i++) {
          if (pagItems[i]) {
            pagItems[i].classList.add("hiddenItem");
          }
        }
      });
    });
  };

  const setCurrentPage = (pageNum) => {
    currentPage = pageNum;

    handleActivePageNumber();
    handlePageButtonsStatus();

    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;

    listItems.forEach((item, index) => {
      item.classList.add("hidden");
      if (index >= prevRange && index < currRange) {
        item.classList.remove("hidden");
      }
    });
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
