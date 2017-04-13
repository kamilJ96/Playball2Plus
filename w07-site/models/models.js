/**
 * Created by Eduardo Velloso on 10/04/2017.
 */
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var Album = new mongoose.Schema({
    album       : ObjectId
  , year        : Number
  , title       : String
  , track_count : Number
});
var Artist = new mongoose.Schema({
    name      : String
  , albums    : [Album]
});

mongoose.model('Artist', Artist);
