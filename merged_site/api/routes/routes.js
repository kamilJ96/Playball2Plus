'use strict;'

var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth.js');
var user = require('../controllers/user.js');
var events = require('../controllers/event.js');

//CRU for user
router.post('/user', user.Create);
router.get('/user/:id', user.Get);
router.put('/user/:id', user.Update);
router.post('/token', function(req, res) {
  res.send({ token: 'mytoken', user: 'user' });
});
  
router.get('/public', function(req, res) { 
  res.send("Hello public"); 
});

router.get('/private', auth.getUser, function(req, res){
  res.send("Hello " + req.user);
});

//CR for events
router.post('/events', events.createEvent);
router.get('/events', events.findAllEvents);
router.get('/events/search/:query', events.queryEvent);
router.get('/events/:id', events.findOneEvent);

module.exports = router;
