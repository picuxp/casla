var DivisionCtrl = require('../services/divisionService');

module.exports = function(express,app) {

	/**
	 * @swagger
	 * definition:
	 *   DivisionModel:
	 *     properties:
	 *       nombre:
	 *         type: string
	 *       torneo:
	 *         $ref: Torneo
	 *       equipos:
	 *         $ref: Equipo
	*/
	var divisiones = express.Router();

	/**
	 * @swagger
	 * /division:
	 *   get:
	 *     tags:
	 *       - DivisionModel
	 *     description: Returns all divisiones
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: An array of divisiones
	 *         schema:
	 *           $ref: '#/definitions/DivisionModel'
	 */
	 divisiones.get('/', DivisionCtrl.findAllDivisiones);

	 /**
	 * @swagger
	 * /division:
	 *   post:
	 *     tags:
	 *       - DivisionModel
	 *     description: Creates a new division
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: division
	 *         description: Division object
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/DivisionModel'
	 *     responses:
	 *       200:
	 *         description: Successfully created
	 */
	 divisiones.post('/', DivisionCtrl.addDivision);

	 /**
	 * @swagger
	 * /division/{id}:
	 *   get:
	 *     tags:
	 *       - DivisionModel
	 *     description: Returns a single division
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Division's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *     responses:
	 *       200:
	 *         description: A single division
	 *         schema:
	 *           $ref: '#/definitions/DivisionModel'
	 */
	 divisiones.get('/:id', DivisionCtrl.findById);

	 /**
	 * @swagger
	 * /division/torneo/{id}:
	 *   get:
	 *     tags:
	 *       - DivisionModel
	 *     description: Returns all divisiones from a specific torneo
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Torneo's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *     responses:
	 *       200:
	 *         description: An array of divisiones
	 *         schema:
	 *           $ref: '#/definitions/DivisionModel'
	 */
	 divisiones.get('/torneo/:id', DivisionCtrl.findByTorneoId);


	 /**
	 * @swagger
	 * /division/{id}/equipos:
	 *   get:
	 *     tags:
	 *       - DivisionModel
	 *     description: Returns all equipos from a Division
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Division's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *     responses:
	 *       200:
	 *         description: An array of equipos
	 *         schema:
	 *           $ref: '#/definitions/Equipo'
	 */
	divisiones.get('/:id/equipos', DivisionCtrl.findEquiposFromDivision);

	 /**
	 * @swagger
	 * /division/{id}:
	 *   put:
	 *     tags:
	 *       - DivisionModel
	 *     description: Updates a single division
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Division's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *       - name: jugador
	 *         description: New fields for the Division resource
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/DivisionModel'
	 *     responses:
	 *       200:
	 *         description: Successfully created
	 */
	 divisiones.put('/:id', DivisionCtrl.updateDivision);

	 /**
	 * @swagger
	 * /division/{id}/{idEquipo}:
	 *   put:
	 *     tags:
	 *       - DivisionModel
	 *     description: Update equipos from this division
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Division's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *       - name: idEquipo
	 *         description: Equipo id 
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/DivisionModel'
	 *     responses:
	 *       200:
	 *         description: Successfully updated
	 */
	divisiones.put('/:id/:idEquipo', DivisionCtrl.addEquipo);

	 /**
	 * @swagger
	 * /division/{id}:
	 *   delete:
	 *     tags:
	 *       - DivisionModel
	 *     description: Deletes a single division
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Division's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *     responses:
	 *       200:
	 *         description: Successfully deleted
	 */
	 divisiones.delete('/:id', DivisionCtrl.deleteDivision);


	app.use('/division', divisiones);

};
