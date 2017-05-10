'use strict;'

var mongoose = require('mongoose');
var userSchema = mongoose.Schema(
  {
    'firstname': {
      type: String,
      required: true
    },
    'lastname': {
      type: String,
      required: true
    },
    'password':  {
      type: String,
      required: true
    },
    'token': String,
    'email': {
      type: String,
      required: true
    }
  }
);

mongoose.model('User', userSchema);
