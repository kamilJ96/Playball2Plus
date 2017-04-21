var mongoose = require('mongoose');
var Events = mongoose.model('Events');

var createEvents = function(req,res){
    var event = new Events({
        "name":req.body.name,
        "description":req.body.description,
        "location":req.body.location,
        "date":req.body.date,
        "time":req.body.time,
        "photo":req.body.photo
    });
    event.save(function(err,newEvents){
        if(!err){
            res.send(newEvents);
        }else{
            res.sendStatus(400);
        }
    });
};

var findAllEvents = function(req,res){
    Events.find(function(err,events){
        if(!err){
            res.send(events);
        }else{
            res.sendStatus(404);
        }
    });
};

var findOneEvent = function(req,res){
    var cafeInx = req.params.id;
    Events.findById(cafeInx,function(err,event){
        if(!err){
            res.send(event);
        }else{
            res.sendStatus(404);
        }
    });
};

module.exports.createEvents = createEvents;
module.exports.findAllEvents = findAllEvents;
module.exports.findOneEvent = findOneEvent;