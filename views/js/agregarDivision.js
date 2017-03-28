$("#agregarDiv").click(function(e){
	e.preventDefault();
	var nombre = $("#nombre").val();
	if(!nombre){
		alert("Debe ingresar un nombre para la division");
		return false;
	}
	$("#formAgregarDivision").submit();
});