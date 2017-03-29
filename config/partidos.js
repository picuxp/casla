// var moment = require('moment');

module.exports = function(app,isAdmin) {
	app.get('/partidos', isAdmin, function(req, res) {
        // client.get("http://localhost:3000/partido", function (partidos, response) {
        //     client.get("http://localhost:3000/equipo", function (equipos, response) {
        //         var equiposMap =  {};
        //         for (var i = 0; i < equipos.length; i++) {
        //             equiposMap[equipos[i]._id] = equipos[i].nombre;
        //         };
        //         client.get("http://localhost:3000/torneo", function (torneos, response) {
        //             var torneosMap =  {};
        //             for (var i = 0; i < torneos.length; i++) {
        //                 torneosMap[torneos[i]._id] = torneos[i].nombre;
        //             };
                    client.get("http://localhost:3000/partido/numeros_fechas", function (numeros_fechas, response) {
              // res.render('./ejs/partidos/partidos.ejs', { message: req.flash('signupMessage'), partidos: partidos, equipos: equiposMap, numeros_fechas:numeros_fechas,
              //                                               torneos:torneosMap, user: req.user, resultado: req.session.statusDelete, moment:moment});
                    res.render('./ejs/partidos/partidos.ejs', { message: req.flash('signupMessage'), numeros_fechas:numeros_fechas,
                            user: req.user, resultado: req.session.statusDelete});
                    });  
        //         });  
        //     });  
        // });   

    });

    app.get('/partidosDelTorneo', isAdmin, function(req, res) {
        console.log('estoy en /partidosDelTorneo');
        client.get("http://localhost:3000/torneo/"+req.query.torneoid, function (torneo, response) {
            res.render('./ejs/torneos/partidosTorneo.ejs', {user: req.user, torneo: torneo, message: req.flash('loginMessage')}); 
        }); 
    });

    app.get('/agregarPartidos', isAdmin, function(req, res) {
        client.get("http://localhost:3000/torneo", function (data, response) {
         res.render('./ejs/partidos/agregarPartidos.ejs', {user: req.user, torneos: data, message: req.flash('loginMessage')}); 
        }); 
    });

    app.post('/agregarPartido', isAdmin, function(req, res) {
        var args = {
            data:  req.body ,
            headers: { "Content-Type": "application/json" }
        };
        client.post("http://localhost:3000/partido", args, function (data, response) {
            console.log("POST /partidos");
            res.redirect('/partidos');
        });  
    });

    app.post('/deletePartido', isAdmin, function(req, res) {
        client.delete("http://localhost:3000/partido/"+req.body.partidoid, function (data, response) {
            console.log("DELETE /partido/"+req.body.partidoid);
            req.session.statusDelete = response.statusCode;
            res.redirect('/partidos');
        });  
    });
}