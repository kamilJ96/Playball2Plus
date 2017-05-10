'use strict;'

var mongoose = require('mongoose');
var userSchema = mongoose.Schema(
  {
    'username':  String,
    'password':  String,
    'email':     String
  }
);

mongoose.model('User', userSchema);
