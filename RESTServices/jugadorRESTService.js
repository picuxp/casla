var JugadorCtrl = require('../services/jugadorService');

module.exports = function(express,app) {

	/**
	 * @swagger
	 * definition:
	 *   JugadorModel:
	 *     properties:
	 *       nombre:
	 *         type: string
	 *       apellido:
	 *         type: string
	 *       apodo:
	 *         type: string
	 *       fecha_de_nacimiento:
	 *         format: date
	 *       dni:
	 *         type: integer
	 *       posicion:
	 *         type: string
	 *       numero:
	 *         type: integer
	 *       email:
	 *         type: string
	 *       capitan:
	 *         type: boolean
	 *       subcapitan:
	 *         type: boolean
	 *       equipo:
	 *         $ref: Equipo
	*/
	var jugadores = express.Router();

	/**
	 * @swagger
	 * /jugador:
	 *   get:
	 *     tags:
	 *       - JugadorModel
	 *     description: Returns all jugadores
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: An array of jugadores
	 *         schema:
	 *           $ref: '#/definitions/JugadorModel'
	 */
	 jugadores.get('/', JugadorCtrl.findAllJugadores);

	 /**
	 * @swagger
	 * /jugador:
	 *   post:
	 *     tags:
	 *       - JugadorModel
	 *     description: Creates a new jugador
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: jugador
	 *         description: Jugador object
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/JugadorModel'
	 *     responses:
	 *       200:
	 *         description: Successfully created
	 */
	 jugadores.post('/', JugadorCtrl.addJugador);

	 /**
	 * @swagger
	 * /jugador/{id}:
	 *   get:
	 *     tags:
	 *       - JugadorModel
	 *     description: Returns a single jugador
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Jugador's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *     responses:
	 *       200:
	 *         description: A single jugador
	 *         schema:
	 *           $ref: '#/definitions/JugadorModel'
	 */
	 jugadores.get('/:id', JugadorCtrl.findById);

	 /**
	 * @swagger
	 * /jugador/equipo/{id}:
	 *   get:
	 *     tags:
	 *       - JugadorModel
	 *     description: Returns jugadores from an equipo
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
	 *         description: An array of jugadores
	 *         schema:
	 *           $ref: '#/definitions/JugadorModel'
	 */
	 jugadores.get('/equipo/:id', JugadorCtrl.findByEquipoId);

	 /**
	 * @swagger
	 * /jugador/{id}:
	 *   put:
	 *     tags:
	 *       - JugadorModel
	 *     description: Updates a single jugador
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Jugador's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *       - name: jugador
	 *         description: New fields for the Jugador resource
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/JugadorModel'
	 *     responses:
	 *       200:
	 *         description: Successfully created
	 */
	 jugadores.put('/:id', JugadorCtrl.updateJugador);

	 /**
	 * @swagger
	 * /jugador/{id}:
	 *   delete:
	 *     tags:
	 *       - JugadorModel
	 *     description: Deletes a single jugador
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Jugador's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *     responses:
	 *       200:
	 *         description: Successfully deleted
	 */
	 jugadores.delete('/:id', JugadorCtrl.deleteJugador);


	app.use('/jugador', jugadores);

};
