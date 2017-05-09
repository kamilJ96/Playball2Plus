'use strict;'

var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth.js');
var user = require('../controllers/user.js');
var events = require('../controllers/controller.js');

//CRU for user
router.post('/user', user.Create);
router.get('/user/:id', user.Get);
router.put('/user/:id', user.Update);
  
router.get('/public', function(req, res) { 
  res.send("Hello public"); 
});

router.get('/private', auth.getUser, function(req, res){
  res.send("Hello " + req.user);
});

//CRU for events
router.post('/events', events.createEvent);
router.get('/events/:id', events.findOneEvent);

module.exports = router;
