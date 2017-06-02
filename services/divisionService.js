var mongoose = require('mongoose');
var Division  = mongoose.model('Division');
var Torneo  = mongoose.model('Torneo');
var Equipo  = mongoose.model('Equipo');
var logger = require('../logger');

//GET - Return all divisiones in the DB
exports.findAllDivisiones = function(req, res) {
	Division.find(function(err, divisiones) {

        divisiones.sort(function(a,b) {return (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0);} );
        if(err) res.send(500, err.message);

    console.log('GET /division')
		res.status(200).jsonp(divisiones);
	});
};

//GET - Return a division with specified ID
exports.findById = function(req, res) {
	Division.findById(req.params.id, function(err, division) {
	    if(err) return res.send(500, err.message);
	    if(!division) return res.send(404, "Division not found");
	    console.log('GET /division/' + req.params.id);
			res.status(200).jsonp(division);
		});
};

//GET - Return divisiones from a torneo
exports.findByTorneoId = function(req, res) {
	Torneo.findById(req.params.id, function(err, torneo) {
		if(err) return res.send(500, err.message);
		if (!torneo) {return res.send(404, "Torneo id not found");}
		Division.find({ 'torneo': torneo}, function(err, divisiones) {
		    if(err) return res.send(500, err.message);
		    console.log('GET /division/torneo/' + req.params.id);
			res.status(200).jsonp(divisiones);
		});
	}); 
};


//GET - Return equipos from a division
exports.findEquiposFromDivision = function(req, res) {
	Division.findById(req.params.id, function(err, division) {
		if(err) return res.send(500, err.message);
		if (!division) {return res.send(404, "Division id not found");}
		Equipo.find({ 'division': division}, function(err, equipos) {
		    if(err) return res.send(500, err.message);
		    console.log('GET /division/' + req.params.id+'/equipos');
			res.status(200).jsonp(equipos);
		});
	}); 
};


//POST - Insert a new Division in the DB
exports.addDivision = function(req, res) {
	console.log('POST');
	console.log(req.body);

	Torneo.findById(req.body.torneo, function(err, torneo) {
		if(err) return res.send(500, err.message);
		if (!torneo) {return res.send(404, "Torneo id not found");}
		var division = new Division({
			nombre:    				req.body.nombre,
			torneo: 				torneo
		});
		division.save(function(err, division) {
			if(err) return res.status(500).send(err.message);
			torneo.divisiones.push(division);
			torneo.save(function(err) {
				if(err) return res.status(500).send(err.message);
				logger.info(req.user+" ha agregado al torneo "+torneo.nombre+" una nueva division: "+division.nombre);
		      	res.status(200).jsonp(division);
			});
		});	
	});
};

//PUT - Update a division already exists
exports.updateDivision = function(req, res) {
	Division.findById(req.params.id, function(err, division) {

		if(err) return res.send(500, err.message);
		if (!cancha) {return res.send(404, "Division not found");}

		Torneo.findById(req.body.torneo, function(err, torneo) {
			if(err) return res.send(500, err.message);
			if (!torneo) {return res.send(404, "Torneo id not found");}
			
			division.nombre 				= req.body.nombre,
			division.torneo		= req.body.torneo,
			division.equipos = req.body.equipos

			division.save(function(err) {
				if(err) return res.send(500, err.message);
				torneo.divisiones.push(division);
				torneo.save(function(err) {
					if(err) return res.send(500, err.message);
					res.status(200).jsonp(division);
				});
			});
		});
	})
};

//PUT - Update a division already exists
exports.addEquipo = function(req, res) {
	Division.findById(req.params.id, function(err, division) {

		if(err) return res.send(500, err.message);
		if (!cancha) {return res.send(404, "Division not found");}

		Equipo.findById(req.params.idEquipo, function(err, equipo) {
			if(err) return res.send(500, err.message);
			if (!equipo) {return res.send(404, "Equipo id not found");}
			

			division.save(function(err) {
				if(err) return res.send(500, err.message);
				division.equipos.push(equipo);
				equipo.division = division;
				equipo.save(function(err) {
					if(err) return res.send(500, err.message);
					res.status(200).jsonp(division);
				});
			});
		});
	})
};

//DELETE - Delete a division with specified ID
exports.deleteDivision = function(req, res) {
	Division.findById(req.params.id, function(err, division) {

		if(err) return res.send(500, err.message);
		if (!division) {return res.send(404, "Equipo not found");}

		var torneoDeLaDivision = division.torneo;
		
		Torneo.findById(torneoDeLaDivision, function(err, torneoDeLaDivision) {
			if (torneoDeLaDivision){
				torneoDeLaDivision.divisiones.pop(division);
				torneoDeLaDivision.save(function(err, torneoDeLaDivision) {
					if(err) return res.send(500, err.message);
					logger.info("El torneo "+torneoDeLaDivision+" ha quitado la division "+division.nombre);
				});
			}
		});

		for (var i = 0; i<division.equipos.length; i++) {
			Equipo.findById(division.equipos[i], function(err, equipo) {
				if (equipo){
					equipo.division = null;
					equipo.save(function(err, equipo) {
						if(err) return res.send(500, err.message);
						logger.info("El equipo "+equipo.nombre+" ha abandonado la division "+division.nombre);
					});
				}
			});
		};

		division.remove(function(err) {
			if(err) return res.send(500, err.message);
			logger.info(req.user+" ha borrado la division "+division.nombre);
      		res.status(200).jsonp(torneoDeLaDivision); //para redirigir en la vista
		})
	});
};

// EXAMPLE POST:
// {
//   "nombre": "San Martin",
//   "torneo_actual": "id_del_torneo"
// }
