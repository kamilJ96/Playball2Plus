var mongoose = require('mongoose');
var User = mongoose.model('User');
var authentication = require('express-authentication');

var auth = function (req, res, next) {
  // If authorization header is provided then mark that the user
  // has tried authentication
  req.challenge = req.headers['username'];

  var user = User.findOne({ 'username': req.headers['username'] });
  user = {'username': 'username', 'password': 'password'};
  
  // If the authorization header is correct, mark the request as
  // being authenticated and mark the identity of the authenticator
  // as "fancyuser".
  if (user.password = req.headers['password']) {
    req.authenticated = true;
    req.user = user;
  } else {
    req.authenticated = false;
  }

  // Call the next entry in the middleware chain
  next();
};

var getUser = authentication.required(function(req, res) {
  res.status(401).json({ 'err': 'Unauthorized' });
});

module.exports = {};
module.exports.authenticator = auth;
module.exports.getUser = getUser
