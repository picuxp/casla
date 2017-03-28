var mongoose = require('mongoose');
var Equipo  = mongoose.model('Equipo');
var Torneo  = mongoose.model('Torneo');
var Division  = mongoose.model('Division');
var logger = require('../logger');

//GET - Return all equipos in the DB
exports.findAllEquipos = function(req, res) {
	Equipo.find(function(err, equipos) {
    if(err) res.status(500).send(err.message);

    console.log('GET /equipo')
		res.status(200).jsonp(equipos);
	});
};

//GET - Return an equipo with specified ID
exports.findById = function(req, res) {
	Equipo.findById(req.params.id, function(err, equipo) {
    
	    if(err) return res.status(500).send(err.message);
	    if(!equipo) return res.status(404).send("Equipo not found");
	    
	    console.log('GET /equipo/' + req.params.id);
		res.status(200).jsonp(equipo);
	});
};

//GET - Return equipos from a specific division
exports.findByDivisionId = function(req, res) {
	Division.findById(req.params.id, function(err, equipo) {
	    if(err) return res.status(500).send(err.message);
	    if(!equipo) return res.status(404).send("Division not found");
		Equipo.find({'division':req.params.id}, function(err, equipos) {
	    	if(err) return res.status(500).send(err.message);	    
	    	console.log('GET /equipo/division/' + req.params.id);
			res.status(200).jsonp(equipos);
		});
	});
};



//POST - Insert a new Equipo in the DB
exports.addEquipo = function(req, res) {
	console.log('POST');
	console.log(req.body);

	// Torneo.findById(req.body.torneo_actual, function(err, torneo) {
		// if(err) return res.send(500, err.message);
		// if (!torneo) {return res.send(404, "Torneo id not found");}
		var equipo = crearEquipo(req.body);
		// guardarEquipo(req,res,equipo,torneo);	
		guardarEquipo(req,res,equipo);
	// });
	
};

//PUT - Update a register already exists
exports.updateEquipo = function(req, res) {
	Equipo.findById(req.params.id, function(err, equipo) {
		if(err) return res.send(500, err.message);
		if (!equipo) {return res.send(404, "Equipo not found");}

		//Torneo.findById(req.body.torneo_actual, function(err, torneo) {
		//	if(err) return res.send(500, err.message);
		//	if (!torneo) {return res.send(404, "Torneo id not found");}

		//	var antiguoTorneo = equipo.torneo_actual;		//guardo antiguo torneo
		//	var isNuevoTorneo = antiguoTorneo != req.body.torneo_actual;
			
			equipo.nombre 				= req.body.nombre,
			equipo.division             = req.body.division,
			equipo.jugadores            = req.body.jugadores,
			equipo.partidos            = req.body.partidos,
			equipo.delegado            = req.body.delegado,
			equipo.capitan            = req.body.capitan,
			equipo.subcapitan            = req.body.subcapitan

		//	equipo.torneo_actual		= req.body.torneo_actual

			equipo.save(function(err) {
				if(err) return res.send(500, err.message);
				logger.info(req.user+" ha actualizado al equipo "+equipo._id+". Nombre: "+equipo.nombre);
				//if(isNuevoTorneo){  //si cambio el equipo, debo sacarlo de anterior y agregarlo al nuevo
				//	torneo.equipos.push(equipo);
				//	logger.info(req.user+" ha agregado al torneo "+torneo.nombre+" un nuevo equipo: "+equipo.nombre);
				//	torneo.save(function(err) {
				//		if(err) return res.send(500, err.message);
				//	});
				//	Torneo.findById(antiguoTorneo, function(err, torneo_antiguo) {
				//		if(err) return res.send(500, err.message);
				//		if (torneo_antiguo) { //AL PPIO NO TIENEN TORNEO ASIGNADO!
				//			torneo_antiguo.equipos.pop(equipo);
				//			logger.info(req.user+" ha sacado del torneo "+torneo_antiguo.nombre+" al equipo: "+equipo.nombre);
				//			torneo_antiguo.save(function(err, torneo_antiguo) {
				//				if(err) return res.send(500, err.message);
				//			});
				//		}
				//	});
				});
				res.status(200).jsonp(equipo);
		});
};

//DELETE - Delete an equipo with specified ID
exports.deleteEquipo = function(req, res) {
	Equipo.findById(req.params.id, function(err, equipo) {

		var torneoDelEquipo = equipo.torneo_actual;
		
		Torneo.findById(torneoDelEquipo, function(err, torneo_del_equipo) {
			if (torneo_del_equipo){
				torneo_del_equipo.equipos.pop(equipo);
				torneo_del_equipo.save(function(err, torneo_del_equipo) {
					if(err) return res.send(500, err.message);
					logger.info("El torneo "+torneo_del_equipo+" ha quitado al equipo "+equipo.nombre);
				});
			}

		});

		if(err) return res.send(500, err.message);
		if (!equipo) {return res.send(404, "Equipo not found");}
		equipo.remove(function(err) {
			if(err) return res.send(500, err.message);
			logger.info(req.user+" ha borrado al equipo "+equipo.nombre);
      		res.status(200).jsonp("Successfully deleted");
		})
	});
};

function crearEquipo(body){
	var equipo = new Equipo({
		nombre:    		body.nombre,
		// torneo_actual: 	body.torneo_actual
	});

	return equipo;
};

function guardarEquipo(req,res,equipo){
	// ,torneo){
	equipo.save(function(err, equipo) {
			if(err) return res.send(500, err.message);
			// torneo.equipos.push(equipo);
			// torneo.save(function(err) {
				// if(err) return res.send(500, err.message);
				// logger.info(req.user+" ha agregado al torneo "+torneo.nombre+" un nuevo equipo: "+equipo.nombre);
		      	res.status(200).jsonp(equipo);
			// });
		});
};

// EXAMPLE POST:
// {
//   "nombre": "Estudiandes",
//   "torneo_actual": "id_del_torneo"
// }