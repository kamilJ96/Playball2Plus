'use strict;'

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/events', function(err){
  var msg = !err ? 'Connected to mongo' : 'Failed to connect to mongo';
  console.log(msg);
});

mongoose.Promise = global.Promise;

require('./user.js');
require('./event.js');
