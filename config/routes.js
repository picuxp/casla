module.exports = function(express,app, passport, client, logger) {

    require('../RESTServices/jugadorRESTService')(express,app);
    require('../RESTServices/torneoRESTService')(express,app);
    require('../RESTServices/equipoRESTService')(express,app);
    require('../RESTServices/userRESTService')(express,app);
    require('../RESTServices/canchaRESTService')(express,app);
    require('../RESTServices/divisionRESTService')(express,app);
    require('../RESTServices/partidoRESTService')(express,app);
    require('../RESTServices/posicionEquipoRESTService')(express,app);

	// =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('./ejs/index.ejs', {user: req.user}); // load the index.ejs file
    });

     app.get('/test', function(req, res) {
        res.render('./ejs/partidos/test.ejs', {user: req.user}); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('./ejs/usuarios/login.ejs', {user: req.user , message: req.flash('loginMessage') }); 
    });

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('./ejs/login/profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.session.destroy(function (err) {
            res.clearCookie('connect.sid');
            res.redirect('/'); 
        });
    });


    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/usuarios', // redirect to the secure profile section
        failureRedirect : '/usuarios', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/signupadmin', passport.authenticate('local-signup-admin', {
        successRedirect : '/usuarios', // redirect to the secure profile section
        failureRedirect : '/usuarios', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/signupplanillero', passport.authenticate('local-signup-planillero', {
        successRedirect : '/usuarios', // redirect to the secure profile section
        failureRedirect : '/usuarios', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

       // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    //VIEWS
    app.get('/goleadores', function(req, res) {
        res.render('./ejs/goleadores.ejs',{user: req.user}); 
    });

    app.get('/sanciones', function(req, res) {
        res.render('./ejs/sanciones.ejs', {user: req.user}); 
    });

    app.get('/fairplay', function(req, res) {
        res.render('./ejs/fairplay.ejs', {user: req.user}); 
    });

    app.get('/superadmin', isSuperAdmin, function(req, res) {
        res.render('./ejs/superadmin.ejs'); // load the index.ejs file
    });
    

}

// route middleware to make sure a user is logged in (DELEGADO)
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

// route middleware to make sure a user is logged in (DELEGADO)
function isPlanillero(req, res, next) {

    // if user is authenticated in the session, carry on 
    if ((req.isAuthenticated()) && ( (req.user.role == "PLANILLERO") || (req.user.role == "SUPER_ADMIN"))) 
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}



// route middleware to make sure a user is SUPER_ADMIN
function isSuperAdmin(req, res, next) {

    // if user is authenticated in the session, carry on 
    if ( (req.isAuthenticated()) && (req.user.role == "SUPER_ADMIN"))
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
