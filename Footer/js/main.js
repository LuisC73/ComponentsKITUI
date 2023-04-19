document.addEventListener("DOMContentLoaded", () => {
  function yearCopyright() {
    const yearCopy = document.querySelector(".footerWeb__year");

    yearCopy.textContent = new Date().getFullYear();
  }

  const lastModifiedWeb = document.getElementById("lastModifiedWeb");

  let lastModifiedDate = document.lastModified;

  function convertDateWeb(lastModified) {
    if (lastModified != null) {
      let dateModified = lastModified.split("/");

      let days = dateModified[1].toString(),
        month = dateModified[0].toString(),
        year = dateModified[2].split(" ")[0].toString(),
        hour = dateModified[2].split(" ")[1].toString();

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

      let hourModified = parseInt(hour.split(":")[0].toString()),
        minuteModified = parseInt(hour.split(":")[1].toString());

      minuteModified = minuteModified < 10 ? `0${minuteModified}` : minuteModified;

      let AmPm = hourModified >= 12 ? "pm" : "am";
      hourModified = hourModified % 12 || 12;
      finalTime = `${hourModified}:${minuteModified} ${AmPm}`;

      let dateNow = new Date();

      let hourNow = dateNow.getHours(),
        minutesNow = dateNow.getMinutes();

      let fullDate = `${monthText} ${days} ${year}, ${finalTime}`;

      let differenceHour = hourNow - hourModified;

      console.log(differenceHour);

      if (differenceHour < 11) {
        let differenceTime = minuteModified - minutesNow;
        fullDate = `Hace ${differenceTime} ${differenceTime > 1 ? "Minutos" : "Minuto"}`;

        if (minuteModified >= 60) {
          fullDate = `Hace ${differenceHour} ${differenceHour > 1 ? "Hora" : "Hora"}`;
        }
      }

      lastModifiedWeb.textContent = fullDate;
    }
  }

  yearCopyright();
  convertDateWeb(lastModifiedDate);
});
