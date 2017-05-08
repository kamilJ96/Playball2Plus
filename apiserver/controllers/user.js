'use strict;'

var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {}

module.exports.Update = function(req, res) {

  var uid = req.params.id;

  User.findById(uid, function(err, user) {
    if(!err && user) {
      user.email = req.body.email;
      user.password = req.body.password;
      user.username = req.body.username;

      user.save(function(err,newUser){
        if(!err && newUser){
          res.send({'success': 'true'});
        }else{
          res.status(400).json({'err': 'Invalid request'});
        }
      });

    } else {
      res.status(404).json({'err': 'Not found'});
    }
  });
}

module.exports.Get = function(req, res) {

  var uid = req.params.id;

  User.findById(uid, function(err, user) {
    if(!err) {
      res.send(user);
    } else {
      res.status(404).json({'err': 'Not found'});
    }
  });
}

module.exports.Create = function(req, res) {
  console.log(req.body);
  var user = new User({
    "username": req.body.username,
    "password": req.body.password,
    "email": req.body.email
  });

  user.save(function(err,newUser){
    if(!err){
      res.send({'success': 'true'});
    }else{
      res.status(400).json({'err': 'Invalid request'});
    }
  });
}
