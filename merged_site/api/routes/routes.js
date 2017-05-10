'use strict;'

var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth.js');
var user = require('../controllers/user.js');
var event = require('../controllers/event.js');

//CRU for user
router.post('/user', user.Create);
router.get('/user', user.Get);
router.put('/user', user.Update);
router.post('/token', user.ReqToken);  

router.get('/public', function(req, res) { 
  res.send("Hello public"); 
});

router.get('/private', auth.getUser, function(req, res){
  res.send("Hello " + req.user);
});

//CR for event
router.post('/event', event.createEvent);
router.get('/event', event.findAllEvents);
router.get('/event/search/:query', event.queryEvent);
router.get('/event/:id', event.findOneEvent);

module.exports = router;
