const assert = require('chai').assert;
// const server = require('../server/index.js').server;
const app = require('../server/index.js');
const supertest = require('supertest');

const request = supertest.agent(app.listen());

describe('server', function() {
  it('GET / should return a greeting', function(done) {
    request
      .get('/')
      .expect('Hello Koa!')
      .end(done);
  });
});