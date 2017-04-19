var mongoose = require('mongoose');
var userSchema = mongoose.Schema(
  {
    'username': 	String,
    'password': 	String,
    'name':
    {
      'firstName':	String,
      'lastName':	String
    },
    'dob': 		Date,
    'sports': 		[]
  }
);

mongoose.model('User', userSchema);
