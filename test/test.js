var config = require('../config'),
    should = require('should'),
    assert = require('assert'),
    request = require('supertest'),
    mongoose = require('mongoose');

describe('Routing', function() {
  var url = 'http://localhost';
  before(function(done) {
    mongoose.connect(config.db.mongodb);
    done();
  });
  describe('User', function() {
    var account = {
      username: 'tester',
      password: 'test'
    };
    it('should return error trying to login', function(done) {
      request(url)
        .post('/api/login')
        .send(account)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.status.should.be.equal(400);
          done();
        });
    });
    it('should return success trying to save username', function(done) {
      request(url)
        .post('/api/user')
        .send(account)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.status.should.be.equal(200);
          done();
        });
    });
    it('should return error trying to save duplicate username', function(done) {
      request(url)
        .post('/api/user')
        .send(account)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.status.should.be.equal(400);
          done();
        });
    });
    it('should return success trying to login', function(done) {
      request(url)
        .post('/api/login')
        .send(account)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.status.should.be.equal(200);
          done();
        });
    });
  });
  describe('Evacuee', function() {
    it('should return success trying to get all evacuee', function(done) {
      request(url)
        .get('/api/evacuee')
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.status.should.be.equal(200);
          done();
        });
    });
    it('should return error trying to delete invalid evacuee', function(done) {
      request(url)
        .delete('/api/evacuee/1')
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.status.should.be.equal(400);
          done();
        });
    });
    it('should return error trying to look for non-existent code', function(done) {
      request(url)
        .get('/api/evacuee/1')
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.status.should.be.equal(400);
          done();
        });
    });
  });
  describe('Manifest', function() {
  });
});

