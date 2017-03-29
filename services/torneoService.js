var mongoose = require('mongoose');
var Torneo  = mongoose.model('Torneo');
var Equipo = mongoose.model('Equipo');
var Division = mongoose.model('Division');
var Partido = mongoose.model('Partido');
var Cancha = mongoose.model('Cancha');
var logger = require('../logger');

//GET - Return all torneos in the DB
exports.findAllTorneos = function(req, res) {
	Torneo.find({"activo":true}, function(err, torneos) {
    if(err) res.send(500, err.message);

    console.log('GET /torneo');
		res.status(200).jsonp(torneos);
	});
};

//GET - Return a Torneo with specified ID
exports.findById = function(req, res) {
	Torneo.findById(req.params.id, function(err, torneo) {
    if(err) return res.send(500, err.message);
    if(!torneo) return res.send(404, "Torneo not found");
    console.log('GET /torneo/' + req.params.id);
		res.status(200).jsonp(torneo);
	});
};

//GET - Return equipos from a torneo
exports.findEquiposFromTorneo = function(req, res) {
	Torneo.findById(req.params.id, function(err, torneo) {
    	if(err) return res.send(500, err.message);
    	if(!torneo) return res.send(404, "Torneo not found");

    	var async = require('async');
    	var calls = [];
    	torneo.equipos.forEach(getEquipo, calls);

    	async.parallel(calls, function(err, result){
    		var equiposList = [];
	    	result.forEach(armarRespuestaEquipos, equiposList);
		    var data = {
				equipos : equiposList,
				torneo: torneo.nombre
			};
			res.status(200).jsonp(data);
    	});

	});
};

function getEquipo(equipoId) {
    this.push(function(callback){
		Equipo.findById(equipoId, function(err, equipo){
    		if(err) return res.send(500, err.message);
    		if(!equipo) return res.send(404, "Equipo not found");
    		callback(null, equipo);
		});
    });
}

function armarRespuestaEquipos(resultado){
	this.push(resultado);
}


function getPartidos(division) {
    this.push(function(callback){
		Partido.find({ 'division': division}, function(err, partidos){
    		if(err) return res.send(500, err.message);
    		if(!partidos) return res.send(404, "Division's partidos not found");
    		callback(null, partidos);
		});
    });
}

function armarRespuestaPartidos(resultado){
	for(var i=0; i<resultado.length; i++){
		this.push(resultado[i]);
	}
}

//GET - Return partidos from a torneo
exports.findPartidosFromTorneo = function(req, res) {
	Torneo.findById(req.params.id, function(err, torneo) {
    	if(err) return res.send(500, err.message);
    	if(!torneo) return res.send(404, "Torneo not found");
		Division.find({ 'torneo': torneo}, function(err, divisiones) {
		    if(err) return res.send(500, err.message);
		    if(!divisiones) return res.send(404, "Torneo's divisiones not found");
		    var async = require('async');
		    var calls = [];

		    divisiones.forEach(getPartidos, calls);

		    async.parallel(calls, function(err, result){
		    	var partidosList = [];
		    	result.forEach(armarRespuestaPartidos, partidosList);
			    var data = {
					partidos : partidosList,
					torneo: torneo.nombre
				};
				res.status(200).jsonp(data);
		    });
		});
	});
};

//GET - Return a Torneo with specified ID
exports.findAllCanchas = function(req, res) {
	Torneo.findById(req.params.id, function(err, torneo) {
    if(err) return res.send(500, err.message);
    if(!torneo) return res.send(404, "Torneo not found");
    console.log('GET /torneo/canchas' + req.params.id);
		res.status(200).jsonp(torneo.canchas);
	});
};

//POST - Insert a new Torneo in the DB
exports.addTorneo = function(req, res) {
	console.log('POST');
	console.log(req);
	console.log(req.nombre);
	console.log(req.jugadores_por_equipo);

	var torneo = new Torneo({
		nombre:    				req.body.nombre,
		jugadores_por_equipo: 	req.body.jugadores_por_equipo,
		activo: 				true //por defecto sera activo
	});

	torneo.save(function(err, torneo) {
		if(err) return res.send(500, err.message);
		logger.info(req.user+" ha agregado un nuevo torneo: "+torneo.nombre+". Jugadores por equipo: "+torneo.jugadores_por_equipo);
    	res.status(200).jsonp(torneo);
	});
};

