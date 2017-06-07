// var moment = require('moment');

module.exports = function(app,isAdmin) {
    app.get('/partidos', isAdmin, function(req, res) {
        client.get("http://localhost:3000/division", function (divisiones, response) {
            client.get("http://localhost:3000/partido/numeros_fechas", function (numeros_fechas, response) {
                res.render('./ejs/partidos/partidos.ejs', { message: req.flash('signupMessage'), numeros_fechas:numeros_fechas,
                    user: req.user,divisiones:divisiones
                    ,resultado: req.session.statusDelete});
            });
        });
    });

    app.get('/partidosDelTorneo', isAdmin, function(req, res) {
        console.log('estoy en /partidosDelTorneo');
        client.get("http://localhost:3000/torneo/"+req.query.torneoid, function (torneo, response) {
            client.get("http://localhost:3000/division", function (divisiones, response) {
                res.render('./ejs/torneos/partidosTorneo.ejs', {user: req.user, divisiones:divisiones, torneo: torneo, message: req.flash('loginMessage')});
            });
        });
    });

    app.get('/agregarPartidos', isAdmin, function(req, res) {
        client.get("http://localhost:3000/torneo", function (data, response) {
            client.get("http://localhost:3000/division", function (divisiones, response) {
                res.render('./ejs/partidos/agregarPartidos.ejs', {user: req.user, divisiones:divisiones, torneos: data, message: req.flash('loginMessage')});
            });
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
            data.data["equipo1Old"] = data.equipo1Old;
            data.data["equipo2Old"] = data.equipo2Old;
            data.data["statusOld"] = data.statusOld;
            var args2 = {
                data:  data.data ,
                headers: { "Content-Type": "application/json" }
            };
            client.post("http://localhost:3000/posicionEquipo/updatePosicionEquipo/", args2, function (data, response) {
                console.log("DELETE /partido/"+req.body.partidoid);
                req.session.statusDelete = response.statusCode;
                res.redirect('/partidos');
            });
        });
    });
}