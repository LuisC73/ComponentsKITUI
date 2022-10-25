const loadVideosYoutube = () => {
  $.ajax({
    url:
      location.protocol +
      "//" +
      location.host +
      "/_api/web/lists/getbytitle('VideosYoutubeHome')/items?$select=ID,Title,url&$orderby=ID%20desc",
    method: "GET",
    headers: {
      Accept: "application/json; odata=verbose",
    },
    success: onSuccessLoadVideosYoutube,
    error: onError,
  });
};

const onSuccessLoadVideosYoutube = (data) => {
  let strhtml = "",
    resultados = data.d.results,
    urlVideo = "";

  const containerVideo = document.getElementById("videoYoutube");

  for (let i = 0; i < 1; i++) {
    if (resultados[0].url != null) urlVideo = resultados[0].url;

    strhtml +=
      '<iframe width="100%" height="300" src="https://www.youtube.com/embed/' +
      resultados[0].url.split("=")[1] +
      '" frameborder="0" allowfullscreen title="'+resultados[0].Title+'"></iframe>';
  }

  containerVideo.innerHTML = strhtml;
};
