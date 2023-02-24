document.addEventListener("DOMContentLoaded", () => {
  const yearCopyright = document.getElementById("yearCopyright");

  let yearNow = new Date().getFullYear();

  yearCopyright.textContent = yearNow;
});
