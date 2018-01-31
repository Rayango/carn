const assert = require('chai').assert;
const uuid = require('uuid/v1');
const app = require('../server/index.js');
const supertest = require('supertest');

const request = supertest.agent(app.listen());

describe('server', function() {
  it('should return a greeting when the index page is visited', function(done) {
    request
      .get('/')
      .expect('Hello Koa!')
      .end(done);
  });

  it('should insert requests to the DB', function(done) {
    request
      .post('/requests')
      .send({
        rate: 2.65, 
        zipOrigin: 94105,
        zipDestination: 94122,
        time: new Date(new Date() - (Math.random() * 8.64e7)), 
        price: 6.85,
        ride: true
      })
      .end((err, res) => {
        done();
      });  
  });
});