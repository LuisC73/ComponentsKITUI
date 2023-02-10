window.addEventListener("DOMContentLoaded", () => {
  (async function consumirSharepoint() {
    const module = "MiMunicipio",
      folder = "GaleriaDeVideos",
      params = ["ID", "Title", "FileRef"];

    let ulrFetch = `${location.protocol}//${location.host}/${module}/_api/web/lists/getbytitle('${folder}')/items?$select=${params}&$orderby=ID%20desc`;

    try {
      let data = await fetch(ulrFetch, {
        method: "GET",
        headers: {
          Accept: "application/json; odata=verbose",
        },
      });
      let resp = await data.json();
      respuestaSharepoint(resp);
    } catch (error) {
      console.log(`error en consulta ${error}`);
    }
  })();

  function respuestaSharepoint(resp) {
    let data = resp.d.results;

    console.log(data);
  }
});
