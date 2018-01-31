const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const bodyParser = require('koa-body');
const generateFakeData = require('../fakeData/fakeDataGenerator.js');
const db = require('../database-cassandra/index.js');

const app = new Koa();
const router = new Router();

var port = process.env.PORT || (process.argv[2] || 3000);
port = (typeof port === "number") ? port : 3000;

// app.use(bodyParser());

router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello Koa!';
  })
  .get('/requests', async (ctx, next) => {
    db.getAllViews((error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log('result...', result);
      }
    });
  })
  .post('/requests', bodyParser(), async (ctx, next) => {
    db.addRequest(ctx.request.body, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log('result...', result);
      }
    });
  });

app
  .use(router.routes())
  .use(router.allowedMethods());

// var server = app.listen(port);

if (!module.parent) { 
  app.listen(port, function() {
    console.log(`listening on port ${port}`);
  })
}

module.exports = app;