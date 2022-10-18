function SearchStPOL(event) {
    var code = (event.keyCode ? event.keyCode : event.which);
   
    if (code == 13) {
        event.preventDefault();
        BuscarCobroCoactivo();
    }

    ComprobarPaginador();
}

//substringof('"+$('#txt_sboxNorma').val()+"',FileLeafRef) or 	

$.extend($.expr[":"], {
    "containsIN": function (elem, i, match, array) {
        return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
});
function BuscarCobroCoactivo() {
    $("#notificationArea55").show();
    var strurl = location.protocol + "//" + location.host + "/Transparencia/_api/web/lists/getbytitle('Acordeon')/items?$select=Title,IdPrincipal,item,IdPadre,Pagina&$filter=substringof('" + $('#txt_sboxNorma').val() + "',Title) or substringof('" + $('#txt_sboxNorma').val() + "',FileLeafRef)";
    $.ajax({
        url: strurl,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            var strHtml = "";
            $.each(data.d.results, function (index, item) {
            var pagina="#";
				if(item.Pagina!=null){
				pagina=item.Pagina;
				}
                if (item.Title != null) { newTexeeet33 = "&nbsp; " + item.Title;}
                var nombre = newTexeeet33.split(" ").join("</span> <span>");
        		if(pagina!="#"){
        		                strHtml += "<div  name='Item' data-displaytemplate='PDFItem' class='ms-srch-item' onmouseover='' onmouseout=''> <div  class='ms-srch-item-body' onclick=''> <div class='ms-srch-item-icon'> <img  onload='' src='/images/globe-buscador.png' style='display: inline;'> </div> <div  class='ms-srch-item-title'> <h3 class='ms-srch-ellipsis' style='font-size: 22px;'> <a clicktype='Result' id='ctl00em_itemTitleLink' href='" + pagina + "' class='ms-srch-item-link' title='" + item.Title + "' onfocus='' target='_blank'>" + nombre + "</a></h3></div></div></div>";

        		}
            });

            $("#notificationArea55").hide();
            //$("#MSOZoneCell_WebPartWPQ1").hide();

            if (data.d.results.length == 0) {

                $("#ResultadosDeBusquedaNoma").html("<br><br><strong class='ms-srch-item-highlightedText'>No se encontraron Resultados</strong>");
                //$(".pagination").remove();
                $("#ResultadosDeBusquedaNoma2").hide();

            }
            else {
                //$(".pagination").remove();
                $("#ResultadosDeBusquedaNoma2").hide();

                $("#ResultadosDeBusquedaNoma2").html("<br><br><br><br><strong class='ms-srch-item-highlightedText'>" + data.d.results.length + " Resultados</strong>  <a href='javascript:void(0);' onclick='Shwed();'>Ver todo</a><br><br>");
                $("#ResultadosDeBusquedaNoma").html(strHtml);

                $("#ResultadosDeBusquedaNoma").jPaginate({ items: 20 });


                /*	$("#ResultadosDeBusquedaNoma span").find( ":contains('"+$('#txt_sboxNorma').val()+"')" )
                        .css({
                          "background-color": "yellow",
                          "font-weight": "bold"
                        });
                    */

                              }
        },
        error: onError
    });

}

function Shwed() {
    $("#MSOZoneCell_WebPartWPQ1").show();
    //$("#ResultadosDeBusquedaNoma").hide();
    $("#ResultadosDeBusquedaNoma2").hide();
    $(".pagination").remove();
}

function ComprobarPaginador(){
    let paginaciones=document.querySelectorAll(".pagination").length;
        if(paginaciones==1){
        let paginador=document.querySelector(".pagination")
        paginador.remove();
}}