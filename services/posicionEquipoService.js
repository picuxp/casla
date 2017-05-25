var mongoose = require('mongoose');
var posicionEquipo  = mongoose.model('PosicionEquipo');
var division = mongoose.model('Division');
var Equipo  = mongoose.model('Equipo');
var logger = require('../logger');

//GET - Return all divisiones in the DB
exports.findAllposicionEquipo = function(req, res) {
	posicionEquipo.find(function(err, posicionEquipos) {
    if(err) res.send(500, err.message);

    console.log('GET /posicionEquipo');
		res.status(200).jsonp(posicionEquipos);
	});
};

//GET - Return a division with specified ID
exports.findEquiposById = function(req, res) {
	posicionEquipo.findById(req.params.id, function(err, posicionEquipo) {
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

	division.findById(req.body.division, function(err, division) {
		if(err) return res.send(500, err.message);
		if (!division) {return res.send(404, "division id not found");}
		var posicionEquipo = new posicionEquipo({
			
			posicionEquipo.equipo       = req.body.equipo,
			posicionEquipo.puntos		= req.body.puntos,
			posicionEquipo.ganados		= req.body.ganados,
			posicionEquipo.empatados    = req.body.empatados,
			posicionEquipo.perdidos		= req.body.perdidos,
			posicionEquipo.jugados		= req.body.jugados,
			posicionEquipo.golesFavor	= req.body.golesFavor,
			posicionEquipo.golesContra		= req.body.golesContra
		});
		
		posicionEquipo.save(function(err, posicionEquipo) {
			if(err) return res.status(500).send(err.message);
			division.posicionEquipo.push(posicionEquipo);
			division.save(function(err) {
				if(err) return res.status(500).send(err.message);
				logger.info(req.user+" ha agregado a la division "+division.nombre+" una nueva posicionEquipo: "+division.posicionEquipo.equipo.nombre);
		      	res.status(200).jsonp(division);
			});
		});	
	});
};

//PUT - Update a division already exists
exports.updatePosicionEquipo = function(req, res) {
	posicionEquipo.findById(req.params.id, function(err, posicionEquipo) {

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
			division.posicionEquipo.push(posicionEquipo);
			division.save(function(err) {
				if(err) return res.send(500, err.message);
				res.status(200).jsonp(division);
			});
		});
	});
};


//DELETE - Delete a division with specified ID
exports.posicionEquipoDelete = function(req, res) {
	posicionEquipo.findById(req.params.id, function(err, division) {

		if(err) return res.send(500, err.message);
		if (!posicionEquipo) {return res.send(404, "posicionEquipo not found");}

		

		posicionEquipo.remove(function(err) {
			if(err) return res.send(500, err.message);
			logger.info(req.user+" ha borrado la posicionEquipo "+posicionEquipo.equipo);
      		res.status(200).jsonp(torneoDeLaDivision); //para redirigir en la vista
		})
	});
};
