var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
  username: 'String',
  email: 'String',
  avatar: 'String',
  songs: [{type: Schema.Types.ObjectId, ref:'Song'}]
});

module.exports = mongoose.model('User', userSchema);
