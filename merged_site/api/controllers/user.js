'use strict;'
var randomstring = require("randomstring");
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {};

module.exports.Update = function(req, res) {

  if(!req.user && !req.user.id) {
    res.status(400).json({'err': 'Unauthorised'});
  } else {

    User.findById(req.user.id, function(err, user) {
      if(!err && user) {
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.password = req.body.password;

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

};

module.exports.Get = function(req, res) {

  if(req.user) {
    res.send(req.user);
  } else {
    res.status(400).json({'err': 'Invalid request'});
  }

};

module.exports.Create = function(req, res) {
  console.log(req.body);
  var user = new User({
    "firstname": req.body.firstname,
    "lastname": req.body.lastname,
    "password": req.body.password,
    "email": req.body.email
  });

  user.token = randomstring.generate(64);
  console.log(user);

  user.save(function(err,newUser){
    if(!err){
      res.send(newUser);
    }else{
      res.status(409).json({'err': 'E-Mail already taken'});
    }
  });
};

module.exports.ReqToken = function(req, res) {

  if(!req.body.email || !req.body.password) {
    res.status(400).json({'err': 'Invalid request'});
    return;
  }

  User.findOne({
    email: req.body.email,
    password: req.body.password,
  }, function(err, user) {
    if(!user) {
      res.status(403).json({'err': 'Incorrect details'});
    } else if(!err){
      var token = randomstring.generate(64);
      user.token = token;
      user.save();
      res.send({token: token, user: user});
    }else{
      res.status(400).json({'err': 'Invalid request'});
    }
  });
};
