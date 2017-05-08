/**
 * Created by Eduardo Velloso on 10/04/2017.
 */
// Set up express
var express = require('express');
var app = express();

// Database setup
require('./models/db.js');

/* Middleware */
var bodyParser = require('body-parser');
var auth = require('./controllers/auth.js');
app.use(bodyParser.json());
app.use(auth.authenticator);

// Routes setup
var routes = require('./routes/routes.js');
app.use('/',routes);

// Start the server
app.listen(8000,function(req,res){
   console.log('Express listening on port 8000');
});
