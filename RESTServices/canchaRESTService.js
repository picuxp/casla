var CanchaRESTService = require('../services/canchaService');

module.exports = function(express,app) {

	/**
	 * @swagger
	 * definition:
	 *   CanchaModel:
	 *     properties:
	 *       nombre:
	 *         type: string
	 *       torneo:
	 *         $ref: Torneo
	*/
	var canchas = express.Router();

	/**
	 * @swagger
	 * /cancha:
	 *   get:
	 *     tags:
	 *       - CanchaModel
	 *     description: Returns all canchas
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: An array of canchas
	 *         schema:
	 *           $ref: '#/definitions/CanchaModel'
	 */
	canchas.get('/', CanchaRESTService.findAllCanchas);

	/**
	 * @swagger
	 * /cancha:
	 *   post:
	 *     tags:
	 *       - CanchaModel
	 *     description: Creates a new cancha
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: cancha
	 *         description: Cancha object
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/CanchaModel'
	 *     responses:
	 *       200:
	 *         description: Successfully created
	 */
	canchas.post('/', CanchaRESTService.addCancha);

	/**
	 * @swagger
	 * /cancha/{id}:
	 *   get:
	 *     tags:
	 *       - CanchaModel
	 *     description: Returns a single cancha
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Cancha's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *     responses:
	 *       200:
	 *         description: A single cancha
	 *         schema:
	 *           $ref: '#/definitions/CanchaModel'
	 */
	canchas.get('/:id', CanchaRESTService.findById);

	/**
	 * @swagger
	 * /cancha/torneo/{id}:
	 *   get:
	 *     tags:
	 *       - CanchaModel
	 *     description: Returns all canchas from a specific torneo
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
	 *         description: An array of canchas
	 *         schema:
	 *           $ref: '#/definitions/CanchaModel'
	 */
	 canchas.get('/torneo/:id', CanchaRESTService.findByTorneoId);


	/**
	 * @swagger
	 * /cancha/{id}:
	 *   put:
	 *     tags:
	 *       - CanchaModel
	 *     description: Updates a single cancha
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Cancha's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *       - name: cancha
	 *         description: New fields for the Cancha resource
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/CanchaModel'
	 *     responses:
	 *       200:
	 *         description: Successfully updated
	 */
	canchas.put('/:id', CanchaRESTService.updateCancha);

	/**
	 * @swagger
	 * /cancha/{id}:
	 *   delete:
	 *     tags:
	 *       - CanchaModel
	 *     description: Deletes a single cancha
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Cancha's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *     responses:
	 *       200:
	 *         description: Successfully deleted
	 */
	//canchas.delete('/:id', CanchaRESTService.deleteCancha);


	app.use('/cancha', canchas);

};
