var mongoose = require('mongoose');
var Event = mongoose.model('Event');

var createEvent = function(req,res){
	// Sanitize the textual inputs before processing them
	req.sanitize('name').escape();
	req.sanitize('name').trim();

	req.sanitize('desc').escape();
	req.sanitize('desc').trim();

	req.sanitize('address').escape();
	req.sanitize('address').trim();

    var event = new Event({
        "name":req.body.name,
        "description":req.body.desc,
        "address":req.body.address,
        "participantsRequried":req.body.numParticipants,
        "sport":req.body.sport,
        "participants":"john"
    });
    event.save(function(err,newEvent){
        if(!err){
            res.send(newEvent);
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

module.exports.createEvent = createEvent;
module.exports.findAllEvents = findAllEvents;
module.exports.findOneEvent = findOneEvent;
