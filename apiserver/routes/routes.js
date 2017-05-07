/**
 * Created by Eduardo Velloso on 10/04/2017.
 */

var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth.js');
var user = require('../controllers/user.js');

router.post('/user', user.Create);

router.get('/user/:id', user.Get);

router.put('/user/:id', user.Update);
  
router.get('/public', function(req, res) { 
  res.send("Hello public"); 
});

router.get('/private', auth.getUser, function(req, res){
  res.send("Hello " + req.user);
});

module.exports = router;