//PUT - Update a register already exists
exports.updateTorneo = function(req, res) {
	Torneo.findById(req.params.id, function(err, torneo) {

		if(err) return res.send(500, err.message);
		if (!torneo) {return res.send(404, "Torneo not found");}

		torneo.nombre 				= req.body.nombre,
		torneo.jugadores_por_equipo	= req.body.jugadores_por_equipo,
		torneo.activo				= req.body.activo

		torneo.save(function(err) {
			if(err) return res.send(500, err.message);
			logger.info(req.user+" ha actualizado el torneo "+torneo._id+". Nombre: "+torneo.nombre+". Jugadores por equipo: "+torneo.jugadores_por_equipo+". Activo: "+torneo.activo);
      		res.status(200).jsonp(torneo);
		});
	});
};

//PUT - Update a register already exists
exports.addCancha = function(req, res) {
	Torneo.findById(req.params.id, function(err, torneo) {

		if(err) return res.send(500, err.message);
		if (!torneo) {return res.send(404, "Torneo not found");}

		Cancha.findById(req.params.idCancha, function(err, cancha) {
			if(err) return res.send(500, err.message);
			if (!cancha) {return res.send(404, "Cancha not found");}

			torneo.canchas.push(cancha);
			torneo.save(function(err) {
				if(err) return res.send(500, err.message);
				logger.info(req.user+" ha agregado la cancha "+cancha.nombre+" al torneo: "+torneo.nombre);
	      		res.status(200).jsonp(torneo);
			});
		});
	});
};


//PUT - Agrega un equipo al torneo
exports.addEquipo = function(req, res) {
	Torneo.findById(req.params.id, function(err, torneo) {
		if(err) return res.send(500, err.message);
		if (!torneo) {return res.send(404, "Torneo not found");}

		Equipo.findById(req.params.equipo, function(err, equipo) {
			if(err) return res.send(500, err.message);
			if (!equipo) {return res.send(404, "Equipo not found");}

			torneo.equipos.push(equipo);
			torneo.save(function(err) {
				if(err) return res.send(500, err.message);
				logger.info(req.user+" ha agregado el equipo "+equipo._id+". Nombre: "+equipo.nombre);
	      		res.status(200).jsonp(torneo);
			});
		});
	});
};

//PUT - Agrega una division al torneo
exports.addDivision = function(req, res) {
	Torneo.findById(req.params.id, function(err, torneo) {
		if(err) return res.send(500, err.message);
		if (!torneo) {return res.send(404, "Torneo not found");}

		Division.findById(req.params.division, function(err, division) {
			if(err) return res.send(500, err.message);
			if (!division) {return res.send(404, "Division not found");}

			torneo.divisiones.push(division);
			torneo.save(function(err) {
				if(err) return res.send(500, err.message);
				logger.info(req.user+" ha agregado la division "+division._id+". Nombre: "+division.nombre);
	      		res.status(200).jsonp(division);
			});
		});
	});
};

//DELETE - This method executes a logic delete. This is done this way to avoid deleting in cascade
exports.deleteTorneo = function(req, res) {
	Torneo.findById(req.params.id, function(err, torneo) {
		if(err) return res.send(500, err.message);
		if (!torneo) {return res.send(404, "Torneo not found");}
		torneo.activo = false;
		torneo.save(function(err) {
			if(err) return res.send(500, err.message);
			logger.info(req.user+" ha actualizado el torneo "+torneo._id+". Nombre: "+torneo.nombre+". Jugadores por equipo: "+torneo.jugadores_por_equipo+". Activo: "+torneo.activo);
      		res.status(200).jsonp("Successfully deleted");
		});
	})
};

// EXAMPLE POST:
// {
//   "nombre": "Mi torneo",
//   "jugadores_por_equipo": 7
// }
