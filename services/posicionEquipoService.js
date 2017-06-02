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

		// PosicionEquipo.find(function(err, posicionEquipos) {
         //    for (i = 0; i < posicionEquipos.length; i++) {
         //        if(posicionEquipos[i].equipo._id == nuevo.equipo._id) {
         //            PosicionEquipo.findById(posicionEquipos[i].id, function(err, posicionEquipo) {
        //
         //                if(err) return res.send(500, err.message);
         //                if (!posicionEquipo) {return res.send(404, "posicionEquipo not found");}
        //
        //
        //
         //                posicionEquipo.remove(function(err) {
         //                    if(err) return res.send(500, err.message);
         //                    logger.info(req.user+" ha borrado la posicionEquipo "+posicionEquipo.equipo);
         //                    res.status(200).jsonp(posicionEquipo); //para redirigir en la vista
         //                })
         //            });
         //        }
         //    }
            nuevo.save(function(err, saved) {
                // if(err) return res.status(500).send(err.message);
                // division.posicionEquipo.push(posicionEquipo);
                // division.save(function(err) {
                if(err) return res.status(500).send(err.message);
                // logger.info(req.user+" ha agregado a la division "+division.nombre+" una nueva posicionEquipo: "+division.posicionEquipo.equipo.nombre);
                res.status(200).jsonp(saved);
                // });
            });
        // });
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
