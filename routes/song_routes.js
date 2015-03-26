var User = require('../models/user_model');
var Song = require('../models/song_model');
var bodyparser = require('body-parser');
var express = require('express');
var moment = require('moment');
var eat_auth = require('../lib/eat_auth');
var postingUsername = require('../lib/eat_auth').postingUsername

module.exports = function(app, appSecret) {

  express.Router().use(bodyparser.json());

  //creates a song
  app.post('/songs', eat_auth(appSecret), function(req, res) {
    //console.log('routerUser:' + req.user);
    var newSong = new Song(req.body);
    newSong.postedBy = req.user._id;
    newSong.save(function(err, data) {
      if (err) console.log(err); //res.status(500).send({msg: 'could not save song'});

      res.json(data);
    });
  });

  //gets all songs posted by a user
  app.get('/userSongs/:_id', function(req, res) {
    Song.find()
    .where('postedBy').equals(req.params._id)
    .select('points')
    .select('songUrl')
    .exec(function(err, data) {
      if (err) console.log(err);
      var totalpoints = 0;
      var getTotal = function (arrayofobjects) {
        for(var i = 0; i < arrayofobjects.length; i++) {
          totalpoints += arrayofobjects[i].points;
        }
      }
      getTotal(data);
      console.log(totalpoints);
      res.json({songs: data, points: totalpoints});
    });
  });

  //gets all songs posted same day
  app.get('/songs', eat_auth(appSecret), function(req, res) {
    var today = moment().format('MM DD YY');
    Song.find()
    .where('postedDate').equals(today)
    .sort('-points')
    //.populate('postedBy')
    .exec(function(err, data) {
      if (err) console.log(err);
      res.json(data);
    });
  });

  //updates an existing song (change point value)
  app.put('/songs/:id', function(req, res) {
    var updatedSong =  req.body;
    delete updatedSong._id;
    Song.update({_id: req.params.id}, updatedSong, function(err) {
      if (err) console.log(err);
      res.json(req.body);
    });
  });
};
