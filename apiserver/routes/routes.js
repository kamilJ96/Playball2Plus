/**
 * Created by Eduardo Velloso on 10/04/2017.
 */

var express = require('express');
var router = express.Router();

var passport = require('../controllers/auth.js');

router.post('/login',
  passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true }
));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
