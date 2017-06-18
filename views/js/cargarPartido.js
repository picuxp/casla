var partidoGlobal;

var id = getParameterByName("partidoid");


// $("#horario-div").hide();
// $("#cancha-div").hide();

$.get('http://localhost:3000/partido/' + id, function (partido){
    $.get('http://localhost:3000/equipo', function (equipos) {
        $.get('http://localhost:3000/jugador/equipo/'+partido.equipo1, function (jugadores1) {
            $.get('http://localhost:3000/jugador/equipo/'+partido.equipo2, function (jugadores2) {
                $.get('http://localhost:3000/division/'+partido.division, function (division) {
                    $.get('http://localhost:3000/cancha/torneo/'+division.torneo, function (canchas) {
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
                        $('#fecha-id').html(formatDate(partido.fecha));

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




                        var auxCanchas = "";
                        auxCanchas+='<option value="" selected="selected">'+"-"+'</option>';
                        for (var k = 0; k < canchas.length; k++) {
                            if(canchas[k]._id == partido.cancha){
                                auxCanchas+='<option value="'+canchas[k]._id+'" selected="selected">'+canchas[k].nombre+'</option>';
                            }else {
                                auxCanchas += '<option value="' + canchas[k]._id + '">' + canchas[k].nombre + '</option>';
                            }
                        }

                        $('#cancha-id').html(auxCanchas);


                        $('#horario-id').val(formatDate2(partido.fecha));


                        $('#division-id').html(division.nombre);

                        var lista = '<form id="form-amonestados1-id">';
                        for (var i = 0; i < jugadores1.length; i++) {
                            lista += '<input type="checkbox" value="' + jugadores1[i].numero + '">' + jugadores1[i].numero + ' - ' + jugadores1[i].apellido + " " + jugadores1[i].nombre +'<br>';
                        };
                        $('#amonestados1-id').html(lista);

                        var lista = '<form id="form-expulsados1-id">';
                        for (var i = 0; i < jugadores1.length; i++) {
                            lista += '<input type="checkbox" value="' + jugadores1[i].numero + '">' + jugadores1[i].numero + ' - ' + jugadores1[i].apellido + " " + jugadores1[i].nombre +'<br>';
                        };
                        $('#expulsados1-id').html(lista);

                        var lista = '<form id="form-amonestados2-id">';
                        for (var i = 0; i < jugadores2.length; i++) {
                            lista += '<input type="checkbox" value="' + jugadores2[i].numero + '">' + jugadores2[i].numero + ' - ' + jugadores2[i].apellido + " " + jugadores2[i].nombre +'<br>';
                        };
                        $('#amonestados2-id').html(lista);

                        var lista = '<form id="form-expulsados2-id">';
                        for (var i = 0; i < jugadores2.length; i++) {
                            lista += '<input type="checkbox" value="' + jugadores2[i].numero + '">' + jugadores2[i].numero + ' - ' + jugadores2[i].apellido + " " + jugadores2[i].nombre +'<br>';
                        };
                        $('#expulsados2-id').html(lista);

                    });
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
$("#botonGuardarCambios-id").click(function(e){
    e.preventDefault();
    //if(chequear("estado-id") && chequear("goles1-id") && chequear("goles2-id")){
    document.formCargarPartido.action = "/cargarPartido?partidoid="+id;
    //partidoGlobal.marcador_equipo_1 = document.getElementById("goles1-id").value;
    //console.log(partidoGlobal);

    $("#formCargarPartido").submit();
    //}else{
    //	return false;
    //}
    //var id = $('#botonGuardarCambios-id').attr("name");
    //console.log("pase el id");
    //var data = partidoGlobal;
    //data.fecha_numero = $('#nro-fecha-id').val();
    //data.fecha = new Date($('#fecha-id').val());
    //data.estado = $('#estado-id').val();
    //data.division = $('#division-id').val();
    //console.log(data);
});


function chequear (atributo){
    var valor = $("#"+atributo).val();
    if(!valor){
        alert("Debe ingresar un "+atributo+" para el partido");
        return false;
    }
    return true;
}

function formatDate(date) {
    dteSplit = date.split(/[T-]/);
    year = dteSplit[0];
    month = dteSplit[1];
    day = dteSplit[2];
    return day + "/" + month + "/" + year;
}

function formatDate2(fechaS) {
    var date = new Date(fechaS);
    var fecha =
        ('0' + (date.getHours())).slice(-2) + ":" +
        ('0' + (date.getMinutes())).slice(-2);
    return fecha == ("00:00") ? "" : fecha;
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