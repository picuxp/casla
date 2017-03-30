var partidoGlobal;

var id = getParameterByName("partidoid");

$.get('http://localhost:3000/partido/' + id, function (partido){
	$.get('http://localhost:3000/equipo', function (equipos) {
		$.get('http://localhost:3000/jugador/equipo/'+partido.equipo1, function (jugadores1) {
			$.get('http://localhost:3000/jugador/equipo/'+partido.equipo2, function (jugadores2) {
				$.get('http://localhost:3000/division/'+partido.division, function (division) {
					console.log('Entrando en cargarPartido, partido: '+id);
					partidoGlobal = partido;						
					var equiposMap = {};
					for (var i = 0; i < equipos.length; i++) {
						equiposMap[equipos[i]._id] = equipos[i].nombre;
					};

					$('#myModal').modal();
					$('#teams-header-id').html(equiposMap[partido.equipo1]+' vs '+equiposMap[partido.equipo2]);
					$('#team1-id').html('<b>'+equiposMap[partido.equipo1]+'</b>');
					$('#team2-id').html('<b>'+equiposMap[partido.equipo2]+'</b>');
					$('#nro-fecha-id').html(partido.fecha_numero);
					$('#fecha-id').val(formatDate2(partido.fecha));

					var options = ['N.E.','FIN','SUSP','POST'];
					var aux = "";
					for(var i=0; i<options.length;i++){
						if(options[i] == partido.estado){
							aux+='<option value="'+options[i]+'" selected="selected">'+options[i]+'</option>';
						}else{
							aux+='<option value="'+options[i]+'">'+options[i]+'</option>';
						}
					}
					$('#estado-id').html(aux);

					$('#division-id').html(division.nombre);

					var lista = '<form id="form-amonestados1-id">';
					for (var i = 0; i < jugadores1.length; i++) {
						lista += '<input type="checkbox" value="' + jugadores1[i].numero + '">' + jugadores1[i].numero + ' - ' + jugadores1[i].apellido + '<br>';
					};
					$('#amonestados1-id').html(lista);

					var lista = '<form id="form-expulsados1-id">';
					for (var i = 0; i < jugadores1.length; i++) {
						lista += '<input type="checkbox" value="' + jugadores1[i].numero + '">' + jugadores1[i].numero + ' - ' + jugadores1[i].apellido + '<br>';
					};
					$('#expulsados1-id').html(lista);

					var lista = '<form id="form-amonestados2-id">';
					for (var i = 0; i < jugadores2.length; i++) {
						lista += '<input type="checkbox" value="' + jugadores2[i].numero + '">' + jugadores2[i].numero + ' - ' + jugadores2[i].apellido + '<br>';
					};
					$('#amonestados2-id').html(lista);

					var lista = '<form id="form-expulsados2-id">';
					for (var i = 0; i < jugadores2.length; i++) {
						lista += '<input type="checkbox" value="' + jugadores2[i].numero + '">' + jugadores2[i].numero + ' - ' + jugadores2[i].apellido + '<br>';
					};
					$('#expulsados2-id').html(lista);
					
				});
			});
		});
	});
});

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//TO-DO terminar esto ////////////////////////////////////////////////////////////////////////////////////////
$(document).on("click", '.botonGuardarCambios-id', function(e){
	//console.log("guardarCambios fue presionado");
	var id = $('#botonGuardarCambios-id').attr("name");
	var data = partidoGlobal;
	data.fecha = new Date($('#fecha-id').val());
	data.estado = $('#estado-id').val();
	console.log(data);
});

function formatDate(date) {
	dteSplit = date.split(/[T-]/);
	year = dteSplit[0];
	month = dteSplit[1];
	day = dteSplit[2];
	return day + "/" + month + "/" + year;
}

function formatDate2(date) {
	dteSplit = date.split(/[T-]/);
	year = dteSplit[0];
	month = dteSplit[1];
	day = dteSplit[2];
	return year + "-" + month + "-" + day;
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