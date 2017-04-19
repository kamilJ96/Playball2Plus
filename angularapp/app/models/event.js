var mongoose = require('mongoose');
var eventSchema = mongoose.Schema(
  {
    'name': 			String,
    'address': 			String,
    'participantsRequired':	Number,
    'sport':			String,
    'participants':
	    [{
		type: Schema.Types.ObjectId, ref: 'User'
	    }]
  }
);

mongoose.model('Event', eventSchema);
