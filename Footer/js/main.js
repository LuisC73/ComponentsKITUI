document.addEventListener("DOMContentLoaded", () => {
  /**
   * Esta función establece el contenido de texto de un elemento HTML en el año actual.
   */
  function yearCopyright() {
    const yearCopy = document.querySelector(".footerWeb__year");
    yearCopy.textContent = new Date().getFullYear();
  }

  yearCopyright();
});
