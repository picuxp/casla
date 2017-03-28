$("#dataPartidosConFecha").hide();


$(document).on( "click", ".deletePartido", function(e){
	e.preventDefault();
	var id = $(this).attr("id");
	var partidoId = id.split("-")[0];
	var team1 = id.split("-")[1];
	var team2 = id.split("-")[2];
	if (confirm("Seguro que desea eliminar al partido "+team1+" VS "+team2+"?")) {
        $("#formDelete"+partidoId).submit();
    }
});

$("#fechaSelect").change(function(){
	if($("#fechaSelect").val()=="none"){
		$("#dataPartidosConFecha").hide();
		$("#dataPartidosConFecha").empty();
	} else {
		$("#dataPartidosConFecha").show();
		$("#dataPartidosConFecha").css("visibility","visible");
		$("#dataPartidosConFecha").empty();

		var fecha_numero = $("#fechaSelect").val();
		$.get('http://localhost:3000/partido/fecha_numero/'+fecha_numero, function(partidos) {
			$.get('http://localhost:3000/equipo', function(equipos) {
				$.get('http://localhost:3000/division', function(divisiones) {

					var equiposMap =  {};
	                for (var i = 0; i < equipos.length; i++) {
	                    equiposMap[equipos[i]._id] = equipos[i].nombre;
	                };
	                var divisionesMap =  {};
                    for (var i = 0; i < divisiones.length; i++) {
                        divisionesMap[divisiones[i]._id] = divisiones[i].nombre;
                    };

					var html = "";
				  	for (var i = 0; i < partidos.length; i++) {
				  		html += '<li class="clearfix">';
				  		html += '<div class="subPoint_table">';
				  		html += '<div class="headline01 smallpoint">'+partidos[i].estado+'</div>';
				  		html += '<div class="headline01 smallpoint">'+equiposMap[partidos[i].equipo1]+'</div>';
				  		html += '<div class="headline01 smallpoint">';
				  		if(partidos[i].marcador_equipo_1 == undefined ){
				  			html += "0";
				  		} else {
				  			html += partidos[i].marcador_equipo_1;
				  		}
				  		html += "</div>";
				  		html += '<div class="headline01 smallpoint">';
				  		if(partidos[i].marcador_equipo_2 == undefined ){
				  			html += "0";
				  		} else {
				  			html += partidos[i].marcador_equipo_2;
				  		}
				  		html += "</div>";
				  		html += '<div class="headline01 smallpoint">'+equiposMap[partidos[i].equipo2]+'</div>';
				  		html += '<div class="headline01 smallpoint">'+partidos[i].fecha_numero+'</div>';
				  		html += '<div class="headline01 smallpoint">'+formatDate(partidos[i].fecha)+'</div>';
				  		html += '<div class="headline01 smallpoint">'+divisionesMap[partidos[i].division]+'</div>';

				  		html += '<div class="headline01 smallpoint">';
				  		if (partidos[i].amonestados.length == 0 ){
				  			html += 'Ninguno';
				  		} else {
				  			html += "VER AMONESTADOS";
				  		}
				  		html += '</div>';

				  		html += '<div class="headline01 smallpoint">';
				  		if (partidos[i].expulsados.length == 0 ){
				  			html += 'Ninguno';
				  		} else {
				  			html += "VER EXPULSADOS";
				  		}
				  		html += '</div>';

				  		html += '<div class="headline01 smallpoint">';
				  		if (partidos[i].goles.length == 0 ){
				  			html += 'Ninguno';
				  		} else {
				  			html += "VER GOLES";
				  		}
				  		html += '</div>';

				  		html += '<div class="headline01 smallpoint">';
				  		if (partidos[i].cambios.length == 0 ){
				  			html += 'Ninguno';
				  		} else {
				  			html += "VER CAMBIOS";
				  		}
				  		html += '</div>';			  		
				  		
				  		html += '<div class="headline01 smallpoint row row">'+
				  				'<div class="headline01 smallpoint1"><span>'+
				  				'<form action="/deletePartido" method="post" id="formDelete'+partidos[i]._id+'">'+
				  					'<button class="deletePartido" id="'+partidos[i]._id+'-'+equiposMap[partidos[i].equipo1]+'-'+equiposMap[partidos[i].equipo2]+'" type="submit">Eliminar</button>'+
				  					'<input type="hidden" value='+ partidos[i]._id +' name="partidoid"/>'+
				  				'</form></span></div></div></div></li>';
				  	}
				  	$("#dataPartidosConFecha").append(html);
				});
			});
		});
	}
});


function formatDate(date){
	dteSplit = date.split("-");
	year = dteSplit[0];
	month = dteSplit[1];
	day = dteSplit[2][0] + dteSplit[0][1];
	return day+"/"+month+"/"+year;
}

//CODIGO QUE IRIA SI LA LOGICA FUERA EN LA VISTA
// <% for(var i=0; i < partidos.length; i++) { %> 
//       					             <li class="clearfix">
//                               <div class="subPoint_table">
//                                 <div class="headline01 largepoint1"><%= partidos[i].estado %></div>
//                                 <div class="headline01 largepoint1"><%= equipos[partidos[i].equipo1] %></div>
//                                 <div class="headline01 largepoint1">
//                                   <% if (partidos[i].marcador_equipo_1 == undefined )  { %>
//                                       0
//                                 <% } else { %>
//                                     <%= partidos[i].marcador_equipo_1 %>
//                                 <% } %>
//                                 </div>
//                                 <div class="headline01 largepoint1">
//                                   <% if (partidos[i].marcador_equipo_2 == undefined )  { %>
//                                       0
//                                 <% } else { %>
//                                     <%= partidos[i].marcador_equipo_2 %>
//                                 <% } %>
//                                 </div>
//                                 <div class="headline01 largepoint1"><%= equipos[partidos[i].equipo2] %></div>
//                                 <div class="headline01 largepoint1"><%= partidos[i].fecha_numero %></div>
//                                 <div class="headline01 largepoint1"><%= moment(partidos[i].fecha).format( 'DD MMM, YYYY') %></div>
//                                 <div class="headline01 largepoint1"><%= torneos[partidos[i].torneo] %></div>
//                                 <div class="headline01 largepoint1"><%= partidos[i].amonestados %></div>
//                                 <div class="headline01 largepoint1"><%= partidos[i].expulsados %></div>
//                                 <div class="headline01 largepoint1"><%= partidos[i].goles %></div>
//                                 <div class="headline01 largepoint1"><%= partidos[i].cambios %></div>


//                                 <div class="headline01 largepoint1 row row">
//                   							<div class="headline01 smallpoint1"><span>
//                   								<form onsubmit="return confirm('Seguro que desea eliminar al partido <%= equipos[partidos[i].equipo1] %> VS <%= equipos[partidos[i].equipo2] %>?');" action="/deletePartido" method="post">
//                   					                <button type="submit">Eliminar</button>
//                   					                <input type="hidden" value=<%= partidos[i]._id %> name="partidoid"/>
//                   					            </form>
//                   							</span></div>
//                   						  </div>
//                   						</div>
//                             </li>
//                             <% } %>