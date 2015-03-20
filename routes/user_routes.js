var User = require('../models/user_model');
var bodyparser = require('body-parser');
var express = require('express');

module.exports = function(app) {

  app.use(bodyparser.json());

  //returns array of all users
  app.get('/user', function(req, res) {
    User.find()
    .exec(function(err, data) {
      if (err) res.status(500).send({msg: 'could not get user'});
      console.log(err);
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

  //updates and existing user
  app.put('/user/:id', function(req, res) {
    var updatedUser =  req.body;
    delete updatedUser._id;
    User.update({_id: req.params.id}, updatedUser, function(err) {
      if (err) return res.status(500).send({msg: 'could not update user'});
      res.json(req.body);
    });
  });
};
