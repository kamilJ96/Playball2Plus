var mongoose = require('mongoose');
var Event = mongoose.model('Event');

var createEvents = function(req,res){
    var event = new Event({
        "name":req.body.name,
        "description":req.body.description,
        "address":req.body.address,
        "participantsRequried":req.body.participantsRequried,
        "sport":req.body.sport,
        "participants":req.body.participants
    });
    event.save(function(err,newEvent){
        if(!err){
            res.send(newEvents);
        }else{
            res.sendStatus(400);
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

module.exports.createEvents = createEvents;
module.exports.findAllEvents = findAllEvents;
module.exports.findOneEvent = findOneEvent;
