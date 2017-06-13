/**
 * Created by franc on 09/06/2017.
 */
var mongoose = require('mongoose');
var Partido = mongoose.model('Partido');
var Equipo = mongoose.model('Equipo');
var Torneo = mongoose.model('Torneo');
var Division = mongoose.model('Division');
var Cancha = mongoose.model('Cancha');
var logger = require('../logger');

//GET - Return all partidos in the DB
exports.getPartidos = function(req, res) {

    Partido.find({'division': mongoose.Types.ObjectId(req.params.id)}, function (err, partidos) {
        if (err) return res.send(500, err.message);
        Equipo.find(function(err, equipos) {
            Cancha.find(function (err,canchas) {
                var dictionary =  {};

                for(var i = 0; i< partidos.length;i++){
                    if (dictionary[partidos[i].fecha_numero] == null) {
                        dictionary[partidos[i].fecha_numero] = new Array();
                    }
                    var obj = {};
                    var fecha =  partidos[i].fecha;

                    obj["fecha"] = (('0' + (fecha.getDate())).slice(-2)
                        + '/' + ('0' + (fecha.getMonth() + 1)).slice(-2) + "\n"+
                        ('0' + (fecha.getHours())).slice(-2) + ":" +
                        ('0' + (fecha.getMinutes())).slice(-2)
                    );
                    obj["estado"] = partidos[i].estado;
                    obj["cancha"] = "";
                    if(partidos[i].cancha != null) {
                        for(var k = 0; k < canchas.length; k++ ){
                            if(canchas[k]._id.equals(partidos[i].cancha)){
                                obj["cancha"] = canchas[k].nombre;
                            }
                        }
                    }


                    obj["marcador1"] = partidos[i].marcador_equipo_1 == null ? "" : partidos[i].marcador_equipo_1;
                    obj["marcador2"] = partidos[i].marcador_equipo_2 == null ? "" : partidos[i].marcador_equipo_2;

                    for(var o = 0 ; o<equipos.length;o++){
                        if(equipos[o]._id.equals(partidos[i].equipo1)){
                            obj["equipo1"] = equipos[o].nombre;
                        } else if(equipos[o]._id.equals(partidos[i].equipo2)){
                            obj["equipo2"] = equipos[o].nombre;
                        }
                    }
                    dictionary[partidos[i].fecha_numero].push(obj)
                }
                res.status(200).jsonp(dictionary);
            });
        });

    });

};
