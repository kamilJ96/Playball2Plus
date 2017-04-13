/**
 * Created by Eduardo Velloso on 10/04/2017.
 */

var express = require('express');
var router = express.Router();

var controller = require('../controllers/controller.js');

// Create new artist
router.post('/artist',controller.createArtist);

// Create new album
router.post('/artist/:id/album',controller.createAlbum);

// Find all artists
router.get('/artist',controller.findAllArtists);

// Find one artist by id
router.get('/artist/:id',controller.findOneArtist);

// Find one album by id
router.get('/artist/album/:id',controller.findOneAlbum);

module.exports = router;
