document.addEventListener("DOMContentLoaded", () => {
  let swiper = new Swiper(".slider-noticia-web__carousel", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".slider-noticia-web__button--right",
      prevEl: ".slider-noticia-web__button--left",
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
  });

  const imageOne = document.querySelector(".ImgNoticia .ms-rtestate-field img");

  document.addEventListener("click", (e) => {
    if (e.target.matches(".slider-noticia-web__img")) imageOne.src = e.target.src;
  });

  (function detectNewsPage() {
    const windowUrl = location.href;

    let pageFileName = windowUrl.split("/")[6];

    consultIdNews(pageFileName).catch((error) => {
      console.error(error.message);
    });
  })();

  async function consultIdNews(pageFileName) {
    const modulePage = "NuestraAlcaldia/SaladePrensa";
    const folder = "Páginas";
    const params = ["ID", "LinkFilename"];

    let urlSearch = `${location.protocol}//${location.host}/${modulePage}/_api/web/lists/getbytitle('${folder}')/items?$select=${params}&$orderby=ID%20asc&$top=10000`;

    let data = await fetch(urlSearch, {
      method: "GET",
      headers: {
        Accept: "application/json; odata=verbose",
      },
    });

    if (!data.ok) {
      const message = `Error en Consulta de Noticias: ${data.status} - ${data.statusText}`;
      throw new Error(message);
    } else {
      let response = await data.json();
      let idPage = 0;
      let arrayInfo = response.d.results;

      let filteredResults = arrayInfo
        .map((item) => {
          return {
            LinkFilename: item.LinkFilename,
            ID: item.ID,
          };
        })
        .filter((item) => item.LinkFilename === pageFileName);

      if (filteredResults.length > 0) {
        idPage = filteredResults[0].ID;
        consultImageNews(idPage);
      }
    }
  }

  async function consultImageNews(idPage) {
    const modulePage = "NuestraAlcaldia/SaladePrensa";
    const folder = "ImagenesNoticias";
    const params = ["ID", "Texto_x0020_alternativo", "IdNoticia", "FileRef"];

    let urlSearch = `${location.protocol}//${location.host}/${modulePage}/_api/web/lists/getbytitle('${folder}')/items?$select=${params}&$orderby=ID%20asc&$top=10&$filter=IdNoticia eq '${idPage}'`;

    let data = await fetch(urlSearch, {
      method: "GET",
      headers: {
        Accept: "application/json; odata=verbose",
      },
    });

    if (!data.ok) {
      const message = `Error en Consulta de Imagenes: ${data.status} - ${data.statusText}`;
      throw new Error(message);
    } else {
      let response = await data.json();
      drawImagesCarousel(response);
    }
  }

  const sliderContainerData = document.getElementById("SliderNewsContent");
  const sliderSection = document.querySelector(".slider-noticia-web");
  const sliderButtons = document.querySelectorAll(".slider-noticia-web__button");

  const drawImagesCarousel = (response) => {
    let information = response.d.results;

    if (information.length > 0) sliderSection.classList.remove("slider-noticia-web--hide");

    information.length <= 3
      ? sliderButtons.forEach((btn) => btn.classList.add("slider-noticia-web__button--hide"))
      : sliderButtons.forEach((btn) => btn.classList.remove("slider-noticia-web__button--hide"));

    const fragmentContent = document.createDocumentFragment();

    for (const i in information) {
      const { FileRef, Texto_x0020_alternativo } = information[i];

      let itemImg = document.createElement("li");
      itemImg.classList.add("swiper-slide");
      itemImg.classList.add("slider-noticia-web__item");

      let img = document.createElement("img");
      img.classList.add("slider-noticia-web__img");
      img.setAttribute("src", FileRef);
      img.setAttribute("alt", Texto_x0020_alternativo);
      img.setAttribute("loading", "lazy");

      itemImg.appendChild(img);

      fragmentContent.appendChild(itemImg);
    }

    sliderContainerData.appendChild(fragmentContent);
  };
});
