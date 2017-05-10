/**
 * Created by Eduardo Velloso on 10/04/2017.
 */
// Set up express
var express = require('express');
var expressValidator = require('express-validator');
var app = express();

// Database setup
require('./api/models/db.js');

/* Middleware */
var bodyParser = require('body-parser');
var auth = require('./api/controllers/auth.js');
app.use(bodyParser.json());
app.use(expressValidator());
app.use(auth.authenticator);

// Routes setup
var routes = require('./api/routes/routes.js');
app.use('/api',routes);

app.use(express.static('frontend'));

// Start the server
app.listen(8000,function(req,res){
   console.log('Express listening on port 8000');
});
