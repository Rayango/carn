const assert = require('chai').assert;
const expect = require('chai').expect;
const uuid = require('uuid/v1');
const app = require('../server/index.js');
const supertest = require('supertest');
const db = require('../database-cassandra/index.js');

const request = supertest.agent(app.listen());

describe('server', function() {

  it('should return a greeting when the index page is visited', function(done) {
    request
      .get('/')
      .end((err, res) => {
        assert.equal(res.body.data, 'Hello Koa!');
        done();
      });
  });

  it('should insert requests to the DB', function(done) {
    let data = {
      id: uuid(),
      rate: 2.65, 
      zipOrigin: 94105,
      zipDestination: 94122,
      timestamp: new Date(new Date() - (Math.random() * 8.64e7)), 
      price: 6.85,
      ride: false
    };

    request
      .post('/requests')
      .send(data)
      .end((err, res) => {
        db.lookupRequest(data, data.ride ? 'rides' : 'views', (error, result) => {
          if (error) {
            console.log(error);
          } else {
            assert.equal(result.columns.length, 1);
          }
        });
        done();
      });  
  });
});