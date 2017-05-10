'use strict;'

var mongoose = require('mongoose');

var eventSchema = mongoose.Schema(
  {
    'name': 			String,
    'description':		String,
    'address': 			String,
    'participantsRequired':	Number,
    'sport':			String,
    'participants':
	    [{
		type: mongoose.Schema.Types.ObjectId, ref: 'User'
	    }]
  }
);

mongoose.model('Event', eventSchema);
