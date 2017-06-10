/**
 * Created by franc on 09/06/2017.
 */
module.exports = function(app) {
    app.get('/fixture/', function(req, res) {
        client.get("http://localhost:3000/fixture/division/"+req.query.divisionid, function (partidos, response) {
            client.get("http://localhost:3000/division/", function (divisiones, response) {
                res.render('./ejs/fixture/fixture.ejs', {user: req.user, divisiones: divisiones,partidos:partidos, message: req.flash('loginMessage')});
            });
        });
    });
}
