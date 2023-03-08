document.addEventListener("DOMContentLoaded", () => {
  let windowUrl = window.location.href.toLowerCase();

  const allModules = [
    "transparencia",
    "ciudadanos",
    "conectividad",
    "mimunicipio",
    "NuestraAlcaldia",
    "proyectos",
    "notificaciones",
  ];

  const allMenuModule = document.querySelectorAll(".Menuprincipal h2 a"),
    initItem = document.querySelector(
      '.Menuprincipal h2 a[data-item="inicio"]'
    );

  const checkMenuItem = (allModules, windowUrl, itemsMenu) => {
    allModules.forEach((element) => {
      let modulePage = element.toLowerCase();
      if (windowUrl.search(`/${modulePage}`) > -1) {
        itemsMenu.forEach((item) => {
          let textItem = item.dataset.item.toLowerCase();
          if (textItem.search(modulePage) > -1) {
            item.classList.toggle("menu__active")
          }
        });
      }
    });
  };

  checkMenuItem(allModules, windowUrl, allMenuModule);
});
