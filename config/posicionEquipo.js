module.exports = function(app,isAdmin) {

	
    app.get('/posicionesDeLaDivision', isAdmin, function(req, res) {
        client.get("http://localhost:3000/division/"+req.query.divisionId, function (division, response) {
            res.render('./ejs/divisiones/posicionesDeLaDivision.ejs', {user: req.user, divisiones: divisiones, message: req.flash('loginMessage')}; 
            }); 
        }); 

    });

    
    
    

}
