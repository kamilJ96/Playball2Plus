'use strict';

var mongoose = require('mongoose');
var Event = mongoose.model('Event');

var createEvent = function(req,res){
  // Sanitize the textual inputs before processing them
  var event = new Event({
    "title":req.body.title,
    "description":req.body.description,
    "address":req.body.address,
    "numParticipants":req.body.numParticipants,
    "sport":req.body.sport,
    "start": req.body.start,
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

  Event.find(
    { $text : { $search : query } },
    { score : { $meta: "textScore" } }
  )
  .sort({ score : { $meta : 'textScore' } })
  .exec(function(err, events) {
    if(!err){
      console.log(events);
      res.send(events);
    }else{
      res.sendStatus(404);
    }
  });
};

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

var signupEvent = function(req, res) {
  if(!req.user || !req.user.id) {
    res.status(400).json({'err': 'Unable to signup if not logged in'});
  } else {

    var eventIndex = req.params.id;
    Event.findById(eventIndex, function(err, event) {
      if(!err){
        if(event.participants.indexOf(req.user._id) === -1) {
          event.participants.push(req.user._id); 
          event.save();
        } else {
          res.status(400).json({'err': 'Already signed up!'}); 
        }
      }else{
        res.status(404).json({'err': 'Cannot find event'});
      }
    });
  }
};

module.exports.createEvent = createEvent;
module.exports.findAllEvents = findAllEvents;
module.exports.findOneEvent = findOneEvent;
module.exports.queryEvent = queryEvent;
module.exports.signupEvent = signupEvent;
