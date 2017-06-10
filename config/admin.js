module.exports = function(app) {

    //------------------------------USUARIOS----------------------------------------//
    require("./usuarios.js")(app,isAdmin);


    //------------------------------TORNEOS----------------------------------------//
    require("./torneos.js")(app,isAdmin);

    //------------------------------EQUIPOS----------------------------------------//
    require("./equipos.js")(app,isAdmin);


    //------------------------------PARTIDOS----------------------------------------//
    require("./partidos.js")(app,isAdmin);

    //------------------------------DIVISIONES----------------------------------------//
    require("./divisiones.js")(app,isAdmin);
    require("./posicionEquipo.js")(app,isAdmin);
    require("./fixture.js")(app,isAdmin);

    //------------------------------CANCHAS----------------------------------------//
    require("./canchas.js")(app,isAdmin);

}

// route middleware to make sure a user is ADMIN
function isAdmin(req, res, next) {
    console.log("ENTRE AL ISADMIN")
    // if user is authenticated in the session, carry on 
    if ( (req.isAuthenticated()) && ( (req.user.role == "ADMIN") || (req.user.role == "SUPER_ADMIN"))) // SUPER_ADMIN can access everything
        return next();
    console.log("DIO QUE NO ES ADMINNN")
    // if they aren't redirect them to the home page
    res.redirect('/');
}

