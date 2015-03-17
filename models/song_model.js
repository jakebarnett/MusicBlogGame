var mongoose = require('mongoose');
var User = require('./user_model');
var Schema = mongoose.Schema;

var songSchema = new Schema ({
  songUrl: String,
  points: Number,
  postedBy: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Song', songSchema);
