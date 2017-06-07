var moment = require('moment');

module.exports = function(app) {
    app.get('/delegado', isDelegado, function(req, res) {
        if (req.user.equipo){
            client.get("http://localhost:3000/equipo/"+req.user.equipo, function (equipo, response) {
                client.get("http://localhost:3000/division", function (divisiones, response) {
                    client.get("http://localhost:3000/jugador/equipo/"+req.user.equipo, function (jugadores, response) {
                        res.render('./ejs/delegados/miEquipo.ejs', {user: req.user, equipo:equipo, message: req.flash('loginMessage'),
                            jugadores:jugadores, divisiones:divisiones, resultado: req.session.statusDelete});
                    });
                });
            });
        } else {
            res.render('./ejs/delegados/miEquipo.ejs', {user: req.user, message: req.flash('loginMessage'),equipo:null,
                jugadores:null, resultado: req.session.statusDelete});
        }
    });

    app.get('/addJugador', isDelegado, function(req, res) {
        client.get("http://localhost:3000/equipo/"+req.user.equipo, function (equipo, response) {
            client.get("http://localhost:3000/division", function (divisiones, response) {
                res.render('./ejs/delegados/agregarJugador.ejs', {user: req.user, divisiones:divisiones, equipo:equipo, message: req.flash('loginMessage'),
                    resultado: req.session.statusDelete});
            });
        });
    });

    app.post('/datosJugador', isDelegado, function(req, res) {
        client.get("http://localhost:3000/jugador/"+req.body.jugadorid, function (jugador, response) {
            client.get("http://localhost:3000/division", function (divisiones, response) {
            client.get("http://localhost:3000/equipo/"+req.user.equipo, function (equipo, response) {
                res.render('./ejs/delegados/datosJugador.ejs', {user: req.user, equipo:equipo, jugador:jugador, message: req.flash('loginMessage'),
                    resultado: req.session.statusDelete, divisiones:divisiones, moment:moment});
            });
        });
        });

    });


    app.post('/agregarJugador', isDelegado, function(req, res) {
        var args = {
            data:  req.body ,
            headers: { "Content-Type": "application/json" }
        };
        client.post("http://localhost:3000/jugador", args, function (data, response) {
            console.log("POST /jugador");
            res.redirect('/delegado');
        });
    });

    app.post('/deleteJugador', isDelegado, function(req, res) {
        client.delete("http://localhost:3000/jugador/"+req.body.jugadorid, function (data, response) {
            console.log("DELETE /jugador/"+req.body.jugadorid);
            req.session.statusDelete = response.statusCode;
            res.redirect('/delegado');
        });
    });


}

// route middleware to make sure a user is logged in (DELEGADO)
function isDelegado(req, res, next) {

    // if user is authenticated in the session, carry on 
    if ((req.isAuthenticated()) && ( (req.user.role == "DELEGADO") || (req.user.role == "SUPER_ADMIN")))
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}