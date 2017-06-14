var express         = require("express"),
    app             = express(),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose'),
    morgan          = require('morgan'),
    passport        = require('passport'),
    flash           = require('connect-flash'),
    cookieParser    = require('cookie-parser'),
    session         = require('express-session'),
    bodyParser      = require('body-parser'),
    port            = process.env.PORT || 8080,
    Client          = require('node-rest-client').Client;
    // paginate        = require('express-paginate');

client = new Client();
var swagger = require('./config/swaggerConfig')(app);
var logger = require('./logger');


// Connection to DB

///////////////////////LOCAL/////////////////////////////////////////////
mongoose.connect('mongodb://localhost/casla', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

/////////////////////PRODUCCION//////////////////////////////////////////
//mongoose.connect('mongodb://copaviejogasometro:Ka1438657@ds123182.mlab.com:23182/casla', function(err, res) {
//  if(err) throw err;
//  console.log('Connected to Database');
//});


require('./config/passport')(passport,logger); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/views'));

// required for passport
app.use(session({ secret: 'lancha-dante' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

var models   = require('./models/includingModels')(app, mongoose);

// routes ======================================================================
require('./config/routes.js')(express,app, passport,client, logger); // load our routes and pass in our app and fully configured passport
require('./config/admin')(app);
require('./config/delegados')(app);
require('./config/planilleros')(app);
// require('./config/jugadorRoutes')(express,app);

// Start server
app.listen(process.env.PORT || 3000, function() {
  console.log(process.version)
  logger.info("Node server running on port 3000");
  logger.debug('Debugging info');
});
