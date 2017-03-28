var TorneoCtrl = require('../services/torneoService');

module.exports = function(express,app) {

	/**
	 * @swagger
	 * definition:
	 *   Torneo:
	 *     properties:
	 *       nombre:
	 *         type: string
	 *       jugadores_por_equipo:
	 *         type: integer
	 *       activo:
	 *         type: boolean
	 *       canchas:
	 *         $ref: Cancha
	 *       equipos:
	 *         $ref: Equipo
	 *       divisiones:
	 *         $ref: Division
	*/
	var torneos = express.Router();


	/**
	 * @swagger
	 * /torneo:
	 *   get:
	 *     tags:
	 *       - Torneo
	 *     description: Returns all active torneos
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: An array of torneos
	 *         schema:
	 *           $ref: '#/definitions/Torneo'
	 */
	torneos.get('/', TorneoCtrl.findAllTorneos);


	/**
	 * @swagger
	 * /torneo/{id}/equipos:
	 *   get:
	 *     tags:
	 *       - Torneo
	 *     description: Returns all equipos from a torneo
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
	 *         description: An array of equipos
	 *         schema:
	 *           $ref: '#/definitions/Equipo'
	 */
	torneos.get('/:id/equipos', TorneoCtrl.findEquiposFromTorneo);  //PASAR ESTA FUNCION A EQUIPO?? NO A TORNEO

	/**
	 * @swagger
	 * /torneo/{id}/partidos:
	 *   get:
	 *     tags:
	 *       - Torneo
	 *     description: Returns all partidos from a torneo
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
	 *         description: An array of partidos
	 *         schema:
	 *           $ref: '#/definitions/Partido'
	 */
	torneos.get('/:id/partidos', TorneoCtrl.findPartidosFromTorneo);  //PASAR ESTA FUNCION A PARTIDO?? NO A TORNEO

	 /**
	 * @swagger
	 * /torneo:
	 *   post:
	 *     tags:
	 *       - Torneo
	 *     description: Creates a new torneo
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: torneo
	 *         description: Torneo object
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/Torneo'
	 *     responses:
	 *       200:
	 *         description: Successfully created
	 */
	 torneos.post('/', TorneoCtrl.addTorneo);

	 /**
	 * @swagger
	 * /torneo/{id}:
	 *   get:
	 *     tags:
	 *       - Torneo
	 *     description: Returns a single torneo
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
	 *         description: A single torneo
	 *         schema:
	 *           $ref: '#/definitions/Torneo'
	 */
	 torneos.get('/:id', TorneoCtrl.findById);

	/**
	 * @swagger
	 * /torneo/{id}/canchas:
	 *   get:
	 *     tags:
	 *       - Torneo
	 *     description: Returns all canchas from torneo'id
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
	 *         description: A single torneo
	 *         schema:
	 *           $ref: '#/definitions/Torneo'
	 */
	 torneos.get('/:id/canchas', TorneoCtrl.findAllCanchas);


	 /**
	 * @swagger
	 * /torneo/{id}:
	 *   put:
	 *     tags:
	 *       - Torneo
	 *     description: Updates a single torneo
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Torneo's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *       - name: torneo
	 *         description: New fields for the Torneo resource
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/Torneo'
	 *     responses:
	 *       200:
	 *         description: Successfully updated
	 */
	 torneos.put('/:id', TorneoCtrl.updateTorneo);

	 /**
	 * @swagger
	 * /torneo/{id}/{idCancha}:
	 *   put:
	 *     tags:
	 *       - Torneo
	 *     description: Add a cancha to this torneo
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Torneo's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *       - name: idCancha
	 *         description: Cancha's Id
	 *         in: path
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/Torneo'
	 *     responses:
	 *       200:
	 *         description: Successfully updated
	 */
	 torneos.put('/:id/:idCancha', TorneoCtrl.addCancha);

	 /**
	 * @swagger
	 * /torneo/{id}:
	 *   delete:
	 *     tags:
	 *       - Torneo
	 *     description: Deletes a single torneo
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
	 *         description: Successfully deleted
	 */
	torneos.delete('/:id', TorneoCtrl.deleteTorneo);

	/**
	 * @swagger
	 * /torneo/{id}/{equipo}:
	 *   put:
	 *     tags:
	 *       - Torneo
	 *     description: Update equipos from this torneo
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Torneo's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *       - name: equipo
	 *         description: Equipo id 
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/Torneo'
	 *     responses:
	 *       200:
	 *         description: Successfully updated
	 */
	torneos.put('/:id/:equipo', TorneoCtrl.addEquipo);


	app.use('/torneo', torneos);

};
