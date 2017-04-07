var moment = require('moment');

module.exports = function(app) {
	app.get('/planillero', isPlanillero, function(req, res) {
		client.get("http://localhost:3000/partido/estado/N.E", function (partidos, response) {
			     client.get("http://localhost:3000/equipo", function (equipos, response) {
                var equiposMap =  {};
                for (var i = 0; i < equipos.length; i++) {
                    equiposMap[equipos[i]._id] = equipos[i].nombre;
                };
                client.get("http://localhost:3000/division", function (divisiones, response) {
                    var divisionesMap =  {};
                    for (var i = 0; i < divisiones.length; i++) {
                        divisionesMap[divisiones[i]._id] = divisiones[i].nombre;
                    };
                    client.get("http://localhost:3000/partido/numeros_fechas", function (numeros_fechas, response) {
	        			//res.render('./ejs/planilleros/planillero.ejs', {user: req.user, partidos:partidos, message: req.flash('loginMessage'),
	         			//										numeros_fechas:numeros_fechas, divisiones:divisionesMap, equipos:equiposMap, resultado: req.session.statusDelete});
                        res.render('./ejs/partidos/partidos.ejs', {user: req.user, 
                                                              partidos:partidos, 
                                                              message: req.flash('loginMessage'),
                                                              numeros_fechas:numeros_fechas, 
                                                              divisiones:divisionesMap, 
                                                              equipos:equiposMap, 
                                                              resultado: req.session.statusDelete});
                        }); 
	               }); 
            });
	   });
    });

    app.get('/cargarPartido', isPlanillero, function(req, res) {
    console.log('estoy en GET de /cargarPartido, partidoid='+req.query.partidoid);
        client.get("http://localhost:3000/partido/"+req.query.partidoid, function (partido, response) {
            res.render('./ejs/partidos/cargarPartido.ejs', {user: req.user, partido: partido, message: req.flash('loginMessage'), resultado: req.session.statusSaved}); 
        }); 
    });

    app.post('/cargarPartido', isPlanillero, function(req, res) {
    console.log('estoy en POST de /cargarPartido, partidoid='+req.query.partidoid);
      client.get("http://localhost:3000/partido/"+req.query.partidoid, function (partido, response) {
        res.render('./ejs/partidos/cargarPartido.ejs', {user: req.user, partido: partido, message: req.flash('loginMessage'), resultado: req.session.statusSaved}); 
       }); 
    });
}




// route middleware to make sure a user is logged in (DELEGADO)
function isPlanillero(req, res, next) {

    // if user is authenticated in the session, carry on 
    if ((req.isAuthenticated()) && ( (req.user.role == "PLANILLERO") || (req.user.role == "SUPER_ADMIN"))) 
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}