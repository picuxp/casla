$("#dataPartidos").show();
$("#dataPartidos").css("visibility", "visible");
$("#dataPartidos").empty();

var torneoId = $("#dataPartidos").attr("name");
$.get('http://localhost:3000/torneo/' + torneoId, function(torneo){
	$.get('http://localhost:3000/torneo/' + torneo._id + '/partidos', function (partidos) {
		$.get('http://localhost:3000/equipo', function (equipos) {
			$.get('http://localhost:3000/division', function (divisiones) {

				partidos = partidos.partidos;

				var equiposMap = {};
				for (var i = 0; i < equipos.length; i++) {
					equiposMap[equipos[i]._id] = equipos[i].nombre;
				};
				var divisionesMap = {};
				for (var i = 0; i < divisiones.length; i++) {
					divisionesMap[divisiones[i]._id] = divisiones[i].nombre;
				};

				var html = "";
				for (var i = 0; i < partidos.length; i++) {
					html += '<li class="clearfix">';
					html += '<div class="subPoint_table">';
					html += '<div class="headline01 smallpoint">' + partidos[i].estado + '</div>';
					html += '<div class="headline01 smallpoint">' + equiposMap[partidos[i].equipo1] + '</div>';
					html += '<div class="headline01 smallpoint">';
					if (partidos[i].marcador_equipo_1 == undefined) {
						html += "0";
					} else {
						html += partidos[i].marcador_equipo_1;
					}
					html += "</div>";
					html += '<div class="headline01 smallpoint">';
					if (partidos[i].marcador_equipo_2 == undefined) {
						html += "0";
					} else {
						html += partidos[i].marcador_equipo_2;
					}
					html += "</div>";
					html += '<div class="headline01 smallpoint">' + equiposMap[partidos[i].equipo2] + '</div>';
					html += '<div class="headline01 smallpoint">' + partidos[i].fecha_numero + '</div>';
					html += '<div class="headline01 smallpoint">' + formatDate(partidos[i].fecha) + '</div>';
					html += '<div class="headline01 smallpoint">' + divisionesMap[partidos[i].division] + '</div>';

					html += '<div class="headline01 smallpoint">';
					if (partidos[i].amonestados.length == 0) {
						html += 'Ninguno';
					} else {
						html += "VER AMONESTADOS";
					}
					html += '</div>';

					html += '<div class="headline01 smallpoint">';
					if (partidos[i].expulsados.length == 0) {
						html += 'Ninguno';
					} else {
						html += "VER EXPULSADOS";
					}
					html += '</div>';

					html += '<div class="headline01 smallpoint">';
					if (partidos[i].goles.length == 0) {
						html += 'Ninguno';
					} else {
						html += "VER GOLES";
					}
					html += '</div>';

					html += '<div class="headline01 smallpoint">';
					if (partidos[i].cambios.length == 0) {
						html += 'Ninguno';
					} else {
						html += "VER CAMBIOS";
					}
					html += '</div>';

					html += '<div class="headline01 smallpoint">' +
						'<div class="headline01 smallpoint"><span>' +
						'<form action="/deletePartido" method="post" id="formDelete' + partidos[i]._id + '">' +
						'<button class="deletePartido" id="' + partidos[i]._id + '-' + equiposMap[partidos[i].equipo1] + '-' + equiposMap[partidos[i].equipo2] + '" type="submit">Eliminar</button>' +
						'<input type="hidden" value=' + partidos[i]._id + ' name="partidoid"/>' +
						'</form></span></div>';

					html += '</div></li>';
				}
				$("#dataPartidos").append(html);
			});
		});
	});
});

$(document).on("click", ".deletePartido", function (e) {
	e.preventDefault();
	var id = $(this).attr("id");
	var partidoId = id.split("-")[0];
	var team1 = id.split("-")[1];
	var team2 = id.split("-")[2];
	if (confirm("Seguro que desea eliminar al partido " + team1 + " VS " + team2 + "?")) {
		$("#formDelete" + partidoId).submit();
	}
});



