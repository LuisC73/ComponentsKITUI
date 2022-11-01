window.addEventListener("DOMContentLoaded", () => {
  const galeriaVideoLocal = async () => {
    let resp;
    try {
      resp = await $.ajax({
        url:
          location.protocol +
          "//" +
          location.host +
          "/NuestraAlcaldia/_api/web/lists/getbytitle('GaleriadeVideosLocal')/items?$select=ID,Title,FileRef&$orderby=ID%20desc",
        method: "GET",
        headers: {
          Accept: "application/json; odata=verbose",
        },
      });
      galeriaDatos(resp);
    } catch (error) {
      alert(error);
    }
  };

  const galeriaDatos = (resp) => {
    let data = resp.d.results,
      strhtml = "",
      strMain = "",
      urlVideo = "";

    const containerGaleria = document.querySelector(".galeriaLocal__container");

    for (let i = 0; i < data.length; i++) {
      if (data[i].FileRef != null) urlVideo = data[i].FileRef;

      urlVideo = data[i].FileRef.split(".");

      if (urlVideo[1] === "mp4")
        strhtml +=
          '<div class="galeriaLocal__item"><video class="galeriaLocal__video" src="' +urlVideo.join(".") +'" type="video/mp4" loading="lazy"></video><i class="fa fa-play-circle fa-lg galeriaLocal__play" aria-hidden="true"></i></div>';   
    }

    containerGaleria.innerHTML = strhtml;
  };

  galeriaVideoLocal();
});
