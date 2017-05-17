'use strict';

var mongoose = require('mongoose');
var Event = mongoose.model('Event');

var createEvent = function(req,res){
  // Sanitize the textual inputs before processing them
  if(!req.user && !req.user.id) {
    res.status(400).json({'err': 'Need to be logged in to create events'});
  } else {

    var event = new Event({
      "title":req.body.title,
      "description":req.body.description,
      "address":req.body.address,
      "numParticipants":req.body.numParticipants,
      "sport":req.body.sport,
      "start": req.body.start,
      "creator": req.user.id,
      "img_url": "/images/"+ req.body.sport + ".jpg",
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
  }
};

var findAllEvents = function(req,res){
  Event.find()
  .populate('participants', 'firstname img_url')
  .exec(function(err,events){
    if(!err){
      res.send(events);
    }else{
      res.sendStatus(404);
    }
  });
};

var filterQueryEvent = function(req, res) {
  if(!req.user || !req.user.id) {
    res.status(400).json({'err': 'Unable to filter if not logged in'});
  } else {

    //var query = req.params.query;

    Event.find({'creator': req.user.id})
    .populate('participants', 'firstname img_url')
    .exec(function(err, events) {
      if(!err){
        res.send(events);
      }else{
        res.sendStatus(404);
      }
    });
  }
};

var queryEvent = function(req, res) {
  var query = req.params.query;

  Event.find(
    { $text : { $search : query } },
    { score : { $meta: "textScore" } }
  )
  .sort({ score : { $meta : 'textScore' } })
  .populate('participants', 'firstname img_url')
  .exec(function(err, events) {
    if(!err){
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

var cancelSignupEvent = function(req, res) {
  if(!req.user || !req.user.id) {
    res.status(400).json({'err': 'Unable to cancel if not logged in'});
  } else {

    var eventIndex = req.params.id;
    Event.findById(eventIndex, function(err, event) {
      if(!err){
        if(event.creator == req.user.id) {
          res.status(400).json({'err': 'Cannot cancel signup for own event'}); 
        } else if(event.participants.indexOf(req.user._id) === -1) {
          res.status(400).json({'err': 'Not signed up!'}); 
        } else {
          event.participants = event.participants.filter(function(a, i) {
            return a != req.user.id;
          })
          console.log(event.participants);
          event.save();
          res.status(200).json({'msg': 'Success!'}); 
        }
      }else{
        res.status(404).json({'err': 'Cannot find event'});
      }
    });
  }
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
          res.status(200).json({'msg': 'Successful'}); 
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
module.exports.cancelSignupEvent = cancelSignupEvent;
module.exports.filterQueryEvent = filterQueryEvent;
