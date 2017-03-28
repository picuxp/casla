$(document).on( "click", ".deleteDivision", function(e){
	e.preventDefault();
	var id = $(this).attr("id");
	var divisionid = id.split("-")[0];
	var nombre = id.split("-")[1];
	if (confirm("Seguro que desea eliminar la division "+nombre+"?")) {
        $("#formDelete"+divisionid).submit();
    }
});

$("#divisionSelect").change(function(){
	if($("#fechaSelect").val()=="none"){
		$("#dataDivision").hide();
		$("#dataDivision").empty();
	} else {
		$("#dataDivision").show();
		$("#dataDivision").css("visibility","visible");
		$("#dataDivision").empty();

		var divisionid = $("#divisionSelect").val();
		$.get('http://localhost:3000/division/'+divisionid, function(division) {
			$.get('http://localhost:3000/equipo/division/'+divisionid, function(equipos) {
				var html = "";
				html += '<li class="clearfix">';
				html += '<div class="subPoint_table">';
				html += '<div class="headline01 smallpoint">'+division.nombre+'</div>';
				html += '<div class="headline01 smallpoint">';
				if(equipos.length==0){
					html += "Ninguno"
				} else {
					for (var i = 0; i< equipos.length ; i++) {
						html+= '<p>'+equipos[i].nombre+'</p>';
					};
				}
				
				html += '</div>';

				html += '<div class="headline01 smallpoint1">'+
					  				'<form action="/deleteDivision" method="post" id="formDelete'+divisionid+'">'+
					  					'<button class="deleteDivision" id="'+divisionid+'-'+division.nombre+'" type="submit">Eliminar</button>'+
					  					'<input type="hidden" value='+ divisionid +' name="divisionid"/>'+
					  				'</form></div></div></div></li>';
				$("#dataDivision").append(html);
			});
			
		});
	}
});