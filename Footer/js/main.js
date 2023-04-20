document.addEventListener("DOMContentLoaded", () => {
  /**
   * Esta función establece el contenido de texto de un elemento HTML en el año actual.
   */
  function yearCopyright() {
    const yearCopy = document.querySelector(".footerWeb__year");
    yearCopy.textContent = new Date().getFullYear();
  }

  /* `const lastModifiedWeb = document.getElementById("lastModifiedWeb");` está seleccionando un elemento HTML
  con el ID "lastModifiedWeb" y asignándolo a la variable constante `lastModifiedWeb`. Este
  se usa para mostrar información sobre la última vez que se modificó la página web. */
  const lastModifiedWeb = document.getElementById("lastModifiedWeb");

  function updateLastModifiedDate() {
    /* `const MESES` es un objeto que asigna la representación numérica de cada mes (01-12) a su
   nombres correspondientes en español. Esto se usa en la función `updateLastModifiedDate()` para
   mostrar la última fecha de modificación de la página web en un formato más legible. */
    const MONTHS = {
      "01": "Enero",
      "02": "Febrero",
      "03": "Marzo",
      "04": "Abril",
      "05": "Mayo",
      "06": "Junio",
      "07": "Julio",
      "08": "Agosto",
      "09": "Septiembre",
      10: "Octubre",
      11: "Noviembre",
      12: "Diciembre",
    };

    /* `const lastModifiedDate = new Date(document.lastModified);` está creando un nuevo objeto `Date` que
    representa la fecha y la hora en que se modificó por última vez el documento actual.
    La propiedad `document.lastModified` devuelve una cadena que representa la fecha y la hora en el formato
    "DD/MM/AAAA HH:MM:SS". El constructor `Date` se usa para convertir esta cadena en una `Date`
    objeto, que se puede utilizar para realizar varias operaciones en la fecha y la hora. */
    const lastModifiedDate = new Date(document.lastModified);

    /* `const currentDate = new Date();` está creando un nuevo objeto `Date` que representa la fecha actual
    fecha y hora. Esto se usa en la función `updateLastModifiedDate()` para calcular el tiempo
    diferencia entre la fecha actual y la fecha de última modificación del documento. */
    const currentDate = new Date();

    /* `const timeDiff = currentDate.getTime() - lastModifiedDate.getTime();` está calculando el tiempo
    diferencia entre la fecha y hora actuales y la fecha y hora en que se publicó por última vez el documento
    modificado. Lo hace obteniendo el valor de tiempo de cada objeto de fecha usando `getTime()`
    restando el último del primero, y almacenando el resultado en `timeDiff`
    variable. El resultado es un valor en milisegundos. */
    const timeDiff = currentDate.getTime() - lastModifiedDate.getTime();

    /* Estas líneas de código están calculando la diferencia de tiempo entre la fecha actual y la fecha
   cuando el documento fue modificado por última vez. */
    const secondsDiff = Math.floor(timeDiff / 1000);
    const minutesDiff = Math.floor(secondsDiff / 60);
    const hoursDiff = Math.floor(minutesDiff / 60);
    const daysDiff = Math.floor(hoursDiff / 24);

    if (daysDiff < 1) {
      /* Este código establece el contenido de texto del elemento HTML con el ID "lastModifiedWeb" en un
     cadena que indica hace cuánto tiempo se modificó el documento por última vez. Si la diferencia horaria es
     menos de un día, mostrará la diferencia horaria en horas, ya sea como "X horas" o "X
     hora" dependiendo de si la diferencia horaria es mayor a una hora o no. La cadena
     Se añade "Hace" antes de la diferencia horaria para indicar que sucedió en el pasado. */
      const timeAgo = hoursDiff > 1 ? `${hoursDiff} horas` : `${hoursDiff} hora`;
      lastModifiedWeb.textContent = `Hace ${timeAgo}`;
    } else if (daysDiff < 5) {
      /* `lastModifiedWeb.textContent = `Hace dias`;` está configurando el contenido de texto del
      elemento HTML con el ID "lastModifiedWeb" a una cadena que indica cuántos días hace que
      el documento fue modificado por última vez. */
      lastModifiedWeb.textContent = `Hace ${daysDiff} dias`;
    } else {
      /* Estas líneas de código extraen el año, mes, día, hora y minuto del
      objeto `lastModifiedDate` usando varios métodos como `getFullYear()`, `getMonth()`,
      `getDate()`, `getHours()` y `getMinutes()`. */
      const year = lastModifiedDate.getFullYear();
      const month = lastModifiedDate.getMonth() + 1;
      const day = lastModifiedDate.getDate();
      const hour = lastModifiedDate.getHours();
      const minute = lastModifiedDate.getMinutes();
      const monthText = MONTHS[month.toString().padStart(2, "0")];

      /* Estas líneas de código se utilizan para convertir el formato de 24 horas de la última hora modificada en un
      Formato de 12 horas con indicador AM/PM y para formatear los minutos con ceros a la izquierda si es necesario. */
      const AmPm = hour >= 12 ? "pm" : "am";
      const hour12 = hour % 12 || 12;
      const minuteText = minute < 10 ? `0${minute}` : minute;

      /* "lastModifiedWeb" a una cadena que representa la fecha y la hora en que se publicó por última vez el documento
      modificado. La cadena incluye el mes, día, año, hora (en formato de 12 horas), minuto y
      Indicador AM/PM. */
      lastModifiedWeb.textContent = `${monthText} ${day} ${year}, ${hour12}:${minuteText} ${AmPm}`;
    }
  }

  yearCopyright();
  updateLastModifiedDate();
});
