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
    const params = [
      "IdPrincipal",
      "Enlace",
      "IdPadre",
      "Title",
      "TipoContenido",
      "Contenido",
      "Imagen",
      "Orden",
    ];

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

    /* Se verifica si la respuesta de una solicitud GET a una API de lista de SharePoint es exitosa al
    usando la propiedad `ok` del objeto de respuesta. Si la respuesta no tiene éxito, lanza un
    error con un mensaje que incluye el estado y el texto de estado de la respuesta. Si la respuesta es
    exitoso, analiza la respuesta como JSON usando el método `json` y pasa el objeto resultante
    a la función `organizeData`. */
    if (!data.ok) {
      const message = `Error en Consulta de Noticias: ${data.status} - ${data.statusText}`;
      throw new Error(message);
    } else {
      let response = await data.json();
      organizeData(response);
    }
  }

  /* Detectar cualquier error que pueda ocurrir durante la ejecución de la función `consultDataAcordeon` y
  registrando el mensaje de error en la consola usando `console.error`. */
  consultDataAcordeon().catch((error) => {
    console.error(error.message);
  });

  // Seleccionamos el elemento padre del acordeon
  const containerAcordeon = document.getElementById("AcordeonContent");

  /* Se está creando un objeto constante `typesContent` utilizando el método `Object.freeze()` para evitar el
  objeto de ser modificado. El objeto tiene tres propiedades `NORMAL`, `TEXT` e `IMAGE`, cada una con
  un valor de cadena. Estas propiedades se utilizan más adelante en el código para determinar el tipo de contenido que se va a
  aparece en el acordeón. */
  const typesContet = Object.freeze({
    NORMAL: "Normal",
    TEXT: "Texto",
    IMAGE: "Imagen",
  });

  const organizeData = (response) => {
    const data = response.d.results;

    /* Estas líneas de código están inicializando dos estructuras de datos vacías, una matriz llamada `organizedData`
    y un objeto llamado `parentIdMap`. Estas estructuras de datos se usarán más adelante en el código para
    organizar y ordenar los datos obtenidos de una lista de SharePoint. */
    const organizedData = [];
    const parentIdMap = {};

    /* Este código itera sobre una serie de objetos llamados `data`. Para cada objeto de la matriz,
    comprueba si la propiedad `IdPadre` es `null`. Si es `nulo`, el objeto se inserta en una nueva matriz
    llamado `datosorganizados`. Si `IdPadre` no es `null`, el objeto se agrega a un objeto llamado
    `parentIdMap` usando el valor `IdPadre` como clave. Si la clave ya existe en `parentIdMap`, el
    El objeto se agrega a la matriz existente de objetos asociados con esa clave. Si la llave no
    existe, se crea una nueva matriz con el objeto como su primer elemento y se agrega a `parentIdMap` con
    el valor `IdPadre` como clave. Este código esencialmente organiza los datos en una estructura de árbol.
    basado en la propiedad `IdPadre` */
    data.forEach((node) => {
      if (node.IdPadre === null) {
        organizedData.push(node);
      } else {
        parentIdMap[node.IdPadre] = parentIdMap[node.IdPadre] || [];
        parentIdMap[node.IdPadre].push(node);
      }
    });

    /* Este código está iterando sobre la matriz `organizedData` y para cada `parentNode`, está asignando un
    nueva propiedad 'hijos' a la misma. El valor de `niños` es la matriz de nodos secundarios
    asociado con el `parentNode` (obtenido del objeto `parentIdMap` usando el `IdPrincipal`
    propiedad del `parentNode` como la clave) o una matriz vacía si no hay nodos secundarios. Este
    esencialmente agrega una nueva propiedad 'hijos' a cada nodo en la matriz 'organizedData', que
    contiene una matriz de sus nodos secundarios. */
    organizedData.forEach((parentNode) => {
      parentNode.children = parentIdMap[parentNode.IdPrincipal] || [];
    });

    /* `organizedData.sort((a, b) => a.Orden - b.Orden);` está ordenando la matriz `organizedData` en
    orden ascendente basado en el valor de la propiedad `Orden` de cada objeto. El método `sort()`
    toma una función de comparación como argumento, que compara dos elementos de la matriz a la vez
    y devuelve un valor negativo si el primer elemento debe venir antes que el segundo, un valor positivo
    valor si el primer elemento debe venir después del segundo, o cero si los dos elementos son iguales.
    En este caso, la función de comparación resta la propiedad `Orden` de `b` del `Orden`
    propiedad de `a`, que da como resultado un valor negativo si `a.Orden` es menor que `b.Orden`, a
    valor positivo si `a.Orden` es mayor que `b.Orden`, y cero si son iguales. Esto causa
    el método `sort()` para ordenar la matriz en orden ascendente según la propiedad `Orden`. */
    organizedData.sort((a, b) => a.Orden - b.Orden);

    /* `createParentsAccordion(organizedData)` es una llamada de función que crea los elementos principales del
    acordeón basado en los datos pasados ​​como argumento (`organizedData`). Crea un elemento `ul`
    e itera sobre la matriz `organizedData` para crear un elemento `li` para cada elemento principal. Él
    establece las propiedades `Título` y `Enlace` de cada elemento principal como el texto y href de `a`
    elemento, respectivamente. Si la propiedad `IdPadre` del elemento principal es `null`, agrega la clase
    `acordeon-web__item--parent` al elemento `li`. Luego agrega el elemento `li` al `ul`
    y añade el elemento `ul` al elemento `containerAcordeon`. Si el elemento principal tiene
    children, llama a la función `createTreeAccordion` para crear los elementos secundarios. */
    createParentsAccordion(organizedData);
  };

  function createParentsAccordion(info) {
    const containerList = document.createElement("ul");
    containerList.classList.add("acordeon-web__ul");
    const fragmentDocument = document.createDocumentFragment();

    for (const { Title, Enlace, IdPadre, children } of info) {
      const element = document.createElement("li");
      element.classList.add("acordeon-web__item");
      element.innerHTML = `<a class="acordeon-web__link" href="${Enlace}">${Title}</a>`;

      if (IdPadre === null) element.classList.add("acordeon-web__item--parent");

      const childrenInfo = children.sort((a, b) => a.Orden - b.Orden);

      containerList.appendChild(element);
      fragmentDocument.appendChild(containerList);
      if (children.length !== 0) createTreeAccordion(childrenInfo, element);
    }

    containerAcordeon.appendChild(fragmentDocument);
  }

  function createTreeAccordion(children, parent) {
    /* Este código comprueba si el elemento principal pasado como argumento tiene un elemento secundario `ul`. Si
    no tiene uno, crea un nuevo elemento `ul`, agrega la clase `acordeon-web__content` a
    y lo agrega al elemento padre. Luego, el elemento `ul` se asigna al `ulChild`.
    variables para su uso posterior. */
    let ulChild = parent.querySelector("ul");

    if (!ulChild) {
      ulChild = document.createElement("ul");
      ulChild.classList.add("acordeon-web__content");
      parent.appendChild(ulChild);
    }

    const fragmentTree = document.createDocumentFragment();

    /* Se crea una lista de elementos (li) con diferentes tipos de contenido (normal, texto,
    imagen) en función de los datos proporcionados en la matriz `childs`. Utiliza una sentencia switch para determinar
    el tipo de contenido y crea los elementos HTML correspondientes usando literales de plantilla.
    Luego, los elementos se agregan a un fragmento y se agregan al DOM como elementos secundarios de un elemento ul. */
    for (const { Title, Enlace, TipoContenido, Contenido } of children) {
      const element = document.createElement("li");
      element.classList.add("acordeon-web__item");

      switch (TipoContenido) {
        case typesContet.NORMAL:
          element.innerHTML = `<a class="acordeon-web__link" href="${Enlace}">${Title}</a>`;
          break;
        case typesContet.TEXT:
          element.innerHTML = `
            <div class="acordeon-web__text-content">
              <h2 class="acordeon-web__text-title">${Title}</h2>
              <p class="acordeon-web__p">${Contenido}</p>
            </div>`;
          break;
        case typesContet.IMAGE:
          element.innerHTML = `
            <figure class="acordeon-web__figure">
              <img class="acordeon-web__img" src="${Contenido}" alt="${Title}">
              <figcaption class="acordeon-web__fig">${Title}</figcaption>
            </figure>`;
          break;
        default:
          console.log("Tipo de Contenido no reconocido");
      }

      fragmentTree.appendChild(element);
    }

    ulChild.appendChild(fragmentTree);
    addGalleryParent(ulChild);
  }

  /**
   * La función agrega una clase a un elemento principal si contiene más de una imagen.
   * @param parent: el parámetro principal es un elemento DOM que representa el elemento contenedor que
   * contiene un grupo de imágenes. La función comprueba si hay más de una imagen dentro del contenedor.
   * y agrega una clase CSS "acordeon-web__content--gallery" al elemento principal si hay varios
   * imágenes.
   */
  function addGalleryParent(parent) {
    const images = parent.querySelectorAll("img");

    if (images.length > 1) parent.classList.add("acordeon-web__content--gallery");
  }

  /**
   * La función agrega un elemento de icono a todos los elementos principales en un componente web de acordeón.
   */
  function addIconItemParent() {
    const allParent = document.querySelectorAll(".acordeon-web__item--parent > a");
    allParent.forEach((el) => {
      const icon = document.createElement("i");
      icon.classList.add("acordeon-web__icon");
      el.appendChild(icon);
    });
  }

  /**
   * Esta función maneja la alternancia de elementos de acordeón cuando se hace clic.
   */
  function handleToggleAccordion() {
    const parentItems = document.querySelectorAll(".acordeon-web__item--parent a");
    parentItems.forEach((item) => {
      item.addEventListener("click", () => {
        let content = item.nextElementSibling;
        if (content !== null) {
          content.classList.toggle("acordeon-web__content--active");
          item.parentNode.classList.toggle("acordeon-web__item--parent--active");
        }
      });
    });
  }

  addIconItemParent();
  handleToggleAccordion();
});
