var express = require( 'express' );
var app = express();

//Model configuration
var config = require( './config' );
var counsel = require('./counsel');
var apiRoute = require('./routes/api');

//Authentication
var passport = require('passport');
require('./passport')(passport);
var session      = require('express-session');

//Processing data
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Set the view engine to ejs
app.set( 'view engine', 'ejs' );

//Public folder to store assets
app.use( express.static( __dirname + '/public' ) ); 

//Set up middleware for parsing
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//Required for passport
app.use(session({ secret: config.web.secret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Routing
require('./routes/routes.js')(app, passport);
app.use('/api', apiRoute);

//Sync databases
counsel.sync();

module.exports = app