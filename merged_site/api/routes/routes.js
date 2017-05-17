'use strict;'

var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth.js');
var user = require('../controllers/user.js');
var event = require('../controllers/event.js');
var upload = require('../controllers/upload.js');

//CRU for user
router.post('/user', user.Create);
router.get('/user', user.Get);
router.put('/user', user.Update);
router.post('/token', user.ReqToken);  

router.post('/upload', upload.file);

//CR for event
router.post('/event', event.createEvent);
router.get('/event', event.findAllEvents);
router.get('/event/search/:query', event.queryEvent);
router.get('/event/:id', event.findOneEvent);
router.post('/event/:id/signup', event.signupEvent);

module.exports = router;
