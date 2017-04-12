/**
 * Created by Eduardo Velloso on 10/04/2017.
 */
var mongoose = require('mongoose');
var cafeSchema = mongoose.Schema(
    {
        "name":String,
        "address":String,
        "distance":String,
        "rating":String,
        "photo":String
    }
);
mongoose.model('Cafe',cafeSchema);
