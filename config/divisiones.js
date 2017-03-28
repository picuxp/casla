module.exports = function(app,isAdmin) {

	app.post('/nuevaDivision', isAdmin, function(req, res) {
        client.get("http://localhost:3000/torneo/"+req.body.torneoid, function (torneo, response) {
         res.render('./ejs/divisiones/agregarDivision.ejs', {user: req.user, torneo: torneo, message: req.flash('loginMessage')}); 
        }); 
    });

	app.post('/agregarDivision', isAdmin, function(req, res) {
        var args = {
            data:  req.body ,
            headers: { "Content-Type": "application/json" }
        };
        client.post("http://localhost:3000/division", args, function (data, response) {
            res.redirect('/divisionesDelTorneo?torneoid='+data.torneo._id);
        }); 
    });

    app.get('/divisionesDelTorneo', isAdmin, function(req, res) {
        client.get("http://localhost:3000/torneo/"+req.query.torneoid, function (torneo, response) {
            client.get("http://localhost:3000/division/torneo/"+req.query.torneoid, function (divisiones, response) {
                res.render('./ejs/divisiones/divisionesDelTorneo.ejs', {user: req.user, divisiones: divisiones, 
                                                            torneo:torneo,  message: req.flash('loginMessage')}); 
            }); 
        }); 

    });

    app.post('/deleteDivision', isAdmin, function(req, res) {
        client.delete("http://localhost:3000/division/"+req.body.divisionid, function (data, response) {
            req.session.statusDelete = response.statusCode;
            res.redirect('/divisionesDelTorneo?torneoid='+data);
        });  
    });
    
    
    

}