var mongoose = require('mongoose');
var PosicionEquipo  = mongoose.model('PosicionEquipo');
var Division = mongoose.model('Division');
var Equipo  = mongoose.model('Equipo');
var logger = require('../logger');

//GET - Return all divisiones in the DB
exports.findAllposicionEquipo = function(req, res) {
    PosicionEquipo.find(function(err, posicionEquipos) {
        if(err) res.send(500, err.message);

        console.log('GET /posicionEquipo');
        res.status(200).jsonp(posicionEquipos);
    });
};

//GET - Return a division with specified ID
exports.findEquiposById = function(req, res) {
    PosicionEquipo.findById(req.params.id, function(err, posicionEquipo) {
        if(err) return res.send(500, err.message);
        if(!posicionEquipo) return res.send(404, "posicionEquipo not found");
        console.log('GET /posicionEquipo/' + req.params.id);
        res.status(200).jsonp(posicionEquipo);
    });
};

exports.findPosicionEquiposByDivisionId = function(req, res) {
    PosicionEquipo.find({ division: req.params.id }, function(err, posicionEquipo) {
        posicionEquipo.sort(function(a,b) {return (a.puntos < b.puntos) ? 1 : ((b.puntos < a.puntos) ? -1 : 0);} );
        if(err) return res.send(500, err.message);
        if(!posicionEquipo) return res.send(404, "posicionEquipo not found");
        console.log('GET /posicionEquipo/' + req.params.id);
        res.status(200).jsonp(posicionEquipo);
    });
};


//POST - Insert a new Division in the DB
exports.posicionEquipoAdd = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var nuevo = new PosicionEquipo({
        division     : req.body.division,
        equipo       : req.body.equipoid,
        equipoNombre : req.body.nombre,
        jugados      : 0,
        ganados      : 0,
        empatados    : 0,
        perdidos     : 0,
        golesFavor   : 0,
        golesContra  : 0,
        puntos       : 0
    });


    PosicionEquipo.findOneAndRemove({ equipo: req.body.equipoid },function(err, posicionEquipos) {
        nuevo.save(function(err, saved) {
            if(err) return res.status(500).send(err.message);
            logger.info(req.user+" ha guardado la posicionEquipo");
            res.status(200).jsonp(saved);
        });
    });
};

//PUT - Update a division already exists
exports.updatePosicionEquipo = function(req, res) {
    PosicionEquipo.findById(req.params.id, function(err, posicionEquipo) {

        if(err) return res.send(500, err.message);
        if (!equipo) {return res.send(404, "posicionEquipo not found");}


        posicionEquipo.puntos		= req.body.puntos;
        posicionEquipo.ganados		= req.body.ganados;
        posicionEquipo.empatados    = req.body.empatados;
        posicionEquipo.perdidos		= req.body.perdidos;
        posicionEquipo.jugados		= req.body.jugados;
        posicionEquipo.golesFavor	= req.body.golesFavor;
        posicionEquipo.golesContra		= req.body.golesContra;

        posicionEquipo.save(function(err) {
            if(err) return res.send(500, err.message);
            res.status(200).jsonp(posicionEquipo);
        });
    });
};

exports.cargaDePartido = function(req, res) {

    PosicionEquipo.findOne({ equipo: req.body.equipo1}, function(err, posicion1) {
        PosicionEquipo.findOne({ equipo: req.body.equipo2}, function(err, posicion2) {
            if(posicion1 != null && posicion2 != null) {
                posicion1.jugados = posicion1.jugados + 1;
                posicion2.jugados = posicion2.jugados + 1;
                posicion1.golesFavor = posicion1.golesFavor + req.body.marcador_equipo_1;
                posicion1.golesContra = posicion1.golesContra + req.body.marcador_equipo_2;
                posicion2.golesFavor = posicion2.golesFavor + req.body.marcador_equipo_2;
                posicion2.golesContra = posicion2.golesContra + req.body.marcador_equipo_1;

                if (req.body.marcador_equipo_1 > req.body.marcador_equipo_2) {
                    posicion1.ganados = posicion1.ganados + 1;
                    posicion1.puntos = posicion1.puntos + 3;
                    posicion2.perdidos = posicion2.perdidos + 1;
                } else if (req.body.marcador_equipo_1 < req.body.marcador_equipo_2) {
                    posicion2.puntos = posicion2.puntos + 3;
                    posicion2.ganados = posicion1.ganados + 1;
                    posicion1.perdidos = posicion2.perdidos + 1;
                } else {
                    posicion1.puntos = posicion1.puntos + 1;
                    posicion2.puntos = posicion2.puntos + 1;
                    posicion1.empatados = posicion1.empatados + 1;
                    posicion2.empatados = posicion2.empatados + 1;
                }

                posicion1.save(function (err) {
                    posicion2.save(function (err) {
                        if (err) return res.send(500, err.message);
                        res.status(200).jsonp(posicion2);
                    });
                });

            } else {
                //Todo ver que pasa
                res.status(404);
            }
        });
    });
};




//DELETE - Delete a division with specified ID
exports.posicionEquipoDelete = function(req, res) {
    PosicionEquipo.findById(req.params.id, function(err, posicionEquipo) {

        if(err) return res.send(500, err.message);
        if (!posicionEquipo) {return res.send(404, "posicionEquipo not found");}



        posicionEquipo.remove(function(err) {
            if(err) return res.send(500, err.message);
            logger.info(req.user+" ha borrado la posicionEquipo "+posicionEquipo.equipo);
            res.status(200).jsonp(posicionEquipo); //para redirigir en la vista
        })
    });
};

exports.posicionEquipoDeleteByEquipoId = function(req, res) {
    PosicionEquipo.findOneAndRemove({ equipo: req.params.id },function(err) {
        if(err) return res.send(500, err.message);
        logger.info(req.user+" ha borrado la posicionEquipo");
        res.status(200).jsonp(err); //para redirigir en la vista
    });
};
