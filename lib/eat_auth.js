'use strict';

var eat = require('eat');
var User = require('../models/user_model.js');

module.exports = function(appSecret) {
  return function(req, res, next) {
    var token = req.headers.eat || req.body.eat;
    if (!token) return res.status(403).send({msg: 'could not authenticate'});

    eat.decode(token, appSecret, function(err, decoded) {
      if (err) return res.status(403).send({msg: 'could not authenticate'});


      var postingUsername = decoded.username;
      console.log(postingUsername);

      User.findOne({_id: decoded.id}, function(err, user) {
        if (err) return res.status(403).send({msg: 'could not authenticate'});

        if(!user) return res.status(403).send({msg: 'could not authenticate'});

        req.user = user;
        console.log(user);
        next();
      });
    });
  };
};
