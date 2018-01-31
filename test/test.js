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
        id: uuid(),
        rate: 2.55, 
        zip: 55305,
        time: 'Tue Jan 30 2018 09:03:51 GMT-0800 (PST)', 
        price: 6.35
      })
      .end((err, res) => {
        done();
      });  
  });
});