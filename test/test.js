const assert = require('chai').assert;
const expect = require('chai').expect;
const uuid = require('uuid/v1');
const app = require('../server/index.js');
const supertest = require('supertest');
const db = require('../database-cassandra/index.js');
const moment = require('moment');

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
    let timestamp = new Date(new Date() - (Math.random() * 8.64e7)).toISOString().split('.')[0]+"-0800";
    let data = {
      id: uuid(),
      rate: 2.65, 
      zipOrigin: 94105,
      zipDestination: 94122,
      timestamp: timestamp,
      timeBucket: moment(timestamp).format('MMMM Do YYYY h a'),
      price: 6.85,
      ride: false
    };

    request
      .post('/requests')
      .send(data)
      .end((err, res) => {
        db.lookupRequest(data, 'views', (error, result) => {
          if (error) {
            console.log(error);
          } else {
            assert.equal(result.length, 1);
          }
        });
        done();
      });  
  });

  it('should return aggregated data when dataForFares endpoint is visited', function(done) {
    request
      .get('/dataForFares')
      .end((err, res) => {
        assert.isAtLeast(Object.keys(res.body.data).length, 1);
        done();
      });
  });
});