'use strict';

var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user_model');

module.exports = function(passport) {
  passport.use('basic', new BasicStrategy({}, function(email, password, done) {
    User.findOne({'basic.email': email}, function(err, user) {
      if (err) return done('could not even get to users');

      if (!user) return done("thats not a user");

      if (!user.validPassword(password)) return done('wrong password');

      return done(null, user);
    });
  }));
};
