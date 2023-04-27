/* Se agrega un listener al evento "DOMContentLoaded" que se dispara una vez que la página ha cargado completamente. */
document.addEventListener("DOMContentLoaded", () => {
  /* Se obtiene la URL de la página actual en minúsculas y se almacena en la variable windowUrl. */
  let windowUrl = window.location.href.toLowerCase();

  /** Se define un array llamado allModules que contiene los nombres de módulos. */
  const allModules = [
    "transparencia",
    "ciudadanos",
    "conectividad",
    "saladeprensa",
    "nuestraalcaldia/paginas",
    "normativa",
  ];

  /** Se obtiene el primer elemento que coincide con el selector 'Selector[data-item="inicio"]' y se almacena en la variable initItem. */
  const initItem = document.querySelector('Selector[data-item="inicio"]');
  /** Se obtienen todos los elementos que coinciden con el selector especificado y se almacenan en la variable allMenuModule como un array. */
  const allMenuModule = [...document.querySelectorAll("#main-menu li h2")];

  const addDatasetItem = () => {
    allMenuModule.forEach((item, itemIndex) => {
      allModules.forEach((module, moduleIndex) => {
        if (itemIndex === moduleIndex) item.setAttribute("data-item", module);
      });
    });
  };

  /** Se define una función llamada toggleMenuActiveClass que toma un argumento item y agrega o quita la clase menu__active al elemento. */
  const toggleMenuActiveClass = (item) => {
    item.classList.toggle("menu__active");
  };

  /** Se define una función llamada checkMenuItem que toma dos argumentos, modulePage y itemsMenu.
   * La función recorre todos los elementos del array itemsMenu, obtiene el valor del atributo data-item
   *  y lo convierte en minúsculas. Si el valor incluye el nombre del módulo pasado como argumento, la función llama a
   * toggleMenuActiveClass para agregar o quitar la clase menu__active. */
  const checkMenuItem = (modulePage, itemsMenu) => {
    itemsMenu.forEach((item) => {
      const textItem = item.dataset.item.toLowerCase();
      if (textItem.includes(modulePage)) {
        toggleMenuActiveClass(item);
      }
    });
  };

  /** Se define una función llamada checkMenuItems que recorre el array allModules.
   * Para cada elemento del array, la función convierte el nombre del módulo en minúsculas y verifica si la URL
   * de la página actual contiene el nombre del módulo. Si es así, la función llama a checkMenuItem para agregar o quitar
   * la clase menu__active a los elementos del menú correspondientes. */
  const checkMenuItems = () => {
    addDatasetItem();
    allModules.forEach((element) => {
      const modulePage = element.toLowerCase();
      if (windowUrl.includes(`/${modulePage}`)) {
        checkMenuItem(modulePage, allMenuModule);
      }
    });
  };

  /** Se llama a la función checkMenuItems una vez que la página ha cargado completamente. */
  checkMenuItems();
});
