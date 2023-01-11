document.addEventListener("DOMContentLoaded", () => {
  const btnTranslate = document.querySelector(".translateElement__select"),
    translateOptions = document.querySelector(".translateElement__options"),
    optionsTranslate = document.querySelectorAll(".translateElement__a");

  document.addEventListener("click", (e) => {
    if (e.target === btnTranslate || e.target === `${btnTranslate} > *`) {
      translateOptions.classList.toggle("translateElement__options--active");
    } else {
      translateOptions.classList.remove("translateElement__options--active");
    }
  });

  function translateLanguage(lang) {
    let $frame = $(".goog-te-menu-frame:first");

    $frame
      .contents()
      .find(".goog-te-menu2-item span.text:contains(" + lang + ")")
      .get(0)
      .click();
    return false;
  }

  optionsTranslate.forEach((el) => {
    el.addEventListener("click", () => {
      let lang = el.getAttribute("data-lang");
      translateLanguage(lang);
    });
  });
});