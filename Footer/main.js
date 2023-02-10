document.addEventListener("DOMContentLoaded", () => {
  const dropFooterBtn = document.querySelector(".footer__button"),
    dropFooterContent = document.querySelector(".footer__dropdown");

  dropFooterBtn.addEventListener("click", () => {
    dropFooterContent.classList.toggle("footer__dropdown--active");
  });
});
