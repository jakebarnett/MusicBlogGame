var mongoose = require('mongoose');
var User = require('./user_model');
var Schema = mongoose.Schema;
var moment = require('moment');

var songSchema = new Schema ({
  songUrl: String,
  points: {type: Number, default: 0},
  postedDate: {type: String, default: moment().format('MM DD YY')},
  postedBy: 'String'
});

module.exports = mongoose.model('Song', songSchema);
