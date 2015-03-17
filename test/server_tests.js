require('../server.js');
var chai = require('chai');
var chaihttp = require('chai-http');
var mongoose = require('mongoose');

chai.use(chaihttp);

var expect = chai.expect;

describe('the user routes', function() {

  it('should create a new user', function(done) {
    chai.request('localhost:3000')
    .post('/user')
    .send({username:"alex", email:"test", avatar:"testurl",  points:10})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('_id');
      expect(res.body.username).to.eql('alex');
      expect(res.body.email).to.eql('test');
      expect(res.body.avatar).to.eql('testurl');
      expect(res.body.points).to.eql(10);
      done();
    })
  })

  it('should return an array of all users')
})
