var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyparser = require('body-parser');

var userRoutes = require('./routes/user_routes');
var songRoutes = require('./routes/song_routes');

mongoose.connect(process.env.MONG_URI || 'mongodb://localhost/muder_music');

app.use(express.static(__dirname + '/build'));

var router = express.Router();

userRoutes(router);
songRoutes(router);

app.use('/', router);

app.listen(process.env.PORT || 3000, function() {
  console.log('Server Listening port 3000');
});
