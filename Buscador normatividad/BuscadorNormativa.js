function SearchStPOL(event) {
    var code = (event.keyCode ? event.keyCode : event.which);
    if (code == 13) {
        debugger
        event.preventDefault();
        BuscarNormatividad();
    }

}

$.extend($.expr[":"], {
    "containsIN": function (elem, i, match, array) {
        return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
});

function BuscarNormatividad() {
    $("#notificationArea55").show();
    var strurl = location.protocol + "//" + location.host + "/Transparencia/_api/web/lists/getbytitle('Normatividad')/items?$select=Title,LinkFilename,Fecha,FileLeafRef,A_x00f1_o,Descripci_x00f3_n&$top=2000&$filter=substringof('" + $('#txt_sboxNorma').val() + "',Title) or substringof('" + $('#txt_sboxNorma').val() + "',Fecha)or substringof('" + $('#txt_sboxNorma').val() + "',FileLeafRef) or substringof('" + $('#txt_sboxNorma').val() + "',A_x00f1_o)";
    $.ajax({
        url: strurl,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            var strHtml = "";
            $.each(data.d.results, function (index, item) {
                var newTexeeet33 = "&nbsp; " + item.Descripci_x00f3_n;
                var newText = newTexeeet33.split(" ").join("</span> <span>");
                var newText33 = "&nbsp; " + item.Title;
                var newText2 = newText33.split(" ").join("</span> <span>");

                var newText3rrrr3 = "&nbsp; " + item.A_x00f1_o + "&nbsp; ";
                var aniosddd = newText3rrrr3.split(" ").join("</span> <span>");

                var gfreggerwg = "&nbsp; " + item.Clasificaci_x00f3_n + "&nbsp; ";
                var edictosdeerr = gfreggerwg.split(" ").join("</span> <span>");

                var gfreffewferggerwg = "&nbsp; " + item.Fecha + "&nbsp; ";
                var edictosdeerddeeer = gfreffewferggerwg.split(" ").join("</span> <span>");

                var Nombre = item.FileLeafRef;


                strHtml += "<div id='' name='Item' data-displaytemplate='PDFItem' class='ms-srch-item' onmouseover='' onmouseout=''><div id='ckji' class='ms-srch-item-body' onclick=''>               <div class='ms-srch-item-icon'>	                   <img id='cn' onload='' src='/_layouts/15/images/icpdf.png' style='display: inline;'>  </div>                   <div id='ctl00_cemTitle' class='ms-srch-item-title'>                 <h3 class='ms-srch-ellipsis' style='font-size: 22px;'>                   <a clicktype='Result' id='ctl00em_itemTitleLink' href='/Transparencia/Normatividad/" + item.LinkFilename + "' class='ms-srch-item-link' title='" + Nombre + "' onfocus='' target='_blank'>" + Nombre + "</a>                </h3>  </div>                <div id='ctSummary' class='ms-srch-item-summary'>" + newText + " </div>            <div id='ctl00_ctl6Path' tabindex='0' class='ms-srch-item-path' title='' onblur='' onclick='' onkeydown=''><strong class='ms-srch-item-highlightedText'>Clasificaci&oacute;n: </strong> " + edictosdeerr + "<br><strong class='ms-srch-item-highlightedText'>Fecha: </strong> " + edictosdeerddeeer + "   &nbsp; &nbsp; &nbsp; <strong class='ms-srch-item-highlightedText'>A&Ntilde;O: </strong> " + aniosddd + "         </div>        </div>                                </div>";
            });

            $("#notificationArea55").hide();
            $("#MSOZoneCell_WebPartWPQ1").hide();

            if (data.d.results.length == 0) {

                $("#ResultadosDeBusquedaNoma").html("<br><br><strong class='ms-srch-item-highlightedText'>No se encontraron Resultados</strong>");
                $(".pagination").remove();
            }
            else {
                $(".pagination").remove();

                $("#ResultadosDeBusquedaNoma2").html("<br><br><br><br><strong class='ms-srch-item-highlightedText'>" + data.d.results.length + " Resultados</strong>  <a href='javascript:void(0);' onclick='Shwed();'>Ver todo</a><br><br>");
                $("#ResultadosDeBusquedaNoma").html(strHtml);

                $("#ResultadosDeBusquedaNoma").jPaginate({ items: 20 });


                /*	$("#ResultadosDeBusquedaNoma span").find( ":contains('"+$('#txt_sboxNorma').val()+"')" )
                        .css({
                          "background-color": "yellow",
                          "font-weight": "bold"
                        });
                    */

                $('#ResultadosDeBusquedaNoma span:containsIN("' + $('#txt_sboxNorma').val() + '")').css({
                    "background-color": "yellow",
                    "font-weight": "bold"
                });
            }
        },
        error: onError
    });

}

function Shwed() {
    $("#MSOZoneCell_WebPartWPQ1").show();
    $("#ResultadosDeBusquedaNoma").hide();
    $("#ResultadosDeBusquedaNoma2").hide();
    $(".pagination").remove();
}