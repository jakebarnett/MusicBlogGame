var User = require('../models/user_model');
var bodyparser = require('body-parser');
var express = require('express');
var eat_auth = require('../lib/eat_auth');

module.exports = function(app, passport, appSecret) {


  app.use(bodyparser.json());

  //gets current user
  app.get('/user/currentuser', eat_auth(appSecret), function(req, res) {
    var currentUser = req.user;
    res.send(currentUser);
  });

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
    var newUser = new User();
    newUser.basic.email = req.body.email;
    newUser.basic.password = newUser.generateHash(req.body.password);
    newUser.username = req.body.username;
    newUser.avatar = req.body.avatar;
    newUser.bio = req.body.bio;
    newUser.save(function(err, user) {
      if (err) res.status(500).send({msg: 'could not save user'}) //console.log(err);

      user.generateToken(appSecret, function(err, token) {
        if (err) return res.status(500).send({msg: 'could not generate token'});
        console.log(token);
        res.json({eat: token});
      })
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
};
