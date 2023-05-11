document.addEventListener("DOMContentLoaded", () => {
  /**
   * Esta función obtiene datos de una lista de SharePoint y dibuja un acordeón en función de la respuesta.
   */
  async function consultDataAcordeon() {
    /* Estas son variables que se usan para construir una URL para obtener datos de una lista de SharePoint.
    `modulePage` y `folder` se usan para especificar el módulo y la carpeta de SharePoint donde está la lista
    ubicada, mientras que `params` es una matriz de campos que se incluirán en la respuesta. */
    const modulePage = "Ciudadanos";
    const folder = "AcordeonNormativa";
    const params = ["ID", "IdPrincipal", "Enlace", "IdPadre", "Title", "TipoContenido", "Contenido"];

    /* Construcción de una URL para realizar una solicitud GET a una API de lista de SharePoint. La URL incluye el protocolo.
    y host de la ubicación actual, el nombre de la página del módulo de SharePoint, el nombre de la carpeta
    donde se encuentra la lista, y un conjunto de parámetros para especificar qué campos incluir en el
    respuesta, cómo ordenar los resultados y cuántos elementos recuperar. */
    let urlSearch = `${location.protocol}//${location.host}/${modulePage}/_api/web/lists/getbytitle('${folder}')/items?$select=${params}&$orderby=IdPrincipal%20asc&$top=10000`;

    /* Este código realiza una solicitud GET a una API de lista de SharePoint utilizando el método `fetch` y la URL
    especificado en `urlSearch`. Luego verifica si la respuesta es exitosa usando la propiedad `ok`
    del objeto de respuesta. Si la respuesta no es exitosa, arroja un error con un mensaje
    que incluye el estado y el texto de estado de la respuesta. Si la respuesta tiene éxito, se
    analiza la respuesta como JSON usando el método `json` y pasa el objeto resultante al
    Función `dibujarAcordeón`. */
    let data = await fetch(urlSearch, {
      method: "GET",
      headers: {
        Accept: "application/json; odata=verbose",
      },
    });

    if (!data.ok) {
      const message = `Error en Consulta de Noticias: ${data.status} - ${data.statusText}`;
      throw new Error(message);
    } else {
      let response = await data.json();
      drawAcordeon(response);
    }
  }

  /* Detectar cualquier error que pueda ocurrir durante la ejecución de la función `consultDataAcordeon` y
  registrando el mensaje de error en la consola usando `console.error`. */
  consultDataAcordeon().catch((error) => {
    console.error(error.message);
  });

  const containerAcordeon = document.getElementById("AcordeonContent");

  function drawAcordeon(response) {
    const data = response.d.results;

    /* `const typeContet` es un objeto que define tres propiedades constantes (`NORMAL`, `TEXT` y
    `IMAGE`) con valores de cadena. El método `Object.freeze()` se utiliza para evitar cualquier modificación en
    El objeto y sus propiedades. Este objeto se usa más adelante en el código para determinar el tipo de
    contenido que se mostrará en el acordeón. */
    const typesContet = Object.freeze({
      NORMAL: "Normal",
      TEXT: "Texto",
      IMAGE: "Imagen",
    });

    /* Estas líneas de código crean un nuevo elemento de lista desordenado (`ul`) y agregan una clase de
    `acordeon-web__ul` a él. También están creando un nuevo fragmento de documento (`fragmentDocument`) que
    es una forma eficiente de agregar múltiples elementos al DOM sin causar múltiples diseños
    recálculos. */
    const ul = document.createElement("ul");
    ul.classList.add("acordeon-web__ul");
    const fragmentDocument = document.createDocumentFragment();

    /* Esta línea de código utiliza la asignación de desestructuración para extraer propiedades específicas (`Título`,
    `IdPrincipal`, `Enlace`, `IdPadre`, `TipoContenido`, `Contenido`) de cada objeto en el `data`
    formación. Luego está usando estas propiedades extraídas para crear nuevos elementos para el acordeón.. */
    for (const { Title, IdPrincipal, Enlace, IdPadre, TipoContenido, Contenido } of data) {
      const li = document.createElement("li");
      li.classList.add("acordeon-web__item");
      li.setAttribute("data-item", IdPrincipal);

      /* Este código verifica si el elemento actual que se está iterando en la matriz `data` tiene un `null`
      valor para la propiedad `IdPadre`. Si lo hace, agrega la clase CSS
      `acordeon-web__item--parent` al elemento `li`, lo que indica que es un elemento principal en el
      estructura de acordeón. */
      if (IdPadre === null) li.classList.add("acordeon-web__item--parent");

      /* Este bloque de código crea diferentes tipos de contenido según el valor del
      Propiedad `TipoContenido` de cada objeto en el arreglo `data`. Si `TipoContenido` es igual a
      `typesContet.NORMAL`, crea un elemento link con las propiedades `Title` y `Enlace` y
      lo agrega a un elemento de elemento de lista (`li`). Si `TipoContenido` es igual a `typesContet.TEXT`,
      crea un elemento `div` con un elemento `h2` y `p` dentro, usando `Title` y
      `Contenido` propiedades por su contenido, y lo agrega a `li`. Si `TipoContenido` es
      igual a `typesContet.IMAGE`, crea un elemento `figure` con `img` y `figcaption`
      dentro, usando las propiedades `Title` y `Contenido` para su contenido y `src` y
      atributos `alt` respectivamente, y lo añade a `li` */
      if (TipoContenido === typesContet.NORMAL) {
        const link = document.createElement("a");
        link.classList.add("acordeon-web__link");
        link.textContent = Title;
        link.href = Enlace;
        li.appendChild(link);
      } else if (TipoContenido === typesContet.TEXT) {
        const paragraphContainer = document.createElement("div");
        paragraphContainer.classList.add("acordeon-web__text-content");
        const title = document.createElement("h2");
        title.classList.add("acordeon-web__text-title");
        title.textContent = Title;
        const paragraph = document.createElement("p");
        paragraph.classList.add("acordeon-web__p");
        paragraph.innerHTML = Contenido;
        paragraphContainer.appendChild(title);
        paragraphContainer.appendChild(paragraph);
        li.appendChild(paragraphContainer);
      } else if (TipoContenido === typesContet.IMAGE) {
        const imageContainer = document.createElement("figure");
        const imageTitle = document.createElement("figcaption");
        imageTitle.classList.add("acordeon-web__fig");
        imageContainer.classList.add("acordeon-web__figure");
        const image = document.createElement("img");
        image.classList.add("acordeon-web__img");
        image.alt = Title;
        image.src = Contenido;
        imageTitle.textContent = Title;
        imageContainer.appendChild(image);
        imageContainer.insertBefore(imageTitle, image);
        li.appendChild(imageContainer);
      }

      /* Este bloque de código es responsable de crear la estructura de acordeón iterando a través de los datos.
      obtenido de una lista de SharePoint. Comprueba si el elemento actual tiene un padre (propiedad `IdPadre`) o
      no. Si no tiene un padre, crea una nueva lista desordenada (`ul`) y agrega la actual
      artículo a él. Luego agrega el `ul` a un fragmento de documento (`fragmentDocument`). si la corriente
      elemento tiene un padre, encuentra el elemento padre en `fragmentDocument` usando `querySelector`
      y le agrega una clase de `acordeon-web__item--parent`. A continuación, comprueba si el elemento principal
      ya tiene un elemento secundario `ul`. Si no es así, crea un nuevo elemento `ul` y lo agrega a
      el elemento padre. Finalmente, agrega el elemento actual al elemento secundario `ul`. Este proceso
      crea una estructura anidada de elementos `ul` y `li` que forman el acordeón. */
      if (IdPadre === null) {
        ul.appendChild(li);
        fragmentDocument.appendChild(ul);
      } else {
        const parent = fragmentDocument.querySelector(`li[data-item="${IdPadre}"]`);
        parent.classList.add("acordeon-web__item--parent");
        if (parent) {
          let ulChild = parent.querySelector("ul");
          if (!ulChild) {
            ulChild = document.createElement("ul");
            ulChild.classList.add("acordeon-web__content");
            parent.appendChild(ulChild);
          }
          ulChild.appendChild(li);
        }
      }
    }
    containerAcordeon.appendChild(fragmentDocument);
    addIcon();
    toggleAcordeon();
  }

  /**
   * La función agrega un elemento de icono a todas las etiquetas de anclaje que son elementos secundarios de elementos con la clase
   * "acordeon-web__item--parent".
   */
  function addIcon() {
    const allParent = document.querySelectorAll(".acordeon-web__item--parent > a");

    allParent.forEach((el) => {
      const icon = document.createElement("i");
      icon.classList.add("acordeon-web__icon");
      el.appendChild(icon);
    });
  }

  /**
   * La función alterna la visibilidad del contenido y agrega/elimina una clase a su elemento principal cuando se hace clic en un enlace dentro de un tipo específico de elemento.
   */
  function toggleAcordeon() {
    const parentItems = document.querySelectorAll(".acordeon-web__item--parent a");

    parentItems.forEach((item) => {
      item.addEventListener("click", () => {
        let content = item.nextElementSibling;
        content.classList.toggle("acordeon-web__content--active");
        item.parentNode.classList.toggle("acordeon-web__item--parent--active");
      });
    });
  }
});
