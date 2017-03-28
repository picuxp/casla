var swaggerJSDoc    = require('swagger-jsdoc');

    // swagger definition
var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'CASLA RESTful API',
  },
  host: 'localhost:3000',
  basePath: '/',
};
// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./RESTServices/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

module.exports = function(app) {
    // serve swagger
	app.get('/swagger.json', function(req, res) {
	  res.setHeader('Content-Type', 'application/json');
	  res.send(swaggerSpec);
	});

};
