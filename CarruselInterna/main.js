function LoadCabezote() {
  let strmodac = "";
  if (
    document.location.href.toLowerCase().indexOf("/nuestraalcaldia/sala") > -1
  ) {
    strmodac = "Sala de Prensa";
  } else {
    if (document.location.href.toLowerCase().indexOf("/mimunicipio") > -1) {
      strmodac = "Mi Municipio";
    } else {
      if (
        document.location.href.toLowerCase().indexOf("/nuestraalcaldia") > -1
      ) {
        strmodac = "Nuestra Alcaldía";
      } else {
        if (document.location.href.toLowerCase().indexOf("/ciudadanos") > -1) {
          strmodac = "Atención y servicios a la ciudadanía";
        } else {
          if (document.location.href.toLowerCase().indexOf("/proyectos") > -1) {
            strmodac = "Proyectos";
          } else {
            if (
              document.location.href.toLowerCase().indexOf("/transparencia") >
              -1
            ) {
              strmodac = "Transparencia y acceso a la información pública";
            } else {
              if (
                document.location.href.toLowerCase().indexOf("/conectividad") >
                -1
              ) {
                strmodac = "Participa";
              } else {
                strmodac = "Home";
              }
            }
          }
        }
      }
    }
  }
  if (strmodac != "Home") {
    $.ajax({
      url:
        location.protocol +
        "//" +
        location.host +
        "/_api/web/lists/getbytitle('CabezotesModulos')/items?$select=ID,Title,Modulo,Description,FileLeafRef&$orderby=ID%20desc&$filter=Modulo eq '" +
        strmodac +
        "'",
      method: "GET",
      headers: { Accept: "application/json; odata=verbose" },
      success: onSuccessLoadCabezotes,
      error: onError,
    });
  }
}

function onSuccessLoadCabezotes(data) {
  let resultados = data.d.results,
    strHtml = "",
    strDesc = "";

  const containerSlider = document.querySelector(".bannerInterna__slider");

  resultados.forEach((el) => {
    if (el.Description != null) strDesc = el.Description;

    strHtml +=
      '<div class="bannerInterna__item"><img src="/CabezotesModulos/' +
      el.FileLeafRef +
      '" alt="' +
      el.Title +
      '" class="bannerInterna__img" /><div class="bannerInterna__content"><p>' +
      el.Title +
      "</p></div></div>";
  });

  containerSlider.innerHTML = strHtml;

  //funcion para slider interna

  const slideContainer = document.querySelector(".bannerInterna");
  const slide = document.querySelector(".bannerInterna__slider");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");
  const interval = 6000;

  let slides = document.querySelectorAll(".bannerInterna__item");
  let index = 1;
  let slideId;

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  firstClone.id = "first-clone";
  lastClone.id = "last-clone";

  slide.append(firstClone);
  slide.prepend(lastClone);

  const slideWidth = slides[index].clientWidth;

  slide.style.transform = `translateX(${-slideWidth * index}px)`;

  console.log(slides);

  const startSlide = () => {
    slideId = setInterval(() => {
      moveToNextSlide();
    }, interval);
  };

  const getSlides = () => document.querySelectorAll(".bannerInterna__item");

  slide.addEventListener("transitionend", () => {
    slides = getSlides();
    if (slides[index].id === firstClone.id) {
      slide.style.transition = "none";
      index = 1;
      slide.style.transform = `translateX(${-slideWidth * index}px)`;
    }

    if (slides[index].id === lastClone.id) {
      slide.style.transition = "none";
      index = slides.length - 2;
      slide.style.transform = `translateX(${-slideWidth * index}px)`;
    }
  });

  const moveToNextSlide = () => {
    slides = getSlides();
    if (index >= slides.length - 1) return;
    index++;
    slide.style.transition = ".7s ease-out";
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  };

  const moveToPreviousSlide = () => {
    if (index <= 0) return;
    index--;
    slide.style.transition = ".7s ease-out";
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  };

  slideContainer.addEventListener("mouseenter", () => {
    clearInterval(slideId);
  });

  slideContainer.addEventListener("mouseleave", startSlide);
  nextBtn.addEventListener("click", moveToNextSlide);
  prevBtn.addEventListener("click", moveToPreviousSlide);

  startSlide();
}
