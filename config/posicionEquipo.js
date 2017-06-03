module.exports = function(app) {
    app.get('/posicionesDeLaDivision/', function(req, res) {
        client.get("http://localhost:3000/posicionEquipo/division/"+req.query.divisionid, function (posicionEquipo, response) {
            client.get("http://localhost:3000/division/", function (divisiones, response) {
                client.get("http://localhost:3000/division/"+req.query.divisionid, function (division, response) {
                    res.render('./ejs/divisiones/posicionesDeLaDivision.ejs', {user: req.user, posicionEquipo:posicionEquipo, divisiones: divisiones, division:division,message: req.flash('loginMessage')});
                });
            });
        });
    });
}
