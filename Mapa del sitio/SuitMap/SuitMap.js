
	ConsultaTransparencia();
	ConsultaCiudadanos();
	ConsultaMiMunicipio();
	ConsultaNuestraAlcaldia();
	ConsultaComunicaciones()
	ConsultaSecretariasyEntidades()


	// ** CONSULTA TRANSPARENCIA ** //
	function ConsultaTransparencia() {
		$.ajax({
			url: location.protocol + "//" + location.host + "/Transparencia/_api/web/lists/getbytitle('Páginas')/items?$select=ID,LinkFilename,Title",
			method: "GET",
			headers: { "Accept": "application/json; odata=verbose" },
			success: ImprimirTransparencia,
		});
		
	}
	function ImprimirTransparencia(data) {
		var iteradoTransparencia = document.querySelector('#iteradorTransparencia');
		var resultados = data.d.results;

		for (var i = 0; i < resultados.length; i++) {
			iteradoTransparencia.innerHTML += "<li class='color-default'><a  href='/Transparencia/Paginas/" + resultados[i].LinkFilename + "' target='_blank'>" + resultados[i].Title + "</a></li>";
		}
	}

	// ** CONSULTA CIUDADANOS ** //
	function ConsultaCiudadanos() {
		$.ajax({
			url: location.protocol + "//" + location.host + "/Ciudadanos/_api/web/lists/getbytitle('Páginas')/items?$select=ID,LinkFilename,Title",
			method: "GET",
			headers: { "Accept": "application/json; odata=verbose" },
			success: ImprimirCiudadanos,
		});
		
	}
	function ImprimirCiudadanos(data) {
		var iteradoCiudadanos = document.querySelector('#iteradorCiudadanos');
		var resultados = data.d.results;

		for (var i = 0; i < resultados.length; i++) {
			iteradoCiudadanos.innerHTML += "<li class='color-default'><a  href='/Ciudadanos/Paginas/" + resultados[i].LinkFilename + "' target='_blank'>" + resultados[i].Title + "</a></li>";
		}
	}
	
	// ** CONSULTA MI MUNICIPIO ** //
	function ConsultaMiMunicipio() {
		$.ajax({
			url: location.protocol + "//" + location.host + "/MiMunicipio/_api/web/lists/getbytitle('Páginas')/items?$select=ID,LinkFilename,Title",
			method: "GET",
			headers: { "Accept": "application/json; odata=verbose" },
			success: ImprimirMiMunicipio,
		});
		
	}
	function ImprimirMiMunicipio(data) {
		var iteradoMiMunicipio = document.querySelector('#iteradorMiMunicipio');
		var resultados = data.d.results;

		for (var i = 0; i < resultados.length; i++) {
			iteradoMiMunicipio.innerHTML += "<li class='color-default'><a  href='/MiMunicipio/Paginas/" + resultados[i].LinkFilename + "' target='_blank'>" + resultados[i].Title + "</a></li>";
		}
	}

	// ** CONSULTA NUESTRA ALCALDIA ** //
	function ConsultaNuestraAlcaldia() {
		$.ajax({
			url: location.protocol + "//" + location.host + "/NuestraAlcaldia/_api/web/lists/getbytitle('Páginas')/items?$select=ID,LinkFilename,Title",
			method: "GET",
			headers: { "Accept": "application/json; odata=verbose" },
			success: ImprimirNuestraAlcaldia,
		});
		
	}
	function ImprimirNuestraAlcaldia(data) {
		var iteradoNuestraAlcaldia = document.querySelector('#iteradorNuestraAlcaldia');
		var resultados = data.d.results;
		for (var i = 0; i < resultados.length; i++) {
			iteradoNuestraAlcaldia.innerHTML += "<li class='color-default'><a  href='/NuestraAlcaldia/Paginas/" + resultados[i].LinkFilename + "' target='_blank'>" + resultados[i].Title + "</a></li>";
		
		}
	}

	// ** CONSULTA COMUNICACIONES ** //
	function ConsultaComunicaciones() {
		$.ajax({
			url: location.protocol + "//" + location.host + "/Comunicaciones/_api/web/lists/getbytitle('Páginas')/items?$select=ID,LinkFilename,Title",
			method: "GET",
			headers: { "Accept": "application/json; odata=verbose" },
			success: ImprimirComunicaciones,
		});
		
	}
	function ImprimirComunicaciones(data) {
		var iteradoComunicaciones = document.querySelector('#iteradorComunicaciones');
		var resultados = data.d.results;

		for (var i = 0; i < resultados.length; i++) {
			iteradoComunicaciones.innerHTML += "<li class='color-default'><a  href='/Comunicaciones/Paginas/" + resultados[i].LinkFilename + "' target='_blank'>" + resultados[i].Title + "</a></li>";
		}
	}
	
	// ** CONSULTA SECRETARIAS Y ENTIDADES ** //
	function ConsultaSecretariasyEntidades() {
		$.ajax({
			url: location.protocol + "//" + location.host + "/SecretariasyEntidades/_api/web/lists/getbytitle('Páginas')/items?$select=ID,LinkFilename,Title",
			method: "GET",
			headers: { "Accept": "application/json; odata=verbose" },
			success: ImprimirSecretariasyEntidades,
		});
		
	}
	function ImprimirSecretariasyEntidades(data) {
		var iteradoSecretariasyEntidades = document.querySelector('#iteradorSecretariasyEntidades');
		var resultados = data.d.results;

		for (var i = 0; i < resultados.length; i++) {
			iteradoSecretariasyEntidades.innerHTML += "<li class='color-default'><a  href='/SecretariasyEntidades/Paginas/" + resultados[i].LinkFilename + "' target='_blank'>" + resultados[i].Title + "</a></li>";
		}
	}
