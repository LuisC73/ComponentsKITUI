document.addEventListener("DOMContentLoaded", () => {
  const yearCopy = document.querySelector(".footerWeb__year"),
    lastModifiedWeb = document.getElementById("lastModifiedWeb");

  yearCopy.textContent = new Date().getFullYear();

  let lastModifiedDate = document.lastModified;

  function convertDateWeb(date) {
    if (date != null) {
      let dateLocal = date.split("/");

      let days = dateLocal[1].toString(),
        month = dateLocal[0].toString(),
        year = dateLocal[2].split(" ")[0].toString(),
        hour = dateLocal[2].split(" ")[1].toString();

      let monthText = "";

      const MONTHS = {
        Enero: "01",
        Febrero: "02",
        Marzo: "03",
        Abril: "04",
        Mayo: "05",
        Junio: "06",
        Julio: "07",
        Agosto: "08",
        Septiembre: "09",
        Octubre: "10",
        Noviembre: "11",
        Diciembre: "12",
      };

      for (const i in MONTHS) {
        if (month === MONTHS[i]) monthText = i;
      }

      let hourWeb = parseInt(hour.split(":")[0].toString()),
        minuteWeb = parseInt(hour.split(":")[1].toString());

      minuteWeb = minuteWeb < 10 ? `0${minuteWeb}` : minuteWeb;

      let AmPm = hourWeb >= 12 ? "pm" : "am";
      hourWeb = hourWeb % 12 || 12;
      finalTime = `${hourWeb}:${minuteWeb} ${AmPm}`;

      let fullDate = `${monthText} ${days} ${year}, ${finalTime}`;

      lastModifiedWeb.textContent = fullDate;
    }
  }

  convertDateWeb(lastModifiedDate);
});
