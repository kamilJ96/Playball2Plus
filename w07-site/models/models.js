/**
 * Created by Eduardo Velloso on 10/04/2017.
 */
var mongoose = require('mongoose');
var Album = new mongoose.Schema({
    album       : ObjectId
  , year        : int
  , title       : String
  , track_count : int
});
var Artist = new mongoose.Schema({
    name      : String
  , albums    : [Album]
});

mongoose.model('Artist', Artist);
mongoose.model('Album', Album);
