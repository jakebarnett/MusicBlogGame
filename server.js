var mongoose = require('mongoose');
var express = require('express');
var app = express();
var User = require('./models/user_model');
var Song = require('./models/song_model');
var bodyparser = require('body-parser');
var moment = require('moment');

var userRoutes = require('./routes/user_routes');
var songRoutes = require('./routes/song_routes');
var userSongsRoutes = require('./routes/usersongs_routes');

mongoose.connect(process.env.MONG_URI || 'mongodb://localhost/muder_music');

app.use(bodyparser.json());

app.use(express.static(__dirname + '/build'));

var router =  express.Router();

userRoutes(router);
songRoutes(router);
userSongsRoutes(router);

app.use('/', router);

app.listen(process.env.PORT || 3000, function() {
  console.log('Server Listening port');
});
