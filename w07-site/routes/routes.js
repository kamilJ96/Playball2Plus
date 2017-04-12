/**
 * Created by Eduardo Velloso on 10/04/2017.
 */

var express = require('express');
var router = express.Router();

var controller = require('../controllers/controller.js');

// Create new cafe
router.post('/api',controller.createCafe);

// Find all cafes
router.get('/api',controller.findAllCafes);

// Find one cafe by id
router.get('/api/:id',controller.findOneCafe);

module.exports = router;