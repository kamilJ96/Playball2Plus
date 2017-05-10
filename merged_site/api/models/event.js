'use strict;'

var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
  'name': {
    type: String,
    required: true
  },
  'description': {
    type: String,
    required: true
  },
  'address': {
    type: String,
    required: true
  },
  'numParticipants': {
    type: String,
    required: true
  },
  'sport': {
    type: String,
    required: true
  },
  'date': {
    type: String,
    required: true
  },
  'img': {
    type: String,
    required: true
  },
  'participants':
    [{
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }]
  }
);

mongoose.model('Event', eventSchema);
