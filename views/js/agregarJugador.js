$( "#fecha_de_nacimiento" ).datepicker({
      dateFormat: 'yy-mm-dd',
      timezone: "UTC−4"
});

$("#botonAgregarJugador").click(function(e){
	e.preventDefault();
	if ( chequear("nombre") && chequear("apellido") && chequear("apodo") && chequear("fecha_de_nacimiento") 
		&& chequear("dni") && chequear("numero") && chequear("email")) {
		$("#formAgregarJugador").submit();
	} else {
		return false;
	}
});

function chequear (atributo){
	var valor = $("#"+atributo).val();
	if(!valor){
		alert("Debe ingresar un "+atributo+" para el jugador");
		return false;
	}
	return true;
}

$("#capitanSelect").change(function(){
	if ($("#capitanSelect").val() == true){
		$("#subcapitanSelect").val() = false;
	}
});

$('#capitanSelect').on('change', function() {
  if (this.value  == "true"){
		$("#subcapitanSelect").val("false");
	}
})

$('#subcapitanSelect').on('change', function() {
  if (this.value  == "true"){
		$("#capitanSelect").val("false");
	}
})
