const suitBar = document.getElementById("suiteBar").parentNode;

window.addEventListener("scroll", () => {
  suitBar.classList.toggle("suitBar--fixed", window.scrollY > 0);
});
