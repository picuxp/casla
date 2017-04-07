var PartidoCtrl = require('../services/partidoService');

module.exports = function(express,app) {

	/**
	 * @swagger
	 * definition:
	 *   PartidoModel:
	 *     properties:
	 *       equipo1:
	 *         $ref: Equipo
	 *       equipo2:
	 *         $ref: Equipo
	 *       fecha_numero:
	 *         type: integer
	 *       fecha:
	 *         format: date
	 *       marcador_equipo_1:
	 *         type: integer
	 *       marcador_equipo_2:
	 *         type: integer
	 *       estado:
	 *         type: String
	 *       torneo:
	 *         $ref: Torneo
	 *       amonestados:
	 *         $ref: Jugador
	 *       expulsados:
	 *         $ref: Jugador
	 *       goles:
	 *         $ref: Jugador
	 *       cambios:
	 *         $ref: Cambio
	*/
	var partidos = express.Router();

	/**
	 * @swagger
	 * /partido:
	 *   get:
	 *     tags:
	 *       - PartidoModel
	 *     description: Returns all partidos
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: An array of partidos
	 *         schema:
	 *           $ref: '#/definitions/PartidoModel'
	 */
	 partidos.get('/', PartidoCtrl.findAllPartidos);

	 /**
	 * @swagger
	 * /partido/fecha_numero/{fecha_numero}:
	 *   get:
	 *     tags:
	 *       - PartidoModel
	 *     description: Returns partidos with a specific fecha_numero
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: fecha_numero
	 *         description: fecha_numero's number
	 *         in: path
	 *         required: true
	 *         type: integer
	 *     responses:
	 *       200:
	 *         description: An array of partidos
	 *         schema:
	 *           $ref: '#/definitions/PartidoModel'
	 */
	 partidos.get('/fecha_numero/:fecha_numero', PartidoCtrl.findByFechaNumero);

	 /**
	 * @swagger
	 * /partido/estado/{estado}:
	 *   get:
	 *     tags:
	 *       - PartidoModel
	 *     description: Returns partidos with a specific estado
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: estado
	 *         description: estado
	 *         in: path
	 *         required: true
	 *         type: string
	 *     responses:
	 *       200:
	 *         description: An array of partidos
	 *         schema:
	 *           $ref: '#/definitions/PartidoModel'
	 */
	 partidos.get('/estado/:estado', PartidoCtrl.findByEstado);

	 /**
	 * @swagger
	 * /partido/numeros_fechas:
	 *   get:
	 *     tags:
	 *       - PartidoModel
	 *     description: Returns all distinct numero_fecha from partidos
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: An array of numero_fecha
	 *         schema:
	 *           type: integer
	 */
	 partidos.get('/numeros_fechas', PartidoCtrl.findNumerosFechasDisponibles);

	 /**
	 * @swagger
	 * /partido:
	 *   post:
	 *     tags:
	 *       - PartidoModel
	 *     description: Creates a new partido
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: partido
	 *         description: Partido object
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/PartidoModel'
	 *     responses:
	 *       200:
	 *         description: Successfully created
	 */
	 partidos.post('/', PartidoCtrl.addPartido);

	 /**
	 * @swagger
	 * /partido/{id}:
	 *   get:
	 *     tags:
	 *       - PartidoModel
	 *     description: Returns a single partido
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Partido's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *     responses:
	 *       200:
	 *         description: A single partido
	 *         schema:
	 *           $ref: '#/definitions/PartidoModel'
	 */
	 partidos.get('/:id', PartidoCtrl.findById);


	 /**
	 * @swagger
	 * /partido/{id}:
	 *   put:
	 *     tags:
	 *       - PartidoModel
	 *     description: Updates a single partido
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Partido's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *       - name: partido
	 *         description: New fields for the Partido resource
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/PartidoModel'
	 *     responses:
	 *       200:
	 *         description: Successfully created
	 */
	 partidos.put('/:id', PartidoCtrl.updatePartido);

	 /**
	 * @swagger
	 * /partido/{id}:
	 *   delete:
	 *     tags:
	 *       - PartidoModel
	 *     description: Deletes a single partido
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Partido's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *     responses:
	 *       200:
	 *         description: Successfully deleted
	 */
	 partidos.delete('/:id', PartidoCtrl.deletePartido);


	app.use('/partido', partidos);

};
