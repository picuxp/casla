$(document).on( "click", ".deleteCancha", function(e){
	e.preventDefault();
	var id = $(this).attr("id");
	var divisionid = id.split("-")[0];
	var nombre = id.split("-")[1];
	if (confirm("Seguro que desea eliminar la division "+nombre+"?")) {
        $("#formDelete"+divisionid).submit();
    }
});

$("#canchaSelect").change(function(){
	if($("#canchaSelect").val()=="none"){
		$("#dataCancha").hide();
		$("#dataCancha").empty();
	} else {
		$("#dataCancha").show();
		$("#dataCancha").css("visibility","visible");
		$("#dataCancha").empty();

		var canchaId = $("#canchaSelect").val();
		$.get('http://localhost:3000/cancha/'+canchaId, function(cancha) {
			var html = "";
			html += '<li class="clearfix">';
			html += '<div class="subPoint_table">';
			html += '<div class="headline01 smallpoint">'+cancha.nombre+'</div>';
			html += '<div class="headline01 smallpoint">';
			html += '</div>';

			// html += '<div class="headline01 smallpoint1">'+
			// 	  				'<form action="/deleteDivision" method="post" id="formDelete'+divisionid+'">'+
			// 	  					'<button class="deleteDivision" id="'+divisionid+'-'+division.nombre+'" type="submit">Eliminar</button>'+
			// 	  					'<input type="hidden" value='+ divisionid +' name="divisionid"/>'+
			// 	  				'</form></div></div></div></li>';
			$("#dataCancha").append(html);
			
		});
	}
});