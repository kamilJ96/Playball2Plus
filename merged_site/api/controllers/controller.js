'use strict';

var mongoose = require('mongoose');
var Event = mongoose.model('Event');

var createEvent = function(req,res){
  // Sanitize the textual inputs before processing them
  var event = new Event({
    "name":req.body.name,
    "description":req.body.description,
    "address":req.body.address,
    "numParticipants":req.body.numParticipants,
    "sport":req.body.sport,
    "date": req.body.date,
    "img": "images/bball.jpg",
    "participants": []
  });
  event.save(function(err,newEvent){
    if(!err){
      res.send(newEvent);
    }else{
      res.status(400).json({"err": err.message});
      console.log(err);
    }
  });
};

var findAllEvents = function(req,res){
  Event.find(function(err,events){
    if(!err){
      res.send(events);
    }else{
      res.sendStatus(404);
    }
  });
};

var queryEvent = function(req, res) {
  var query = req.params.query;

  Event.find(function(err,events){
    if(!err){
      res.send(events);
    }else{
      res.sendStatus(404);
    }
  });
}

var findOneEvent = function(req,res){
  var cafeInx = req.params.id;
  Event.findById(cafeInx,function(err,event){
    if(!err){
      res.send(event);
    }else{
      res.sendStatus(404);
    }
  });
};

module.exports.createEvent = createEvent;
module.exports.findAllEvents = findAllEvents;
module.exports.findOneEvent = findOneEvent;
module.exports.queryEvent = queryEvent;