$("#fechaSelect").change(function () {
	if ($("#fechaSelect").val() == "none") {
		$("#dataPartidosConFecha").hide();
		$("#dataPartidosConFecha").empty();
	} else {
		$("#dataPartidosConFecha").show();
		$("#dataPartidosConFecha").css("visibility", "visible");
		$("#dataPartidosConFecha").empty();

		var fecha_numero = $("#fechaSelect").val();
		$.get('http://localhost:3000/partido/fecha_numero/' + fecha_numero, function (partidos) {
			$.get('http://localhost:3000/equipo', function (equipos) {
				$.get('http://localhost:3000/division', function (divisiones) {

					var equiposMap = {};
					for (var i = 0; i < equipos.length; i++) {
						equiposMap[equipos[i]._id] = equipos[i].nombre;
					};
					var divisionesMap = {};
					for (var i = 0; i < divisiones.length; i++) {
						divisionesMap[divisiones[i]._id] = divisiones[i].nombre;
					};

					var html = "";
					for (var i = 0; i < partidos.length; i++) {
						html += '<li class="clearfix">';
						html += '<div class="subPoint_table">';
						html += '<div class="headline01 smallpoint">' + partidos[i].estado + '</div>';
						html += '<div class="headline01 smallpoint">' + equiposMap[partidos[i].equipo1] + '</div>';
						html += '<div class="headline01 smallpoint">';
						if (partidos[i].marcador_equipo_1 == undefined) {
							html += "0";
						} else {
							html += partidos[i].marcador_equipo_1;
						}
						html += "</div>";
						html += '<div class="headline01 smallpoint">';
						if (partidos[i].marcador_equipo_2 == undefined) {
							html += "0";
						} else {
							html += partidos[i].marcador_equipo_2;
						}
						html += "</div>";
						html += '<div class="headline01 smallpoint">' + equiposMap[partidos[i].equipo2] + '</div>';
						html += '<div class="headline01 smallpoint">' + partidos[i].fecha_numero + '</div>';
						html += '<div class="headline01 smallpoint">' + formatDate(partidos[i].fecha) + '</div>';
						html += '<div class="headline01 smallpoint">' + divisionesMap[partidos[i].division] + '</div>';

						html += '<div class="headline01 smallpoint">';
						if (partidos[i].amonestados.length == 0) {
							html += 'Ninguno';
						} else {
							html += "VER AMONESTADOS";
						}
						html += '</div>';

						html += '<div class="headline01 smallpoint">';
						if (partidos[i].expulsados.length == 0) {
							html += 'Ninguno';
						} else {
							html += "VER EXPULSADOS";
						}
						html += '</div>';

						html += '<div class="headline01 smallpoint">';
						if (partidos[i].goles.length == 0) {
							html += 'Ninguno';
						} else {
							html += "VER GOLES";
						}
						html += '</div>';

						html += '<div class="headline01 smallpoint">';
						if (partidos[i].cambios.length == 0) {
							html += 'Ninguno';
						} else {
							html += "VER CAMBIOS";
						}
						html += '</div>';

						html += '<div class="headline01 smallpoint row">' +
							'<div class="headline01 smallpoint1"><span>' +
							'<form action="/cargarPartido" method="put" id="formCargar' + partidos[i]._id + '">' +
							'<button class="cargarPartido" id="' + partidos[i]._id + '" type="submit">Cargar</button>' +
							'<input type="hidden" value=' + partidos[i]._id + ' name="partidoid"/>' +
							'</form></span></div></div>';

						html += '<div class="headline01 smallpoint">' +
							'<div class="headline01 smallpoint"><span>' +
							'<form action="/deletePartido" method="post" id="formDelete' + partidos[i]._id + '">' +
							'<button class="deletePartido" id="' + partidos[i]._id + '-' + equiposMap[partidos[i].equipo1] + '-' + equiposMap[partidos[i].equipo2] + '" type="submit">Eliminar</button>' +
							'<input type="hidden" value=' + partidos[i]._id + ' name="partidoid"/>' +
							'</form></span></div>';

						html += '</div></li>';
					}
					$("#dataPartidosConFecha").append(html);
				});
			});
		});
	}
});


function formatDate(date) {
	dteSplit = date.split("-");
	year = dteSplit[0];
	month = dteSplit[1];
	day = dteSplit[2][0] + dteSplit[0][1];
	return day + "/" + month + "/" + year;
}

function formatDate2(date) {
	dteSplit = date.split("-");
	year = dteSplit[0];
	month = dteSplit[1];
	day = dteSplit[2][0] + dteSplit[0][1];
	return year + "-" + month + "-" + day;
}
