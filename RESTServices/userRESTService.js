var UserCtrl = require('../services/userService');

module.exports = function(express,app) {



	/**
	 * @swagger
	 * definition:
	 *   User:
	 *     properties:
	 *       email:
	 *         type: string
	 *       password:
	 *         type: string
	 *       equipo:
	 *         type: string
	 *       role:
	 *         type: string
     *   	   enum:
     *    	   - GET
	*/
	
	var usuarios = express.Router();


	/**
	 * @swagger
	 * /user:
	 *   get:
	 *     tags:
	 *       - User
	 *     description: Returns all users
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: An array of users
	 *         schema:
	 *           $ref: '#/definitions/User'
	 */
	usuarios.get('/', UserCtrl.findAllUsuarios);

	/**
	 * @swagger
	 * /user/notAdmins:
	 *   get:
	 *     tags:
	 *       - User
	 *     description: Returns all users but superadmins
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: An array of users
	 *         schema:
	 *           $ref: '#/definitions/User'
	 */
	usuarios.get('/notAdmins', UserCtrl.findAllUsuariosButAdmins);

	/**
	 * @swagger
	 * /user/username/{username}:
	 *   get:
	 *     tags:
	 *       - User
	 *     description: Get not superadmin users with a regex in their email
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: username
	 *         description: User's email regex
	 *         in: path
	 *         required: true
	 *         type: integer
	 *     responses:
	 *       200:
	 *         description: An array of users
	 *         schema:
	 *           $ref: '#/definitions/User'
	 */
	usuarios.get('/username/:username', UserCtrl.findAllUsuariosButAdminsRegex);

	 /**
	 * @swagger
	 * /user:
	 *   post:
	 *     tags:
	 *       - User
	 *     description: Creates a new user
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: user
	 *         description: User object
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/User'
	 *     responses:
	 *       200:
	 *         description: Successfully created
	 */
	 usuarios.post('/', UserCtrl.addUser);  //TRATAR DE USAR EL DE PASSPORT.JS PREFERENTEMENTE
	 
	/**
	 * @swagger
	 * /user/{id}:
	 *   delete:
	 *     tags:
	 *       - User
	 *     description: Deletes a single user
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: User's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *     responses:
	 *       200:
	 *         description: Successfully deleted
	 */
	usuarios.delete('/:id', UserCtrl.deleteUser);

	/**
	 * @swagger
	 * /user/{id}:
	 *   put:
	 *     tags:
	 *       - User
	 *     description: Updates a single user
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: User's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *       - name: user
	 *         description: New fields for the User resource
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/User'
	 *     responses:
	 *       200:
	 *         description: Successfully updated
	 */
	 usuarios.put('/:id', UserCtrl.updateUser);



	app.use('/user', usuarios);

};