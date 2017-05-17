'use strict';
var uuid = require('node-uuid');
var multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname,'../../uploads'));
  },
  filename: function (req, file, callback) {
    callback(null, uuid.v4() + '.jpg');
  }
});

var upload = multer({ storage : storage}).single('file');

module.exports.file = function(req, res) {
  upload(req,res,function(err) {
    if(err) {
        return res.status(400).json({'err': 'Error uploading file'});
    }
    res.status(200).json({'file': '/uploads/' + req.file.filename});
  });
};
