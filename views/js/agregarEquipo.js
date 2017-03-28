$("#agregarEqui").click(function(e){
	e.preventDefault();
	var nombre = $("#nombre").val();
	var delegado = $("#delegado").val();
	var capitan = $("#delegado").val();
	if(!nombre){
		alert("Debe ingresar un nombre para el equipo");
		return false;
	}
	if(!delegado){
		alert("Debe ingresar un delegado para el equipo");
		return false;
	}
	if(!capitan){
		alert("Debe ingresar un capitan para el equipo");
		return false;
	}
	$("#formAgregarEquipo").submit();
});