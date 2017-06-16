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




				if(equipos.length==0){
					html += '<tr class="headline06"> <td> Ninguno </td></tr>';
				} else {
					for (var i = 0; i< equipos.length ; i++) {
						html+= '<tr class="headline05"><td>'+equipos[i].nombre+'</td></tr>';
					};
				}



                html += '<tr class="headline01 "><td><br>' +
                    '<form action="/deleteDivision" method="post" id="formDelete'+divisionid+'">'+
                    '<button class="deleteDivision" id="'+divisionid+'-'+division.nombre+'" type="submit">Eliminar</button>'+
                    '<input type="hidden" value='+ divisionid +' name="divisionid"/>'+
                    '</form><br></td></tr>';


				$("#dataDivision").append(html);
			});
			
		});
	}
});