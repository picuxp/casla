var EquipoCtrl = require('../services/equipoService');

module.exports = function(express,app) {

	/**
	 * @swagger
	 * definition:
	 *   EquipoModel:
	 *     properties:
	 *       logo:
	 *         type: string
	 *       nombre:
	 *         type: string
	 *       jugadores:
	 *         $ref: Jugador
	 *       division:
	 *         $ref: Division
	 *       partidos:
	 *         $ref: Partido
	 *       delegado:
	 *         $ref: User
	 *       capitan:
	 *         $ref: Jugador
	 *       subcapitan:
	 *         $ref: Jugador

	*/
	var equipos = express.Router();

	/**
	 * @swagger
	 * /equipo:
	 *   get:
	 *     tags:
	 *       - EquipoModel
	 *     description: Returns all equipos
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: An array of equipos
	 *         schema:
	 *           {
  	 *				"logo": "string",
  	 *				"nombre": "string",
  	 *				"torneo_actual": "string",
  	 *				"division": "string",
  	 *				"jugadores": {},
  	 *			 }
	 */
	equipos.get('/', EquipoCtrl.findAllEquipos);


	 /**
	 * @swagger
	 * /equipo:
	 *   post:
	 *     tags:
	 *       - EquipoModel
	 *     description: Creates a new equipo
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: equipo
	 *         description: Equipo object
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/EquipoModel'
	 *     responses:
	 *       200:
	 *         description: Successfully created
	 */
	 equipos.post('/', EquipoCtrl.addEquipo);

	 /**
	 * @swagger
	 * /equipo/{id}:
	 *   get:
	 *     tags:
	 *       - EquipoModel
	 *     description: Returns a single equipo
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Equipo's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *     responses:
	 *       200:
	 *         description: A single equipo
	 *         schema:
	 *           $ref: '#/definitions/EquipoModel'
	 */
	 equipos.get('/:id', EquipoCtrl.findById);

	 /**
	 * @swagger
	 * /equipo/division/{id}:
	 *   get:
	 *     tags:
	 *       - EquipoModel
	 *     description: Returns equipos from a division
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
	 *           $ref: '#/definitions/EquipoModel'
	 */
	 equipos.get('/division/:id', EquipoCtrl.findByDivisionId);


	 /**
	 * @swagger
	 * /equipo/{id}:
	 *   put:
	 *     tags:
	 *       - EquipoModel
	 *     description: Updates a single equipo
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Equipo's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *       - name: equipo
	 *         description: New fields for the Equipo resource
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/EquipoModel'
	 *     responses:
	 *       200:
	 *         description: Successfully updated
	 */
	 equipos.put('/:id', EquipoCtrl.updateEquipo);

	 /**
	 * @swagger
	 * /equipo/{id}:
	 *   delete:
	 *     tags:
	 *       - EquipoModel
	 *     description: Deletes a single equipo
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Equipo's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *     responses:
	 *       200:
	 *         description: Successfully deleted
	 */
	equipos.delete('/:id', EquipoCtrl.deleteEquipo);


	app.use('/equipo', equipos);

};
