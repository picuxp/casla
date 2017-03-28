var moment = require('moment');

 module.exports = function(app, isAdmin) {
    app.get('/torneos', isAdmin, function(req, res) {
        client.get("http://localhost:3000/torneo", function (torneos, response) {
            res.render('./ejs/torneos/torneos.ejs', { message: req.flash('signupMessage'), torneos: torneos, user: req.user, resultado: req.session.statusDelete});
        }); 
    });

    app.get('/agregarTorneos', isAdmin, function(req, res) {
         res.render('./ejs/torneos/agregarTorneos.ejs', {user: req.user, message: req.flash('loginMessage')}); 
    });

    app.post('/equiposTorneo', isAdmin, function(req, res) {
        client.get("http://localhost:3000/torneo/"+req.body.torneoid+"/equipos", function (data, response) {
         res.render('./ejs/torneos/equiposTorneo.ejs', {user: req.user, equipos:data.equipos, torneo: data.torneo, message: req.flash('loginMessage')}); 
        });
    });

    app.post('/partidosTorneo', isAdmin, function(req, res) {
        client.get("http://localhost:3000/torneo/"+req.body.torneoid+"/partidos", function (data, response) {
            client.get("http://localhost:3000/equipo", function (equipos, response) {
                var equiposMap =  {};
                for (var i = 0; i < equipos.length; i++) {
                    equiposMap[equipos[i]._id] = equipos[i].nombre;
                };
                res.render('./ejs/torneos/partidosTorneo.ejs', {user: req.user, partidos:data.partidos, equipos:equiposMap, torneo: data.torneo, moment:moment, message: req.flash('loginMessage')}); 
            });
        });
    });

    app.post('/canchasTorneo', isAdmin, function(req, res) {
        client.get("http://localhost:3000/torneo/"+req.body.torneoid+"/canchas", function (data, response) {
            client.get("http://localhost:3000/cancha", function (canchas, response) {
            var canchasMap = {};
                for(var i =0; i<canchas.length;i++){
                    canchasMap[canchas[i]._id] = canchas[i].nombre;
                }
                res.render('./ejs/torneos/canchasTorneo.ejs', {user: req.user, canchas:canchasMap, torneo: data.torneo, moment:moment, message: req.flash('loginMessage')}); 
            });
        });
    });

    app.post('/agregarTorneo', isAdmin, function(req, res) {
        var args = {
            data:  req.body ,
            headers: { "Content-Type": "application/json" }
        };
        client.post("http://localhost:3000/torneo", args, function (data, response) {
            console.log("POST /torneo");
            res.redirect('/torneos');
        });  
    });

    app.post('/deleteTorneo', isAdmin, function(req, res) {
        client.delete("http://localhost:3000/torneo/"+req.body.torneoid, function (data, response) {
            console.log("DELETE /torneo/"+req.body.torneoid);
            req.session.statusDelete = response.statusCode;
            res.redirect('/torneos');
        });  
    });
}