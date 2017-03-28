$("#elegirEquipo1").hide();
$("#elegirEquipo2").hide();
$("#divisionesTorneo").hide();

$( "#fecha" ).datepicker({
      dateFormat: 'yy-mm-dd',
      timezone: "UTC−4"
});

$("#torneoSelect").change(function(){
	if($("#torneoSelect").val()=="none"){
		$("#divisionesTorneo").hide();
		$("#elegirEquipo1").hide();
		$("#elegirEquipo2").hide();
	} else {
		$("#divisionesTorneo").show();
		$("#divisionesTorneo").css("visibility","visible");
		$("#divisionSelect").empty();

		var idTorneo = $("#torneoSelect").val();
		$.get('http://localhost:3000/division/torneo/'+idTorneo, function(divisiones) {
			if ( divisiones.length == 0 ){
				$("#divisionesTorneo").hide();
				$("#elegirEquipo1").hide();
				$("#elegirEquipo2").hide();
			} else {
				$("#divisionSelect").append('<option value="none" selected></option>');
			  	for (var i = 0; i < divisiones.length; i++) {
			  		$("#divisionSelect").append('<option value='+divisiones[i]._id+'>'+divisiones[i].nombre+'</option>');
			  	};
			}

		});
	}
});

$("#divisionSelect").change(function(){
	if($("#divisionSelect").val()=="none"){
		$("#elegirEquipo1").hide();
		$("#elegirEquipo2").hide();
		$("#submitForm").prop('disabled', true);
	} else {
		$("#submitForm").prop('disabled', false);
		$('#equipo1Select').empty();
		$('#equipo2Select').empty();
		$("#elegirEquipo1").show();
		$("#elegirEquipo1").css("visibility","visible");
		$("#elegirEquipo2").show();
		$("#elegirEquipo2").css("visibility","visible");
		var idDivision = $("#divisionSelect").val();
		$.get('http://localhost:3000/division/'+idDivision+'/equipos', function(equipos) {
			if ( equipos.length == 0 ){
				$("#elegirEquipo1").hide();
				$("#elegirEquipo2").hide();
				$("#submitForm").prop('disabled', true);
			} else {
			  	for (var i = 0; i < equipos.length; i++) {
			  		$("#equipo1Select").append('<option value='+equipos[i]._id+'>'+equipos[i].nombre+'</option>');
			  		$("#equipo2Select").append('<option value='+equipos[i]._id+'>'+equipos[i].nombre+'</option>');
			  	};
			}
		});
	}

});

$( "#submitForm" ).click(function(e){
	e.preventDefault();
	var equipo1 = $("#equipo1Select").val();
	var equipo2 = $("#equipo2Select").val();
	if (equipo1 == equipo2){
		alert("Los equipos deben ser distintos");
		return false;
	}
	var fecha = $("#fecha").val();
	if (!fecha){
		alert("Debe ingresar la fecha del partido");
		return false;
	}
	$( "#formAgregarPartido" ).submit();
});

