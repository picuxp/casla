var mongoose = require('mongoose');
var Jugador  = mongoose.model('Jugador');
var Equipo   = mongoose.model('Equipo');
var logger = require('../logger');

//GET - Return all jugadores in the DB
exports.findAllJugadores = function(req, res) {
	Jugador.find(function(err, jugadores) {
    if(err) res.send(500, err.message);

    console.log('GET /jugador')
		res.status(200).jsonp(jugadores);
	});
};

//GET - Return a Jugador with specified ID
exports.findById = function(req, res) {
	Jugador.findById(req.params.id, function(err, jugador) {
    if(err) return res.send(500, err.message);
    if(!jugador) return res.send(404, "Jugador not found");
    console.log('GET /jugador/' + req.params.id);
		res.status(200).jsonp(jugador);
	});
};

//GET - Return Jugadores from an equipo
exports.findByEquipoId = function(req, res) {
	Equipo.findById(req.params.id, function(err, equipo) {
    	if(err) return res.send(500, err.message);
    	if(!equipo) return res.send(404, "Equipo not found");

		Jugador.find({'equipo':req.params.id}, function(err, jugadores) {
		    if(err) return res.send(500, err.message);
		    console.log('GET /jugador/equipo/' + req.params.id);
			res.status(200).jsonp(jugadores);
		});
	});
};


//POST - Insert a new Jugador in the DB
exports.addJugador = function(req, res) {
	console.log('POST');
	console.log(req.body);

	Equipo.findById(req.body.equipo, function(err, equipo) {
		if(err) return res.send(500, err.message);
		if (!equipo) {return res.send(404, "Equipo not found");}

		var jugador = new Jugador({
			nombre:    			req.body.nombre,
			apellido: 	  		req.body.apellido,
			apodo:  			req.body.apodo,
			fecha_de_nacimiento:req.body.fecha_de_nacimiento,
			dni:  				req.body.dni,
			posicion:    		req.body.posicion,
			numero:  			req.body.numero,
			email:  			req.body.email,
			equipo: 			req.body.equipo
		});

		jugador.save(function(err, jugador) {
			if(err) return res.send(500, err.message);
			logger.info(req.user+" ha agregado al jugador "+jugador._id+" de nombre "+jugador.apellido+", "+jugador.nombre+", equipo "+equipo._id);
			equipo.jugadores.push(jugador);
			if (req.body.capitan == "true"){
				equipo.capitan = jugador._id;
			} else {
				if (req.body.subcapitan == "true"){
					equipo.subcapitan = jugador._id;
				}
			}
			equipo.save(function(err, equipo) {
			try{
				if(err) return res.send(500, err.message);
				logger.info("El equipo "+equipo.nombre+" ha agregado al jugador "+jugador.apellido+", "+jugador.nombre);
	    		res.status(200).jsonp(jugador);
				}catch (err){
				console.log(err)
			}
	    	});
		});
	});
};

//PUT - Update a register already exists
exports.updateJugador = function(req, res) {
	Jugador.findById(req.params.id, function(err, jugador) {

		if(err) return res.send(500, err.message);
		if (!jugador) {return res.send(404, "Jugador not found");}

		Equipo.findById(req.body.equipo, function(err, equipo) { //busco equipo del request
			if(err) return res.send(500, err.message);
			if (!equipo) {return res.send(404, "Equipo not found");}

			var antiguoEquipo = jugador.equipo;		//guardo antiguo equipo
			var isNuevoEquipo = antiguoEquipo != req.body.equipo;

			jugador.nombre 				= req.body.nombre,
			jugador.apellido			= req.body.apellido,
			jugador.apodo			 	= req.body.apodo,
			jugador.fecha_de_nacimiento = req.body.fecha_de_nacimiento,
			jugador.dni 				= req.body.dni,
			jugador.posicion			= req.body.posicion,
			jugador.numero				= req.body.numero,
			jugador.email				= req.body.email,
			jugador.equipo 				= equipo

			jugador.save(function(err) {
				if(err) return res.send(500, err.message);
					logger.info(req.user+" ha actualizado al jugador "+jugador._id);
				if(isNuevoEquipo){  //si cambio el equipo, debo sacarlo de anterior y agregarlo al nuevo
					equipo.jugadores.push(jugador);
					equipo.save(function(err, equipo) {
						if(err) return res.send(500, err.message);
						logger.info("El equipo "+equipo.nombre+" ha agregado al jugador "+jugador.apellido+", "+jugador.nombre);
					});
					Equipo.findById(antiguoEquipo, function(err, equipo_antiguo) {
						equipo_antiguo.jugadores.pop(jugador);
						equipo_antiguo.save(function(err, equipo_antiguo) {
							if(err) return res.send(500, err.message);
							logger.info("El equipo "+equipo.equipo_antiguo+" ha quitado al jugador "+jugador.apellido+", "+jugador.nombre);
						});
					});
				}
				res.status(200).jsonp(jugador);
			});
		});
	});
};

//DELETE - Delete a jUGADOR with specified ID
exports.deleteJugador = function(req, res) {
	Jugador.findById(req.params.id, function(err, jugador) {

		var equipoDelJugador = jugador.equipo;
		
		Equipo.findById(equipoDelJugador, function(err, equipo_del_jugador) {
			equipo_del_jugador.jugadores.pop(jugador);
			if (equipo_del_jugador.capitan == jugador._id){
				equipo_del_jugador.capitan = undefined;
			} else {
				if (equipo_del_jugador.subcapitan == jugador._id){
					equipo_del_jugador.subcapitan = undefined;
				}
			}
			equipo_del_jugador.save(function(err, equipo_del_jugador) {
				if(err) return res.send(500, err.message);
				logger.info("El equipo "+equipo_del_jugador+" ha quitado al jugador "+jugador.apellido+", "+jugador.nombre);
			});
		});

		if(err) return res.send(500, err.message);
		if (!jugador) {return res.send(404, "Jugador not found");}
		jugador.remove(function(err) {
			if(err) return res.send(500, err.message);
			logger.info(req.user+" ha borrado al jugador "+jugador.apellido+", "+jugador.nombre+" de id: "+jugador._id);
      		res.status(200).jsonp("Successfully deleted");
		})
	});
};

// EXAMPLE POST:
// {
//   "nombre": "ilan",
//   "apellido": "pincha",
//   "apodo": "lancha",
//   "fecha_de_nacimiento": "06/06/1990",
//   "dni": 36678976,
//   "posicion": "Volante",
//   "numero": 7,
//   "email":"ilan@gmail.com",
//	 "equipo":"id_equipo"
// }
