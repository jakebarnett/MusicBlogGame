var mongoose = require('mongoose');
var express = require('express');
var app = express();
var User = require('./models/user_model');
var Song = require('./models/song_model');
var bodyparser = require('body-parser');
var moment = require('moment')

mongoose.connect(process.env.MONG_URI || 'mongodb://localhost/muder_music');

app.use(bodyparser.json());

app.use(express.static(__dirname + '/build'));

//returns array of all users
app.get('/user', function(req, res) {
  User.find()
  .exec(function(err, data) {
    if (err) res.status(500).send({msg: 'could not get user'});
    res.json(data);
  });
});

//creates new user in database
app.post('/user', function(req, res) {
  var newUser = new User(req.body);
  newUser.save(function(err, data) {
    if (err) res.status(500).send({msg: 'could not save user'});
    res.json(data);
  });
});

//updates an existing user
app.put('/user/:id', function(req, res) {
  var updatedUser =  req.body;
  delete updatedUser._id;
  User.update({_id: req.params.id}, updatedUser, function(err) {
    if (err) return res.status(500).send({msg: 'could not update user'});
    res.json(req.body);
  });
});

//creates a song
app.post('/songs', function(req, res) {
  var newSong = new Song(req.body);
  newSong.save(function(err, data) {
    if (err) res.status(500).send({msg: 'could not save song'});
    res.json(data);
  });
});

//gets all songs posted by a user
app.get('/userSongs/:userId', function(req, res) {
  Song.find()
  .where('postedBy').equals(req.params.userId)
  .exec(function(err, data) {
    if (err) console.log(err);
    res.json(data);
  });
});

//gets all songs posted same day
app.get('/songs', function(req, res) {
  var today = moment().format('MM DD YY');
  Song.find()
  .where('postedDate').equals(today)
  .sort('-points')
  .exec(function(err, data) {
    if (err) console.log(err);
    res.json(data);
  })
})

//updates an existing song (change point value)
app.put('/songs/:id', function(req, res) {
  var updatedSong =  req.body;
  delete updatedSong._id;
  Song.update({_id: req.params.id}, updatedSong, function(err) {
    if (err) console.log (err);
    res.json(req.body);
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Server Listening port');
});
