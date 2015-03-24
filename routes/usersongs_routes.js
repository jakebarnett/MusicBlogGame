var Song = require('../models/song_model');
var User = require('../models/user_model');
var bodyparser = require('body-parser');
var express = require('express');

module.exports = function(app) {

  express.Router().use(bodyparser.json());

  //gets all songs posted by a user
  app.get('/userSongs/:username', function(req, res) {
    Song.find()
    .where('postedBy').equals(req.params.username)
    .exec(function(err, data) {
      if (err) console.log(err);
      console.log(data);
      res.json(data);
    });
  });
};
