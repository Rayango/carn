const assert = require('chai').assert;
const expect = require('chai').expect;
const uuid = require('uuid/v1');
const app = require('../server/index.js');
const supertest = require('supertest');
const db = require('../database-cassandra/index.js');
const moment = require('moment');
const fakeDataGenerator = require('../testData/fakeDataGenerator.js');

const request = supertest.agent(app.listen());

describe('server', function() {
  it('should respond with a greeting when the index page is visited', (done) => {
    request
      .get('/')
      .expect(200)
      .end((err, res) => {
        assert.equal(res.body.data, 'Hello Koa!');
        done();
      });
  }); 

  it('should have a route called /requests to take requests from the Passengers API', function(done) {
    let timestamp = new Date(new Date() - (Math.random() * 8.64e7)).toISOString().split('.')[0]+"-0800";
    let data = {
      id: uuid(),
      rate: 2.65, 
      zipOrigin: 94105,
      zipDestination: 94122,
      timestamp: timestamp,
      price: 6.85,
      ride: false
    };

    request
      .post('/requests')
      .send(data)
      .end((err, res) => {
        done();
      });  
  });

  it('should return aggregated data when dataForFares endpoint is visited', function(done) {
    request
      .get('/dataForFares')
      .expect(200)
      .end((err, res) => {
        assert.equal(res.body.data.length, 27);
        for (let zipCodeData of res.body.data) {
          assert.isNumber(+zipCodeData.rides);
        }
        done();
      });
  });
});

describe('fake data generator', function() {
  it('should return an array with 6 properties', function(done) {
    assert.equal(fakeDataGenerator().length, 6);
    done();
  });
});  
