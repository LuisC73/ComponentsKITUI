document.addEventListener("DOMContentLoaded", () => {
  let windowUrl = window.location.href.toLowerCase();

  const allModules = [
    "transparencia",
    "ciudadanos",
    "conectividad",
    "mimunicipio",
    "nuestraalcaldia",
    "proyectos",
    "notificaciones",
  ];

  const [initItem] = document.querySelector('Selector[data-item="inicio"]');
  const allMenuModule = [...document.querySelectorAll("Ingresar selector")];

  const toggleMenuActiveClass = (item) => {
    item.classList.toggle("menu__active");
  };

  const checkMenuItem = (modulePage, itemsMenu) => {
    itemsMenu.forEach((item) => {
      const textItem = item.dataset.item.toLowerCase();
      if (textItem.includes(modulePage)) {
        toggleMenuActiveClass(item);
      }
    });
  };

  const checkMenuItems = () => {
    allModules.forEach((element) => {
      const modulePage = element.toLowerCase();
      if (windowUrl.includes(`/${modulePage}`)) {
        checkMenuItem(modulePage, allMenuModule);
      }
    });
  };

  checkMenuItems();
});
