'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var authentication = require('express-authentication');

var auth = function (req, res, next) {
  // If authorization header is provided then mark that the user
  // has tried authentication
  var auth = req.headers['authorization'];
  req.challenge = auth;

  if(!auth) {

    req.authenticated = false;
    req.user = null;
    next();

  } else {

    User.findOne({token: auth} , function(err, user) {
      if(user && !err) {
        req.authenticated = true;
        req.user = user;
        next();
      } else {
        req.authenticated = false;
        req.user = null;
        next(); 
      }
    });

  }
};

var getUser = authentication.required(function(req, res) {
  res.status(401).json({'err': 'Unauthorized'});
  return 'route';
});

module.exports = {};
module.exports.authenticator = auth;
module.exports.getUser = getUser
