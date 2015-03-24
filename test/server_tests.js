require('../server.js');
var chai = require('chai');
var chaihttp = require('chai-http');
var mongoose = require('mongoose');
var moment = require('moment');

var userId;
var songId;

chai.use(chaihttp);

var expect = chai.expect;

describe('the user routes', function() {

  it('should create a new user', function(done) {
    chai.request('localhost:3000')
    .post('/user')
    .send({username:"alex", email:"test", avatar:"testurl"})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('_id');
      expect(res.body.username).to.eql('alex');
      expect(res.body.email).to.eql('test');
      expect(res.body.avatar).to.eql('testurl');
      userId = res.body._id;
      done();
    });
  });

  it('should return an array of all users', function(done) {
    chai.request('localhost:3000')
    .get('/user')
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.be.true;
      expect(res.body[0]).to.have.property('_id');
      expect(res.body[0]).to.have.property('username');
      expect(res.body[0]).to.have.property('email');
      expect(res.body[0]).to.have.property('avatar');
      done();
    });
  });

  it('should update an existing user', function(done) {
    chai.request('localhost:3000')
    .put('/user/' + userId)
    .send({username:"alex", email:"testupdate", avatar:"changedurl"})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.username).to.eql('alex');
      expect(res.body.email).to.eql('testupdate');
      expect(res.body.avatar).to.eql('changedurl');
      done();
    });
  });
});

describe('the song routes', function() {

  it('should create a song', function(done) {
    chai.request('localhost:3000')
    .post('/songs')
    .send({songUrl:"testurl"})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('_id');
      expect(res.body.songUrl).to.eql('testurl');
      expect(res.body.points).to.eql(0);
      songId = res.body._id;
      done();
    });
  });

  it('should get all the songs posted in a day', function(done) {
    var today = moment().format('MM DD YY');
    chai.request('localhost:3000')
    .get('/songs')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.be.true;
      expect(res.body[0].postedDate).to.eql(today);
      done();
    });
  });

  // it("should be able to update an existing song's point value", function(done) {

  // });
});

describe('the userSongs routes', function () {

  it('should get all songs posted by a user', function(done) {
    chai.request('localhost:3000')
    .get('/userSongs/' + userId)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.be.true;
      // expect(res.body[0].postedBy).to.eql(userId);
      // expect(res.body[0]).to.have.property('_id');
      // expect(res.body[0]).to.have.property('songUrl');
      done(console.log(res.body));
    });
  });

});
