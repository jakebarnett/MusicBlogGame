var mongoose = require('mongoose');
var express = require('express');
var User = require('./models/user_model');
var Song = require('./models/song_model');
var bodyparser = require('body-parser');
var moment = require('moment');
var passport = require('passport');
var schedule = require('node-schedule');

var app = express();
app.set('appSecret', process.env.SECRET || 'changethischangethis!');
app.use(passport.initialize());
require('./lib/passport_strat')(passport);

var userRoutes = require('./routes/user_routes');
var songRoutes = require('./routes/song_routes');
var userSongsRoutes = require('./routes/usersongs_routes');

mongoose.connect(process.env.MONG_URI || 'mongodb://localhost/muder_music');

app.use(express.static(__dirname + '/build'));

var router =  express.Router();

userRoutes(router, passport, app.get('appSecret'));
songRoutes(router, app.get('appSecret'));
userSongsRoutes(router);

app.use('/', router);

//resets hasSubmitted and remainingVotes on a timer
var resetVotes = schedule.scheduleJob({}, function(err) {
  console.log('update timer working')
  if (err) console.log ('schedule: ' + err)
  User.update({}, {remainingVotes: 5, hasSubmitted: false}, {multi: true}, function(err) {
    if (err) console.log(err);
    console.log('function is running on timer')
  });
});


app.listen(process.env.PORT || 3000, function() {
  console.log('Server Listening port');
});
