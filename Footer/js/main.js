document.addEventListener("DOMContentLoaded", () => {
  const yearCopy = document.querySelector(".footerWeb__year");

  let yearNow = new Date().getFullYear();

  yearCopy.textContent = yearNow;

  let lastModifiedDate = document.lastModified;

  const lastModifiedWeb = document.getElementById("lastModifiedWeb");

  function convertDateWeb(date) {
    if (date != null) {
      let dateLocal = date.split("/");

      console.log(dateLocal);

      let days = dateLocal[1].toString(),
        month = dateLocal[0].toString(),
        year = dateLocal[2].split(" ")[0].toString(),
        hour = dateLocal[2].split(" ")[1].toString();

      console.log(hour);

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

      console.log(fullDate);

      lastModifiedWeb.textContent = fullDate;
    } else {
      return "Fecha";
    }
  }

  convertDateWeb(lastModifiedDate);
});
