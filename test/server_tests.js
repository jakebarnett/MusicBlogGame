require('../server.js');
var chai = require('chai');
var chaihttp = require('chai-http');
var mongoose = require('mongoose');
var moment = require('moment');

var userId;
var songId;
var token;

chai.use(chaihttp);

var expect = chai.expect;

describe('the user routes', function() {

  it('should create a new user', function(done) {
    chai.request('localhost:3000')
    .post('/user')
    .send({username:"alex", email:"test", avatar:"testurl"})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('eat');
      token = res.body.eat;
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
      expect(res.body[0].basic).to.have.property('email');
      expect(res.body[0]).to.have.property('avatar');
      done();
    });
  });

  it('should get current user', function(done) {
    chai.request('localhost:3000')
    .get('/user/currentuser')
    .set("eat", token)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.username).to.eql('alex');
      expect(res.body.avatar).to.eql('testurl');
      expect(res.body.basic.email).to.eql('test');
      userId = res.body._id;
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
    .set("eat", token)
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
    .set("eat", token)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.be.true;
      expect(res.body[0].postedDate).to.eql(today);
      done();
    });
  });

  it("should be able to update an existing song's point value", function(done) {
    chai.request('localhost:3000')
    .put('/songs/' + songId)
    .set("eat", token)
    .send({points:"1"})
    .end(function(err, res) {
      expect(err).to.eql(null);
      done();
    });
  });
});

describe('the userSongs routes', function () {

  it('should get all songs posted by a user', function(done) {
    chai.request('localhost:3000')
    .get('/userSongs/' + userId)
    .set("eat", token)
    .end(function(err, res) {
      expect(err).to.eql(null);
      console.log(res.body);
      expect(res.body.points).to.eql(1);
      expect(res.body.songs[0]).to.have.property('_id');
      expect(res.body.songs[0]).to.have.property('songUrl');
      expect(res.body.songs[0].points).to.eql(1);
      done();
    });
  });

});
