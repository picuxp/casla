/**
 * Created by franc on 09/06/2017.
 */

var FixtureCtrl = require('../services/fixtureService');

module.exports = function(express,app) {

    var fixture = express.Router();

    /**
     * @swagger
     * /fixture/:id:
     *   get:
     *     description: Returns partidos de la division
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: division's id
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: An array of partidos
     *         schema:
     *           $ref: '#/definitions/partidoModel'
     */

    fixture.get('/division/:id', FixtureCtrl.getPartidos);

    app.use('/fixture', fixture);

};

