var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {}

module.exports.Update = function(req, res) {

  var uid = req.params.id;

  User.findById(uid, function(err, user) {
    if(!err) {
      user.email = req.body.email;
      user.password = req.body.password;
      user.username = req.body.username;

      user.save(function(err,newUser){
        if(!err){
          res.send({'success': 'true'});
        }else{
          res.sendStatus(400);
        }
      });

    } else {
      res.sendStatus(404);
    }
  });
}

module.exports.Get = function(req, res) {

  var uid = req.params.id;

  User.findById(uid, function(err, user) {
    if(!err) {
      res.send(event);
    } else {
      res.sendStatus(404);
    }
  });
}

module.exports.Create = function(req, res) {
  var user = new User({
    "username": req.body.username,
    "password": req.body.password,
    "email": req.body.email
  });

  user.save(function(err,newUser){
    if(!err){
      res.send(newUser);
    }else{
      res.sendStatus(400);
    }
  });
}
