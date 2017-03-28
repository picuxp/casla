var mongoose = require('mongoose');
var Cancha = mongoose.model('Cancha');
var Torneo = mongoose.model('Torneo');
var logger = require('../logger');

//GET - Return all canchas in the DB
exports.findAllCanchas = function(req, res) {
	Cancha.find(function(err, canchas) {
    if(err) res.send(500, err.message);

    console.log('GET /cancha')
		res.status(200).jsonp(canchas);
	});
};

//GET - Return an cancha with specified ID
exports.findById = function(req, res) {
	Cancha.findById(req.params.id, function(err, cancha) {
    if(err) return res.send(500, err.message);
    if(!cancha) return res.send(404, "Cancha not found");
    console.log('GET /cancha/' + req.params.id);
		res.status(200).jsonp(cancha);
	});
};

//GET - Return canchas from a torneo
exports.findByTorneoId = function(req, res) {
	Torneo.findById(req.params.id, function(err, torneo) {
		if(err) return res.send(500, err.message);
		if (!torneo) {return res.send(404, "Torneo id not found");}
		Cancha.find({ 'torneo': torneo}, function(err, canchas) {
		    if(err) return res.send(500, err.message);
		    console.log('GET /cancha/torneo' + req.params.id);
			res.status(200).jsonp(canchas);
		});
	}); 
};

//POST - Insert a new cancha in the DB
exports.addCancha = function(req, res) {
	console.log('POST');
	console.log(req.body);

	Torneo.findById(req.body.torneo, function(err, torneo) {
		if(err) return res.send(500, err.message);
		if (!torneo) {return res.send(404, "Torneo id not found");}
		var cancha = new Cancha({
			nombre:    				req.body.nombre,
			torneo: 				torneo
		});
		cancha.save(function(err, cancha) {
			if(err) return res.status(500).send(err.message);
			torneo.canchas.push(cancha);
			torneo.save(function(err) {
				if(err) return res.status(500).send(err.message);
				logger.info(req.user+" ha agregado al torneo "+torneo.nombre+" una nueva cancha: "+cancha.nombre);
		      	res.status(200).jsonp(cancha);
			});
		});	
	});
};

//PUT - Update a register already exists
exports.updateCancha = function(req, res) {
	Cancha.findById(req.params.id, function(err, cancha) {

		if(err) return res.send(500, err.message);
		if (!cancha) {return res.send(404, "Cancha not found");}

		Torneo.findById(req.body.torneo, function(err, torneo) {
			if(err) return res.send(500, err.message);
			if (!torneo) {return res.send(404, "Torneo id not found");}
			
			cancha.nombre 				= req.body.nombre,
			cancha.torneo		= req.body.torneo

			cancha.save(function(err) {
				if(err) return res.send(500, err.message);
				torneo.canchas.push(cancha);
				torneo.save(function(err) {
					if(err) return res.send(500, err.message);
					res.status(200).jsonp(cancha);
				});
			});
		});
	})
};

//DELETE - Delete an cancha with specified ID
// exports.deleteCancha = function(req, res) {
// 	Cancha.findById(req.params.id, function(err, cancha) {

// 		var torneoDeLaCancha = cancha.torneo;
		
// 		Torneo.findById(torneoDeLaCancha, function(err, torneo_de_la_cancha) {
// 			torneo_de_la_cancha.canchas.pop(cancha);
// 			torneo_de_la_cancha.save(function(err, torneo_de_la_cancha) {
// 				if(err) return res.send(500, err.message);
// 				logger.info("El torneo "+torneoDeLaCancha+" ha quitado a la cancha "+cancha.nombre);
// 			});
// 		});

// 		if(err) return res.send(500, err.message);
// 		if (!cancha) {return res.send(404, "Cancha not found");}
// 		cancha.remove(function(err) {
// 			if(err) return res.send(500, err.message);
// 			logger.info(req.user+" ha borrado la cancha "+cancha.nombre);
//       		res.status(200).jsonp("Successfully deleted");
// 		})
// 	});
// };

// EXAMPLE POST:
// {
//   "nombre": "San Martin",
//   "torneo_actual": "id_del_torneo"
// }
