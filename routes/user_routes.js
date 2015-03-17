var User = require('../models/user_model');
var bodyparser = require('body-parser');
var express = require('express');

module.exports = function(app) {

  express.Router().use(bodyparser.json());

  //returns array of all users
  express.Router().get('/user', function(req, res) {
    User.find()
    .exec(function(err, data) {
      if (err) res.status(500).send({msg: 'could not get user'});
      console.log(err);
      res.json(data);
    });
  });

  //creates new user in database
  express.Router().post('/user', function(req, res) {
    var newUser = new User(req.body);
    newUser.save(function(err, data) {
      if (err) res.status(500).send({msg: 'could not save user'});
      res.json(data);
    });
  });
};
