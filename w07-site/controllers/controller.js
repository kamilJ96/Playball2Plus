/**
 * Created by Eduardo Velloso on 10/04/2017.
 */
var mongoose = require('mongoose');
var Album = mongoose.model('Album');
var Artist = mongoose.model('Artist');

var createAlbum = function(req,res){
   Artist.findById(req.params.id, function(err, artist) {
      if(!err){

         artist.albums.push({
            "year":req.body.year,
            "title":req.body.title,
            "track_count":req.body.track_count
         });
         artist.save();

      }else{
          res.sendStatus(404);
      }

   });
};

var createArtist = function(req,res){
   var artist = new Artist({
      "name":req.body.name
   });
   artist.save(function(err,newArtist){
      if(!err){
           res.send(newArtist);
      }else{
           res.sendStatus(400);
      }
   });
};

var findAllArtists = function(req,res){
    Artist.find(function(err,artists){
        if(!err){
            res.send(artists);
        }else{
            res.sendStatus(404);
        }
    });
};

var findAllAlbums = function(req,res){
    Album.find(function(err,albums){
        if(!err){
            res.send(albums);
        }else{
            res.sendStatus(404);
        }
    });
};


var findOneCafe = function(req,res){
    var cafeInx = req.params.id;
    Artist.findById(cafeInx,function(err,cafe){
        if(!err){
            res.send(cafe);
        }else{
            res.sendStatus(404);
        }
    });
};

module.exports.createCafe = createCafe;
module.exports.findAllCafes = findAllCafes;
module.exports.findOneCafe = findOneCafe;
